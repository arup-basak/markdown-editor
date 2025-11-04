import { auth } from "@/lib/auth";
import { polar } from "@/lib/polar";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { productPriceId, successUrl, returnUrl } = body;

    if (!productPriceId) {
      return NextResponse.json(
        { error: "productPriceId is required" },
        { status: 400 }
      );
    }

    // Ensure customer exists in Polar with external ID
    let polarCustomerId = session.user.polarCustomerId;
    if (!polarCustomerId) {
      try {
        const customer = await polar.customers.create({
          externalId: session.user.id,
          email: session.user.email || "",
          name: session.user.name || undefined,
        });
        polarCustomerId = customer.id;

        // Update user with Polar customer ID
        await db.user.update({
          where: { id: session.user.id },
          data: { polarCustomerId },
        });
      } catch (error: any) {
        // Customer might already exist, try to find by external ID
        console.warn("Failed to create customer, might already exist:", error.message);
      }
    }

    const checkoutLink = await polar.checkoutLinks.create({
      paymentProcessor: "stripe",
      productPriceId,
      successUrl: successUrl || `${req.nextUrl.origin}/settings?success=true`,
      returnUrl: returnUrl || `${req.nextUrl.origin}/settings`,
      metadata: {
        userId: session.user.id,
        email: session.user.email || "",
      },
    });

    return NextResponse.json({ checkoutLink });
  } catch (error: any) {
    console.error("Error creating checkout link:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout link" },
      { status: 500 }
    );
  }
}

