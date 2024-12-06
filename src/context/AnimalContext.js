import { createContext, useContext, useState } from "react";
import { deleteAnimal } from "../api/petApi";

const AnimalContext = createContext();

export const AnimalProvider = ({ children }) => {
  const [animals, setAnimalsList] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const updateAnimals = (newAnimal) => {
    setAnimalsList((animals) => [...animals, newAnimal]);
  }

  const setAnimals = (newAnimals) => {
    setAnimalsList(newAnimals);
  }

  const selectAnimal = (animalId) => {
    setSelectedAnimal(animalId);
  }

  const removeAnimal = async (animalId) => {
    const index = animals.findIndex(i => i.id === animalId)
    if(index === -1) return;
    animals.splice(index, 1);
    await deleteAnimal(animalId);
  }

  return (
      <AnimalContext.Provider value={{animals, updateAnimals, setAnimals, selectedAnimal, selectAnimal, removeAnimal }}>
        {children}
      </AnimalContext.Provider>
  );
}

export const useAnimal = () => {
  return useContext(AnimalContext);
}
