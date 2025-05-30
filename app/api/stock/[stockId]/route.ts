import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ stockId: string }> }
) {
  try {
    const body = await req.json();
    const { productId, color, size, quantity } = body;
    const { stockId } = await params;

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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ stockId: string }> }
) {
  try {
    const { stockId } = await params;

    if (!stockId) {
      return new NextResponse("Falta el ID del stock", { status: 400 });
    }

    const existing = await db.stock.findUnique({
      where: { id: stockId },
    });

    if (!existing) {
      return new NextResponse("Stock no encontrado", { status: 404 });
    }

    await db.stock.delete({
      where: { id: stockId },
    });

    return new NextResponse("Stock eliminado correctamente", { status: 200 });
  } catch (error) {
    console.error("Error al eliminar stock:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
