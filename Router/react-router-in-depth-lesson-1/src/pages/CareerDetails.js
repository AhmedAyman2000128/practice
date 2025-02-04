import { useLoaderData, useParams } from "react-router-dom";

function CareerDetails() {
  const id = useParams();
  const career = useLoaderData();
  return (
    <div className="career-details">
      <h3>{career.title}</h3>
      <p>Salary : {career.salary}</p>
      <p>Location : {career.location}</p>
    </div>
  );
}

export default CareerDetails;
export const fetchCareerDetails = async ({ params }) => {
  const id = params.id;
  console.log(id);
  const data = await fetch("http://localhost:4000/careers/" + id);
  if (!data.ok) {
    throw Error("Couldnot fetch the career");
  }
  return data.json();
};
