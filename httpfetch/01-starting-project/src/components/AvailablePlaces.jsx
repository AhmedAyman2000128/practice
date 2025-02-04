import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./Error.jsx";
import fetchPlacesfun from "./http.js";
export default function AvailablePlaces({ onSelectPlace }) {
  const [places, setplaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchPlaces() {
      try {
        setIsLoading(true);
        const data = await fetchPlacesfun();
        setplaces(data.places);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setError({
          message: error.message || "Error while fetching , please try again",
        });
        setIsLoading(false);
      }
    }
    fetchPlaces();
  }, []);
  if (error) {
    console.log(error.message);
    return <ErrorPage message={error.message} title="Error" />;
  }

  return (
    <Places
      title="Available Places"
      places={places}
      isLoading={isLoading}
      loadingText="fetching data ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
