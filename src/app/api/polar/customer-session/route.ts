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
    const { returnUrl } = body;

    // Get or create Polar customer ID
    let polarCustomerId = session.user.polarCustomerId;

    if (!polarCustomerId) {
      // Create customer in Polar using external ID (our user ID)
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
    }

    // Create customer session
    const customerSession = await polar.customerSessions.create({
      externalCustomerId: session.user.id,
      returnUrl: returnUrl || `${req.nextUrl.origin}/settings`,
    });

    return NextResponse.json({ customerSession });
  } catch (error: any) {
    console.error("Error creating customer session:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create customer session" },
      { status: 500 }
    );
  }
}

