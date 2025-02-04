import { useLoaderData, useParams } from "react-router-dom";

function ProductDetails() {
  const product = useLoaderData();
  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <img alt="" src={product.image} width={200} height={200} />
    </div>
  );
}

export default ProductDetails;
export const fetchProductDetails = async ({ params }) => {
  const id = params.id;
  const data = await fetch("https://fakestoreapi.com/products/" + id);
  return data.json();
};
