import { Link, useLoaderData } from "react-router-dom";

function Products() {
  const products = useLoaderData();
  return (
    <div className="products">
      {products.map((product) => {
        return (
          <Link to={product.id.toString()}>
            <div
              className="product"
              style={{
                backgroundColor: "rgb(91, 91, 235)",
                cursor: "cursorPointer",
              }}
            >
              <h3>Name : {product.title}</h3>
              <img alt="" src={product.image} width={200} height={200} />
              <p>Description : </p>
              <hr />
              <p>{product.description}</p>
              <p>Price : {product.price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Products;
export const fetchProducts = async () => {
  const data = await fetch("https://fakestoreapi.com/products");
  return data.json();
};
