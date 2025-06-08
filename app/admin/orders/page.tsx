import OrderTableWrapper from "@/components/OrderTableWrapper";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import db from "@/lib/db";
import React from "react";

const OrdersPage = async () => {
  const orders = await db.order.findMany({
    include: {
      CartItem: true,
      Customer: true,
    },
  });
  return (
    <div>
      <AdminPageHeader title="Ordenes" />
      <OrderTableWrapper orders={orders} />
    </div>
  );
};

export default OrdersPage;
