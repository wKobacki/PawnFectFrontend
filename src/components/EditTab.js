import { useEffect, useState } from "react";
import { updatePet } from "../api/petApi"; 
import "../styles/EditTab.css";

const EditTab = ({ animal = {}, onUpdate = () => {} }) => {
    const [animalData, setAnimalData] = useState({
        name: '',
        gender: '',
        dateOfBirth: '',
        description: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        setAnimalData({
            name: animal.name || '',
            gender: animal.gender || '',
            dateOfBirth: animal.dateOfBirth || "",
            description: animal.description || "",
        });
    }, [animal]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnimalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        if (!animalData.name || !animalData.gender) {
            alert("Imię i płeć są wymagane.");
            return;
        }

        setLoading(true); 

        try {
            const petId = animal.id; 
            const response = await updatePet(petId, animalData);
            console.log("Zaktualizowano dane zwierzaka:", response);

            if (typeof onUpdate === "function") {
                onUpdate(response); 
            }

            setIsEditing(false); 
        } catch (error) {
            console.error("Błąd podczas aktualizacji zwierzaka:", error);
            alert("Wystąpił błąd podczas zapisywania danych zwierzaka.");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="edit-info-container">
            {isEditing ? (
                <div className="edit-form">
                    <h3>Edytuj Dane Zwierzaka</h3>
                    <label>
                        Imię:
                        <input
                            type="text"
                            name="name"
                            value={animalData.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Płeć:
                        <select
                            name="gender"
                            value={animalData.gender}
                            onChange={handleInputChange}
                        >
                            <option value=''>Wybierz płeć</option>
                            <option value='M'>Samiec</option>
                            <option value='F'>Samica</option>
                        </select>
                    </label>
                    <label>
                        Data urodzenia:
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={animalData.dateOfBirth}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Opis:
                        <textarea
                            name="description"
                            value={animalData.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button
                        onClick={handleSaveChanges}
                        className="save-button"
                        disabled={loading} 
                    >
                        {loading ? "Zapisuję..." : "Zapisz"} 
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="cancel-button"
                    >
                        Anuluj
                    </button>
                </div>
            ) : (
                <div className="animal-info">
                    <h3>Dane Zwierzaka</h3>
                    <p>
                        <strong>Imię:</strong> {animalData.name || "Brak danych"}
                    </p>
                    <p>
                        <strong>Płeć:</strong>{" "}
                        {animalData.gender || "Brak danych"}
                    </p>
                    <p>
                        <strong>Data urodzenia:</strong>{" "}
                        {animalData.dateOfBirth || "Brak danych"}
                    </p>
                    <p>
                        <strong>Opis:</strong>{" "}
                        {animalData.description || "Brak danych"}
                    </p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="edit-button"
                    >
                        Edytuj
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditTab;
