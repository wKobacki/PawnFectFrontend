import React, { useState, useEffect } from "react";
import { getAnimalDetails } from "../../../api/petApi";
import { useAnimal } from "../../../context/AnimalContext";
import AnimalTools from "./animalTools/AnimalTools";
import AnimalDetailsTab from "./animalDetailsTab/AnimalDetailsTab";
import "./AnimalProfile.css";

function AnimalProfile({ animalId }) {
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refresh } = useAnimal();
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      if (!animalId) {
        setError("Brak identyfikatora zwierzęcia.");
        setLoading(false);
        return;
      }

      try {
        const data = await getAnimalDetails(animalId);
        setAnimal(data);
        setError(null);
      } catch (err) {
        setError("Błąd podczas ładowania danych zwierzęcia.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnimalDetails();
  }, [animalId, refresh]);

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, [animalId]);

  if (loading) {
    return <p>Ładowanie danych zwierzęcia...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div key={animationKey} className="animal-profile-container">
      <AnimalDetailsTab animal={animal} />
    </div>
  );
}

export default AnimalProfile;
