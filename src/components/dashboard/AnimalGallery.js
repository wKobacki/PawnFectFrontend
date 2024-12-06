import { useEffect, useState } from "react";
import AnimalCard from "./AnimalCard";
import { getPets } from "../../api/petApi";
import { useAnimal } from "../../context/AnimalContext";

const AnimalGallery = () => {
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const { animals, setAnimals } = useAnimal();
  const userId = localStorage.getItem('userId');

  const compareArrays = (a, b) => 
    a.length === b.length &&
    a.every((element, index) => element === b[index]);
  
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);
      try{
        const pets = await getPets(userId);
        if(!compareArrays(animals, pets)) setAnimals(pets);
      } catch(error){
        setError(error.message || 'Blad podczas pobierania zwierzat');
      } finally {
        setLoading(false);
      };
    }
    if(userId)
    fetchPets();
  }, [userId])
  return (
    <div className="animal-gallery">
      {animals.length === 0 ? (
        <p>Brak zwierząt w bazie danych</p>
      ) : (
        animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal}/>
        ))
      )} 
    </div>
  )
}

export default AnimalGallery;
