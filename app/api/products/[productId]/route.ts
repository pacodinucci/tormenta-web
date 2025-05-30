import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const body = await req.json();
    const { name, description, price, colors, images } = body;
    const { productId } = await params;

    if (!productId) {
      return new NextResponse("Falta el ID del producto", { status: 400 });
    }

    const existing = await db.products.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      return new NextResponse("Producto no encontrado", { status: 404 });
    }

    await db.productImage.deleteMany({
      where: { productId },
    });

    const updated = await db.products.update({
      where: { id: productId },
      data: {
        name,
        description,
        price,
        colors,
        images: {
          create: images.map((img: { url: string; color: string }) => ({
            url: img.url,
            color: img.color,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;

    if (!productId) {
      return new NextResponse("Falta el ID del producto", { status: 400 });
    }

    const existing = await db.products.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      return new NextResponse("Producto no encontrado", { status: 404 });
    }

    await db.productImage.deleteMany({
      where: { productId },
    });

    await db.products.delete({
      where: { id: productId },
    });

    return new NextResponse("Producto eliminado correctamente", {
      status: 200,
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
