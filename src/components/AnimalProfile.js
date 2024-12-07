import React, { useState, useEffect } from "react";
import { getAnimalDetails } from "../api/petApi";  
import "../styles/dashboard/AnimalProfile.css";  
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
                <img 
                    src={animal.image ? animal.image : 'https://placehold.co/300x300'} 
                    alt={animal.name} 
                    className="animal-image"
                />
                <h1 className="animal-name">{animal.name}</h1>
                <p className="animal-description"><strong>Opis:</strong> {animal.description}</p>
                <p className="animal-gender"><strong>Płeć:</strong> {animal.gender}</p>
                <p className="animal-dob">
                    <strong>Data urodzenia:</strong> {new Date(animal.date_of_birth).toISOString().split("T")[0]}
                </p>
                <AnimalTools />
            </div>
        </div>
    );    
}

export default AnimalProfile;
