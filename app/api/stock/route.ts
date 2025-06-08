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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    const color = searchParams.get("color");

    if (!productId || !color) {
      return new NextResponse("Faltan parámetros requeridos", { status: 400 });
    }

    const stocks = await db.stock.findMany({
      where: {
        productId,
        color: {
          equals: color,
          mode: "insensitive", // para evitar problemas de mayúsculas/minúsculas
        },
      },
    });

    return NextResponse.json(stocks);
  } catch (error) {
    console.error("Error al obtener stocks por color:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
