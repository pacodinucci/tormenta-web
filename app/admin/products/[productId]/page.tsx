import { getProductById } from "@/actions/getProductById";
import AddProductForm from "@/components/AddProductForm";
import React from "react";

const ProductIdPage = async ({ params }: { params: { productId: string } }) => {
  const productId = params?.productId;
  const product = await getProductById(productId);

  return (
    <div>
      <AddProductForm initialData={product} />
    </div>
  );
};

export default ProductIdPage;
