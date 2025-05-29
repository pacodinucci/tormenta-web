import { getProductById } from "@/actions/getProductById";
import AddProductForm from "@/components/AddProductForm";

type Params = Promise<{ productId: string }>;

const ProductIdPage = async (props: { params: Params }) => {
  const params = await props.params;
  const productId = params.productId;
  const product = await getProductById(productId);

  return (
    <div>
      <AddProductForm initialData={product} />
    </div>
  );
};

export default ProductIdPage;
