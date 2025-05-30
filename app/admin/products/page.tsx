import ProductsTableWrapper from "@/components/ProductsTableWrapper";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import db from "@/lib/db";
import React from "react";

const ProductsPage = async () => {
  const products = await db.products.findMany();

  return (
    <div>
      <AdminPageHeader
        title="Productos"
        hasAddButton
        addButtonLabel="Nuevo"
        link="/admin/products/new"
      />
      <ProductsTableWrapper products={products} />
    </div>
  );
};

export default ProductsPage;
