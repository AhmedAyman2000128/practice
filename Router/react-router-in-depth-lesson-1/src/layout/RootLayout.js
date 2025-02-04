import { NavLink, Outlet } from "react-router-dom";
import BreadCrumbs from "../Breadcrumbs/BreadCrumbs";

function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <h1>JobaRouter</h1>
        {/* <BreadCrumbs /> */}
        <nav>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"about"}>About</NavLink>
          <NavLink to={"help"}>Help</NavLink>
          <NavLink to={"careers"}>Careers</NavLink>
          <NavLink to={"products"}>Products</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
