import { useLoaderData, Link } from "react-router-dom";
function Careers() {
  const careers = useLoaderData();

  return (
    <div className="careers">
      {typeof careers !== "undefined" ? (
        careers.map((career) => {
          return (
            <div>
              <Link to={career.id.toString()} key={career.id}>
                <h3>{career.title}</h3>
                <p>{career.location}</p>
              </Link>
            </div>
          );
        })
      ) : (
        <div>Still Fetching</div>
      )}
    </div>
  );
}

export default Careers;
export const fetchCareers = async () => {
  const data = await fetch("http://localhost:4000/careers/");
  if (!data.ok) {
    throw Error("Couldnot fetch careers");
  }
  return data.json();
};
