import StockTableWrapper from "@/components/StockTableWrapper";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import db from "@/lib/db";
import React from "react";

const StockPage = async () => {
  const stock = await db.stock.findMany({
    include: {
      Products: true,
    },
  });

  return (
    <div>
      <AdminPageHeader
        title="Stock"
        hasAddButton
        addButtonLabel="Nuevo"
        link="/admin/stock/new"
      />
      <StockTableWrapper stock={stock} />
    </div>
  );
};

export default StockPage;
