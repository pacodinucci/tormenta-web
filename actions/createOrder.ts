"use server";

import db from "@/lib/db";
import { CartItem } from "@/store/cart";

export interface OrderData {
  id: string;
  customerId: string;
  total: number;
  cart: CartItem[];
}

export async function createOrder(data: OrderData) {
  console.log("CUSTOMER ID --> ", data.customerId);

  const order = await db.order.create({
    // data: {
    //   id: data.id,
    //   customerId: data.customerId,
    //   total: data.total,
    //   isPaid: false,
    //   isDelivered: false,
    //   CartItem: {
    //     create: data.cart.map((item) => ({
    //       Products: {
    //         connect: {
    //           id: item.id,
    //         },
    //       },
    //       color: item.color,
    //       size: item.size,
    //       quantity: item.quantity,
    //       price: item.price,
    //       stockId: item.stockId,
    //     })),
    //   },
    // },
    data: {
      id: data.id,
      customerId: data.customerId,
      total: data.total,
      isPaid: false,
      isDelivered: false,
      CartItem: {
        // ✅ corregido (probablemente esté mal como "CartItem")
        create: data.cart.map((item) => ({
          stockId: item.stockId, // ✅ este sí se puede
          productId: item.id, // suponiendo que `item.id` es el ID del producto
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  return order;
}
