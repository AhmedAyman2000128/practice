import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { sendPlaces, getUserPlaces } from "./components/http.js";
import ErrorPage from "./components/Error.jsx";
function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [errorFetchingUserPlaces, setErrorFetchingUserPlaces] = useState();

  const selectedPlace = useRef();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    if (!errorFetchingUserPlaces) {
      setUserPlaces((prevPickedPlaces) => {
        if (!prevPickedPlaces) {
          prevPickedPlaces = [];
        }
        if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
          return prevPickedPlaces;
        }
        return [selectedPlace, ...prevPickedPlaces];
      });
      try {
        const message = await sendPlaces([selectedPlace, ...userPlaces]);
      } catch (error) {
        setErrorUpdatingPlaces({
          message: error.message || "Error while updating user places",
        });
        setUserPlaces(userPlaces);
      }
    }
  }

  function handleErrorClose() {
    setErrorUpdatingPlaces(null);
  }
  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );
      try {
        await sendPlaces(
          userPlaces.filter(
            (currentPlace) => currentPlace.id !== selectedPlace.current.id
          )
        );
      } catch (error) {
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || "failed to delete place",
        });
      }
      setModalIsOpen(false);
    },
    [userPlaces]
  );

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setIsLoading(true);
        const places = await getUserPlaces();
        setUserPlaces(places);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorFetchingUserPlaces({
          message: error.message || "Error Fetching user places",
        });
      }
    }
    fetchPlaces();
  }, []);
  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleErrorClose}>
        {errorUpdatingPlaces && (
          <ErrorPage
            message={errorUpdatingPlaces.message}
            onConfirm={handleErrorClose}
            title="Error"
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {errorFetchingUserPlaces && (
          <ErrorPage message={errorFetchingUserPlaces.message} title={Error} />
        )}
        {!errorFetchingUserPlaces && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
            isLoading={isLoading}
            loadingText={"Fetching user places..."}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
