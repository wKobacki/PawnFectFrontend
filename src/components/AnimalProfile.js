import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { getAnimalDetails } from "../api/petApi";  
import "../styles/AnimalProfile.css";  

function AnimalProfile() {
    const { animalId } = useParams();  
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimalDetails = async () => {
            try {
                const data = await getAnimalDetails(animalId); 
                setAnimal(data);
            } catch (err) {
                setError("Błąd podczas ładowania danych zwierzęcia.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnimalDetails();
    }, [animalId]);

    if (loading) {
        return <p>Ładowanie danych zwierzęcia...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="animal-profile">
            <h1>{animal.name}</h1>
            <img src={animal.image} alt={animal.name} />
            <p><strong>Opis:</strong> {animal.description}</p>
            <p><strong>Płeć:</strong> {animal.gender}</p>
            <p><strong>Data urodzenia:</strong> {animal.dateOfBirth}</p>
        </div>
    );
}

export default AnimalProfile;
