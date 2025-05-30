import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, color, size, quantity } = body;

    if (!productId || !color || !size || quantity === undefined) {
      return new NextResponse("Faltan campos requeridos", { status: 400 });
    }

    const stock = await db.stock.create({
      data: {
        productId,
        color,
        size,
        quantity,
      },
    });

    return NextResponse.json(stock);
  } catch (error) {
    console.error("Error al crear stock:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
