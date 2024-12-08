import React, { useState, useEffect } from "react";
import { getAnimalDetails } from "../api/petApi";
import "../styles/dashboard/AnimalProfile.css";

function AnimalProfile({ animalId }) {
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("dieta"); 

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
    }, [animalId]);

    const renderTabContent = () => {
        switch (activeTab) {
            case "dieta":
                return <p>{animal?.feeding || "Brak danych o diecie."}</p>;
            case "weterynarz":
                return <p>{"Brak zapisanych wizyt u weterynarza."}</p>;
            case "odrobaczenie":
                return <p>{"Informacje o odrobaczeniach będą tutaj."}</p>;
            case "historia":
                return <p>{"Historia zdrowia zwierzęcia."}</p>;
            default:
                return null;
        }
    };

    if (loading) {
        return <p>Ładowanie danych zwierzęcia...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="animal-profile-layout">
            <div className="animal-details-container">
                <img
                    src={animal?.image || 'https://placehold.co/300x300'}
                    alt={animal?.name || 'Zwierzę'}
                    className="animal-profile-image"
                />
                <h1 className="animal-name">{animal?.name || 'Brak nazwy'}</h1>
                <div className="animal-tools-container">
                    <button className="animal-tools-button">Dodaj zdjęcie</button>
                    <button className="animal-tools-button">Usuń zwierzaka</button>
                </div>
            </div>
            <div className="animal-sidebar-menu">
                <div className="animal-tabs">
                    <button
                        className={`animal-menu-item ${activeTab === "dieta" ? "active" : ""}`}
                        onClick={() => setActiveTab("dieta")}
                    >
                        Dieta
                    </button>
                    <button
                        className={`animal-menu-item ${activeTab === "weterynarz" ? "active" : ""}`}
                        onClick={() => setActiveTab("weterynarz")}
                    >
                        Wizyty u weterynarza
                    </button>
                    <button
                        className={`animal-menu-item ${activeTab === "odrobaczenie" ? "active" : ""}`}
                        onClick={() => setActiveTab("odrobaczenie")}
                    >
                        Odrobaczenia
                    </button>
                    <button
                        className={`animal-menu-item ${activeTab === "historia" ? "active" : ""}`}
                        onClick={() => setActiveTab("historia")}
                    >
                        Historia
                    </button>
                </div>
                <div className="animal-tab-content">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );    
}

export default AnimalProfile;
