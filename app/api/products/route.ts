import { NextResponse } from "next/server";
import db from "@/lib/db"; // Asegurate que este sea tu PrismaClient exportado
import { ProductSchema } from "@/schemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = ProductSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, description, price, colors } = parsed.data;

    const newProduct = await db.products.create({
      data: {
        name,
        description,
        price,
        colors,
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
