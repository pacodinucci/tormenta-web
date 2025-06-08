import CustomerTableWrapper from "@/components/CustomersTableWrapper";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import db from "@/lib/db";
import React from "react";

const CustomersPage = async () => {
  const customers = await db.customer.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <AdminPageHeader title="Clientes" />
      <CustomerTableWrapper customers={customers} />
    </div>
  );
};

export default CustomersPage;
