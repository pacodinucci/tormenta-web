import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(body);

    const { name, description, price, colors, images } = body;

    const newProduct = await db.products.create({
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

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creando producto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await db.products.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
