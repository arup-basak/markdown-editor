import { db } from "@/lib/db";
import { validateEvent, WebhookVerificationError } from "@polar-sh/sdk/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("POLAR_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    const body = await req.text();
    const headers = Object.fromEntries(req.headers.entries());
    
    // Validate webhook event using Polar SDK
    let event;
    try {
      event = validateEvent(body, headers, webhookSecret);
    } catch (error) {
      if (error instanceof WebhookVerificationError) {
        console.error("Webhook verification failed:", error.message);
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 401 }
        );
      }
      throw error;
    }

    const { type, data: payload } = event;
    // Handle subscription events
    if (type === "subscription.created" || type === "subscription.updated") {
      const subscription = payload;
      const customerId = subscription.customerId;
      const externalId = subscription.customer?.externalId;

      if (!externalId) {
        console.error("No external ID found in subscription webhook");
        return NextResponse.json({ received: true });
      }

      // Find user by external ID (which is our user ID)
      const user = await db.user.findUnique({
        where: { id: externalId },
      });

      if (!user) {
        console.error(`User not found for external ID: ${externalId}`);
        return NextResponse.json({ received: true });
      }

      // Update or create subscription
      await db.subscription.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          polarSubscriptionId: subscription.id,
          polarCustomerId: customerId,
          polarProductId: subscription.productId,
          status: subscription.status,
          currentPeriodStart: new Date(subscription.currentPeriodStart),
          currentPeriodEnd: new Date(subscription.currentPeriodEnd),
          cancelAtPeriodEnd: subscription.cancelAtPeriodEnd || false,
          canceledAt: subscription.canceledAt
            ? new Date(subscription.canceledAt)
            : null,
        },
        update: {
          status: subscription.status,
          currentPeriodStart: new Date(subscription.currentPeriodStart),
          currentPeriodEnd: new Date(subscription.currentPeriodEnd),
          cancelAtPeriodEnd: subscription.cancelAtPeriodEnd || false,
          canceledAt: subscription.canceledAt
            ? new Date(subscription.canceledAt)
            : null,
        },
      });

      // Update user's Polar customer ID if not set
      if (!user.polarCustomerId) {
        await db.user.update({
          where: { id: user.id },
          data: { polarCustomerId: customerId },
        });
      }
    } else if (type === "subscription.canceled") {
      const subscription = payload;
      const externalId = subscription.customer?.externalId;

      if (externalId) {
        await db.subscription.updateMany({
          where: { polarSubscriptionId: subscription.id },
          data: {
            status: "canceled",
            canceledAt: new Date(),
            cancelAtPeriodEnd: subscription.cancelAtPeriodEnd || false,
          },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}

