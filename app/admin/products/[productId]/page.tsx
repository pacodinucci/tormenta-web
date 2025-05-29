import { getProductById } from "@/actions/getProductById";
import AddProductForm from "@/components/AddProductForm";
import React from "react";

interface ProductIdPageProps {
  params: {
    productId: string;
  };
}

const ProductIdPage = async ({ params }: ProductIdPageProps) => {
  const productId = params?.productId;
  const product = await getProductById(productId);

  return (
    <div>
      <AddProductForm initialData={product} />
    </div>
  );
};

export default ProductIdPage;
