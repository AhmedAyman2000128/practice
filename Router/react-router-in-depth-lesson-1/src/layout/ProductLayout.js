import { Outlet } from "react-router-dom";

function ProductLayout() {
  return (
    <div className="product-layout">
      <h2>Products</h2>
      <Outlet />
    </div>
  );
}

export default ProductLayout;
