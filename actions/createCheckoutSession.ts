"use server";

import stripe from "@/lib/stripe";
import { CartItem } from "@/store/cart";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerId: string;
  stockIds: string;
};

export async function createCheckoutSession(
  cart: CartItem[],
  metadata: Metadata
) {
  console.log("CART -> ", cart);
  try {
    const itemsWithoutPrice = cart.filter((item) => !item.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Algunos productos no tienen precio.");
    }

    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${
        `https://${process.env.VERCEL_URL}` || process.env.NEXT_PUBLIC_BASE_URL
      }/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${
        metadata.orderNumber
      }`,
      cancel_url: `${
        `https://${process.env.VERCEL_URL}` || process.env.NEXT_PUBLIC_BASE_URL
      }/cart`,
      line_items: cart.map((item) => ({
        price_data: {
          currency: "mxn",
          unit_amount: Math.round(item.price! * 100),
          product_data: {
            name: item.name || "Producto sin nombre",
            description: `ID de Producto: ${item.id}`,
            metadata: {
              id: item.id,
            },
            // images: item.image ? [item.image] : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });

    return session.url;
  } catch (error) {
    console.error("Error creando la sesión de Stripe", error);
    throw error;
  }
}
