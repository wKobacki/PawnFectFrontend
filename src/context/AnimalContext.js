import { createContext, useContext, useState } from "react";

const AnimalContext = createContext();

export const AnimalProvider = ({ children }) => {
  const [animals, setAnimalsList] = useState([]);

  const updateAnimals = (newAnimal) => {
    setAnimalsList((animals) => [...animals, newAnimal]);
  }

  const setAnimals = (newAnimals) => {
    setAnimalsList(newAnimals);
  }

  return (
      <AnimalContext.Provider value={{animals, updateAnimals, setAnimals }}>
        {children}
      </AnimalContext.Provider>
  );
}

export const useAnimal = () => {
  return useContext(AnimalContext);
}
