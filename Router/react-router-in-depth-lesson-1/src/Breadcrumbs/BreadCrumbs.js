import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function BreadCrumbs() {
  const location = useLocation();
  let currentLoc = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb != "")
    .map((crumb) => {
      currentLoc += "/" + crumb;
      return <Link to={currentLoc}>{crumb}</Link>;
    });
  return <div>{crumbs}</div>;
}

export default BreadCrumbs;
