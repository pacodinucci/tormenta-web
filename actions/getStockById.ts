import db from "@/lib/db";

export const getStockById = async (stockId: string | undefined) => {
  if (!stockId) return null;

  const stock = await db.stock.findFirst({
    where: {
      id: stockId,
    },
  });

  if (!stock) return null;

  return stock;
};
