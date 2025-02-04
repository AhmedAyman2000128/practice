//Routers
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
//pages
import Home from "./pages/Home";
import About from "./pages/About";
import Faq from "./pages/help/Faq";
import Contact from "./pages/help/Contact";
import NotFound from "./pages/NotFound";
import Careers, { fetchCareers } from "./pages/Careers";
//layouts
import HelpLayout from "./layout/HelpLayout";
import RootLayout from "./layout/RootLayout";
import CareerLayout from "./layout/CareerLayout";
import CareerDetails, { fetchCareerDetails } from "./pages/CareerDetails";
import ProductLayout from "./layout/ProductLayout";
import Products, { fetchProducts } from "./pages/Products";
import ProductDetails, { fetchProductDetails } from "./pages/ProductDetails";
import CareerError from "./pages/CareerError";
import { submitForm } from "./pages/help/Contact";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} action={submitForm} />
      </Route>
      <Route
        path="careers"
        element={<CareerLayout />}
        errorElement={<CareerError />}
      >
        <Route index element={<Careers />} loader={fetchCareers} />
        <Route
          path=":id"
          element={<CareerDetails />}
          loader={fetchCareerDetails}
        />
      </Route>
      <Route path="products" element={<ProductLayout />}>
        <Route index element={<Products />} loader={fetchProducts} />
        <Route
          path=":id"
          element={<ProductDetails />}
          loader={fetchProductDetails}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
