import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Fugiat cillum esse officia ullamco laborum ea aute.</p>
      <p>
        Go to <Link to={"/"}>HomePage</Link>
      </p>
    </div>
  );
}

export default NotFound;
