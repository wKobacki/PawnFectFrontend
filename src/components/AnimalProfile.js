import React, { useState, useEffect } from "react";
import { getAnimalDetails } from "../api/petApi";
import "../styles/dashboard/AnimalProfile.css";
import AnimalTools from "./AnimalTools";

function AnimalProfile({ animalId }) {
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
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
                setAnimationKey(prevKey => prevKey + 1);
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

    const toggleDetails = () => setIsExpanded(prevState => !prevState);

    return (
        <div className={`animal-profile-container ${isExpanded ? 'open-details' : ''}`} key={animationKey}>
            <div className="animal-basic-info-container">
                <img
                    src={animal?.image || 'https://placehold.co/300x300'}
                    alt={animal?.name || 'Zwierzę'}
                    className="animal-profile-image"
                />
                <h1 className="animal-name">{animal?.name || 'Brak nazwy'}</h1>
                
                <button className="animal-toggle-button" onClick={toggleDetails}>
                    {isExpanded ? 'Zwiń szczegóły' : 'Rozwiń szczegóły'}
                </button>

                <div className={`animal-additional-info ${isExpanded ? 'open' : ''}`}>
                    <p><strong>Płeć:</strong> {animal?.gender === 'F' ? 'Samica' : animal?.gender === 'M' ? 'Samiec' : 'Brak danych'}</p>
                    <p><strong>Data urodzenia:</strong> {animal?.date_of_birth ? new Date(animal.date_of_birth).toISOString().split("T")[0] : 'Brak daty urodzenia'}</p>
                    <p><strong>Karmienie:</strong> {animal?.feeding || "Brak danych o karmieniu"}</p>
                    <p><strong>Opis:</strong> {animal?.description || "Brak opisu"}</p>
                </div>

                <AnimalTools />
            </div>
        </div>
    );
}

export default AnimalProfile;
