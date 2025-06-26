import db from "@/lib/db";
import { resend } from "@/lib/resend";
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
      { error: "Stripe webhook secret is not set." },
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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;

    if (!customerEmail) {
      console.error(
        "❌ No se encontró el email del cliente en session.customer_details."
      );
      return NextResponse.json(
        { error: "Email no disponible en session." },
        { status: 400 }
      );
    }

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
      // 🔒 Transacción para actualizar orden y stocks
      await db.$transaction(async (tx) => {
        // Marcar orden como pagada
        await tx.order.update({
          where: { id: orderId },
          data: { isPaid: true },
        });

        const orderWithItems = await tx.order.findUnique({
          where: { id: orderId },
          include: { CartItem: true },
        });
        console.log("order with items --> ", orderWithItems);

        if (!orderWithItems || !orderWithItems.CartItem.length) {
          throw new Error("No se encontraron ítems en la orden.");
        }

        // Decrementar stock
        for (const item of orderWithItems.CartItem) {
          if (!item.stockId) continue;

          await tx.stock.update({
            where: { id: item.stockId },
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          });

          console.log(`📦 Stock actualizado para stockId: ${item.stockId}`);
        }
      });

      await resend.emails.send({
        from: "Tormenta <hola@tormenta.mx>",
        to: customerEmail,
        subject: "¡Gracias por tu compra!",
        html: `
          <h1>¡Hola!</h1>
          <p>Gracias por tu compra en <strong>Tormenta</strong>.</p>
          <p>Número de orden: <strong>${orderId}</strong></p>
          <p>Total: <strong>$${(total / 100).toFixed(2)}</strong></p>
          <p>Te mantendremos al tanto del envío.</p>
          <br />
          <p>Saludos,</p>
          <p><strong>Equipo Tormenta 🌧️</strong></p>
        `,
      });

      console.log("✅ Orden procesada con éxito:", orderId);
    } catch (err) {
      console.error("❌ Error procesando la orden:", err);
      return NextResponse.json(
        { error: "Error procesando la orden." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
