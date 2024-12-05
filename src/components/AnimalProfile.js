import React, { useState, useEffect } from "react";
import { getAnimalDetails } from "../api/petApi";  
import "../styles/AnimalProfile.css";  
import AnimalTools from "./AnimalTools";

function AnimalProfile({ animalId }) { 
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchAnimalDetails = async () => {
            try {
                const data = await getAnimalDetails(animalId); 
                setAnimal(data);
                setError(false);
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
        <div className="animal-profile-container">
            <div className="animal-basic-info-container">
                <h1>{animal.name}</h1>
                <p><strong>Opis:</strong> {animal.description}</p>
                <p><strong>Płeć:</strong> {animal.gender}</p>
                <p><strong>Data urodzenia:</strong> {animal.date_of_birth}</p>
                <img src={animal.image} alt={animal.name} />
                <AnimalTools/>
            </div>
        </div>
    );
}

export default AnimalProfile;
