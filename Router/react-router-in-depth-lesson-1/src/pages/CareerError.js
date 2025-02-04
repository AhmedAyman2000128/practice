import { useRouteError } from "react-router-dom";

function CareerError() {
  const error = useRouteError();
  return (
    <div className="career-error">
      <h2>Error</h2>
      <p>{error.message}</p>
    </div>
  );
}

export default CareerError;
