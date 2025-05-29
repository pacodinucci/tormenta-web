import db from "@/lib/db";

export const getProductById = async (productId: string | undefined) => {
  if (!productId) return null;

  const product = await db.products.findFirst({
    where: {
      id: productId,
    },
  });

  if (!product) return null;

  return product;
};
