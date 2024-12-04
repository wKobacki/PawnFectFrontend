import { useEffect, useState } from "react";
import AnimalCard from "./AnimalCard";
import { getPets } from "../../api/petApi";

const AnimalGallery = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);
      try{
        const pets = await getPets(userId);
        setAnimals(pets);
      } catch(error){
        setError(error.message || 'Blad podczas pobierania zwierzat');
      } finally {
        setLoading(false);
      };
      
    }
    
    fetchPets();
  })
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
