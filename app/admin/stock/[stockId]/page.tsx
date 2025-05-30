import AddStockForm from "@/components/AddStockForm";
import db from "@/lib/db";
import React from "react";

type Params = Promise<{ stockId: string }>;

const StockIdPage = async (props: { params: Params }) => {
  const params = await props.params;
  const stockId = params.stockId;
  const stock = await db.stock.findFirst({
    where: {
      id: stockId,
    },
  });

  return (
    <div>
      <AddStockForm initialData={stock} />
    </div>
  );
};

export default StockIdPage;
