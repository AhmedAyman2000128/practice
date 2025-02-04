import { NavLink, Outlet } from "react-router-dom";

function HelpLayout() {
  return (
    <div className="help-layout">
      <h2>Help</h2>
      <p>Please select one of the two options</p>
      <nav>
        <NavLink to={"faq"}>Faq</NavLink>
        <NavLink to={"contact"}>Contact</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default HelpLayout;
