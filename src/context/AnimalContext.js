import { createContext, useContext, useState } from "react";
import { deleteAnimal } from "../api/petApi";

const AnimalContext = createContext();

export const AnimalProvider = ({ children }) => {
  const [animals, setAnimalsList] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animalPhotoDialog, setAnimalPhotoDialog] = useState(false);
  const [refresh, setRefresh] = useState(0);

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

  const triggerRefresh = () => {
    setRefresh(refresh + 1);
  }

  const toggleAnimalPhotoDialog = (value) => {
    if(value !== null && value !== undefined){
      setAnimalPhotoDialog(value);
    } else {
      setAnimalPhotoDialog(!animalPhotoDialog);
    }
  }

  return (
      <AnimalContext.Provider value={{animals, updateAnimals, setAnimals, 
      selectedAnimal, selectAnimal, removeAnimal, 
      toggleAnimalPhotoDialog, animalPhotoDialog,
      refresh, triggerRefresh }}>
        {children}
      </AnimalContext.Provider>
  );
}

export const useAnimal = () => {
  return useContext(AnimalContext);
}
