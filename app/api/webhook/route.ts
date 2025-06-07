import db from "@/lib/db";
import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();

  const sig = headersList.get("stripe-signature")!;

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.log("Stripe webhook secret is not set.");
    return NextResponse.json(
      { error: "Stripe webhook secret is note set." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed.", error);
    return NextResponse.json(
      { error: `Webhook error: ${error}` },
      { status: 400 }
    );
  }

  //   console.log(event);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log(session);

    const orderId = session.metadata?.orderNumber;
    const customerId = session.metadata?.customerId;
    const total = session.amount_total;

    if (!orderId || !customerId || !total) {
      console.error("⚠️ Falta metadata en la sesión de checkout.");
      return NextResponse.json(
        { error: "Faltan datos en metadata." },
        { status: 400 }
      );
    }

    try {
      await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
        },
      });

      console.log("✅ Orden actualizada como pagada:", orderId);
    } catch (err) {
      console.error("❌ Error actualizando la orden:", err);
      return NextResponse.json(
        { error: "Error actualizando la orden." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
