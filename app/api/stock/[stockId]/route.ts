import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { stockId: string } }
) {
  try {
    const body = await req.json();
    const { productId, color, size, quantity } = body;
    const { stockId } = params;

    if (!stockId) {
      return new NextResponse("Falta el ID del stock", { status: 400 });
    }

    const existing = await db.stock.findUnique({
      where: { id: stockId },
    });

    if (!existing) {
      return new NextResponse("Stock no encontrado", { status: 404 });
    }

    const updatedStock = await db.stock.update({
      where: { id: stockId },
      data: {
        productId,
        color,
        size,
        quantity,
      },
    });

    return NextResponse.json(updatedStock);
  } catch (error) {
    console.error("Error al actualizar stock:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
