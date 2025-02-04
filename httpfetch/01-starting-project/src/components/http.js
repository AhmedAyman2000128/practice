export default async function fetchPlacesfun() {
  const response = await fetch("http://localhost:3000/places");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Couldnot fetch places");
  }
  return data;
}

export async function sendPlaces(places) {
  const response = await fetch("http://localhost:3000/user-placesss", {
    method: "PUT",
    body: JSON.stringify({ places: places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("couldnot update user-places");
  }
  const data = await response.json();
  return data.message;
}
export async function getUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("failed to get user Places");
  }

  return resData.places;
}
