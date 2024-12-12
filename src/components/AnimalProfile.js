import React, { useState, useEffect } from "react";
import { getAnimalDetails } from "../api/petApi";
import { addPetVisit } from "../api/petApi"; // Dodaj import funkcji do dodawania wizyty
import "../styles/dashboard/AnimalProfile.css";
import AnimalTools from "./AnimalTools";

function AnimalProfile({ animalId }) {
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("dieta");
    const [visitData, setVisitData] = useState({
        visitDate: "",
        visitDescription: "",
        visitType: ""
    });
    const [visitError, setVisitError] = useState("");
    
    const [allergies, setAllergies] = useState([]);
    const [goodFoods, setGoodFoods] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newFoodData, setNewFoodData] = useState({
        foodType: "",
        isAllergen: false
    });

    const [visits, setVisits] = useState([]);
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
                setAllergies(data.allergies || []);
                setGoodFoods(data.goodFoods || []);
                setVisits(data.visits || []);
                setError(null);
            } catch (err) {
                setError("Błąd podczas ładowania danych zwierzęcia.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnimalDetails();
    }, [animalId]);

    useEffect(() => {
        setAnimationKey((prevKey) => prevKey + 1);
    }, [animalId]);

    const handleVisitInputChange = (e) => {
        const { name, value } = e.target;
        setVisitData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddVisit = async () => {
        const { visitDate, visitDescription, visitType } = visitData;

        if (!visitDate || !visitDescription || !visitType) {
            setVisitError("Wszystkie pola muszą być wypełnione.");
            return;
        }

        try {
            await addPetVisit(animalId, visitData);
            setVisits([...visits, visitData]);
            setVisitData({
                visitDate: "",
                visitDescription: "",
                visitType: ""
            });
            setVisitError("");
            alert("Wizyta została dodana!");
        } catch (error) {
            setVisitError("Błąd podczas dodawania wizyty.");
        }
    };

    const handleAddFood = () => {
        if (newFoodData.foodType) {
            if (newFoodData.isAllergen) {
                setAllergies([...allergies, newFoodData.foodType]);
            } else {
                setGoodFoods([...goodFoods, newFoodData.foodType]);
            }
            setNewFoodData({ foodType: "", isAllergen: false });
            setShowAddForm(false);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "dieta":
                return (
                    <div className="diet-info-container">
                        <div className="diet-column">
                            <h3>Alergeny</h3>
                            <ul>
                                {allergies.length > 0 ? allergies.map((item, index) => (
                                    <li key={index}>{item}</li>
                                )) : <p>Brak danych o alergiach.</p>}
                            </ul>
                        </div>
                        <div className="diet-column">
                            <h3>Dobry Pokarm</h3>
                            <ul>
                                {goodFoods.length > 0 ? goodFoods.map((item, index) => (
                                    <li key={index}>{item}</li>
                                )) : <p>Brak danych o dobrym pokarmie.</p>}
                            </ul>
                        </div>
                        <button onClick={() => setShowAddForm(true)} className="add-food-button">
                            Dodaj produkt
                        </button>
                        {showAddForm && (
                            <div className="add-food-form">
                                <h3>Dodaj nowy produkt</h3>
                                <input
                                    type="text"
                                    placeholder="Nazwa produktu"
                                    value={newFoodData.foodType}
                                    onChange={(e) => setNewFoodData({ ...newFoodData, foodType: e.target.value })}
                                />
                                <label>
                                    Alergen
                                    <input
                                        type="checkbox"
                                        checked={newFoodData.isAllergen}
                                        onChange={() => setNewFoodData({ ...newFoodData, isAllergen: !newFoodData.isAllergen })}
                                    />
                                </label>
                                <button onClick={handleAddFood}>Dodaj</button>
                            </div>
                        )}
                    </div>
                );
            case "weterynarz":
                return (
                    <div className="animal-visit-form-container">
                        <h2>Wizyty u weterynarza</h2>
                        <div className="existing-visits">
                            <h3>Dotychczasowe wizyty:</h3>
                            <ul>
                                {visits.length > 0 ? visits.map((visit, index) => (
                                    <li key={index}>
                                        <strong>Data wizyty:</strong> {visit.visitDate}<br />
                                        <strong>Opis:</strong> {visit.visitDescription}<br />
                                        <strong>Powód:</strong> {visit.visitType}
                                    </li>
                                )) : <p>Brak wizyt w historii.</p>}
                            </ul>
                        </div>

                        {!showAddForm && (
                            <button onClick={() => setShowAddForm(true)} className="add-visit-button">
                                Dodaj wizytę
                            </button>
                        )}

                        {showAddForm && (
                            <form>
                                <div>
                                    <label className="animal-visit-form-label">Data wizyty:</label>
                                    <input
                                        type="datetime-local"
                                        name="visitDate"
                                        value={visitData.visitDate}
                                        onChange={handleVisitInputChange}
                                        className="animal-visit-form-input"
                                    />
                                </div>
                                <div>
                                    <label className="animal-visit-form-label">Opis wizyty:</label>
                                    <textarea
                                        name="visitDescription"
                                        value={visitData.visitDescription}
                                        onChange={handleVisitInputChange}
                                        className="animal-visit-form-textarea"
                                    />
                                </div>
                                <div>
                                    <label className="animal-visit-form-label">Powód wizyty:</label>
                                    <input
                                        type="text"
                                        name="visitType"
                                        value={visitData.visitType}
                                        onChange={handleVisitInputChange}
                                        className="animal-visit-form-input"
                                    />
                                </div>
                                {visitError && <p className="error-message">{visitError}</p>}
                                <button type="button" onClick={handleAddVisit} className="animal-visit-form-button">
                                    Dodaj wizytę
                                </button>
                            </form>
                        )}
                    </div>
                );
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
        <div key={animationKey} className="animal-animal-profile-layout">
            <div className="animal-animal-details-container">
                <img
                    src={animal?.image || 'https://placehold.co/300x300'}
                    alt={animal?.name || 'Zwierzę'}
                    className="animal-animal-profile-image"
                />
                <h1 className="animal-animal-name">{animal?.name || 'Brak nazwy'}</h1>
                <p className="animal-animal-birthdate">Data urodzenia: {animal?.birthdate || 'Nieznana'}</p>
                <p className="animal-animal-gender">Płeć: {animal?.gender || 'Nieznana'}</p>
                <p className="animal-animal-description">Opis: {animal?.description || 'Brak opisu'}</p>
                <AnimalTools />
            </div>
            <div className="animal-animal-sidebar-menu">
                <div className="animal-animal-tabs">
                    <button
                        className={`animal-animal-menu-item ${activeTab === "dieta" ? "active" : ""}`}
                        onClick={() => setActiveTab("dieta")}
                    >
                        Dieta
                    </button>
                    <button
                        className={`animal-animal-menu-item ${activeTab === "weterynarz" ? "active" : ""}`}
                        onClick={() => setActiveTab("weterynarz")}
                    >
                        Wizyty u weterynarza
                    </button>
                </div>
                <div className="animal-animal-tab-content">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}

export default AnimalProfile;
