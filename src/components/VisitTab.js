import { useEffect, useState } from "react";
import { addPetVisit } from "../api/petApi";
import "../styles/VisitTab.css";

const VisitTab = ({ animal }) => {
    const [visits, setVisits] = useState([]);
    const [visitData, setVisitData] = useState({
            visitDate: "",
            visitDescription: "",
            visitType: ""
    });
    const [visitError, setVisitError] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        setVisits(animal.visits || [])
    }, [])

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
            await addPetVisit(animal.id, visitData);
            setVisits([...visits, {
                visit_date: visitData.visitDate,
                notes: visitData.visitDescription,
                visit_type: visitData.visitType
            }]);
            setVisitData({
                visitDate: "",
                visitDescription: "",
                visitType: ""
            });
            setVisitError("");
        } catch (error) {
            setVisitError("Błąd podczas dodawania wizyty.");
        }
    };

    return (
        <div className="animal-visit-form-container">
            <h2>Wizyty u weterynarza</h2>
            <div className="existing-visits">
                <h3>Dotychczasowe wizyty:</h3>
                <ul>
                    {visits.length > 0 ? visits.map((visit, index) => (
                        <li key={index}>
                            <strong>Data wizyty:</strong> {visit.visit_date}<br />
                            <strong>Opis:</strong> {visit.notes}<br />
                            <strong>Powód:</strong> {visit.visit_type}
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
}

export default VisitTab;
