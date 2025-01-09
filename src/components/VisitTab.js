import { useEffect, useState } from "react";
import { addPetVisit, removePetVisit } from "../api/petApi";
import "../styles/VisitTab.css";
import AnimalVisit from "./AnimalVisit";
import { useAnimal } from "../context/AnimalContext";

const VisitTab = ({ animal }) => {
  const { refresh, triggerRefresh } = useAnimal();
  const [visits, setVisits] = useState([]);
  const [visitData, setVisitData] = useState({
    visitDate: "",
    visitDescription: "",
    visitType: "",
  });
  const [visitError, setVisitError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setVisits(animal.visits || []);
  }, []);

  const handleVisitInputChange = (e) => {
    const { name, value } = e.target;
    setVisitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddVisit = async () => {
    const { visitDate, visitDescription, visitType } = visitData;

    if (!visitDate || !visitDescription || !visitType) {
      setVisitError("Wszystkie pola muszą być wypełnione.");
      return;
    }

    try {
      const result = await addPetVisit(animal.id, visitData);
      const visit = result.visit;
      setVisits([...visits, visit]);
      setVisitData({
        visitDate: "",
        visitDescription: "",
        visitType: "",
      });
      setVisitError("");
      triggerRefresh();
    } catch (error) {
      setVisitError("Błąd podczas dodawania wizyty.");
    }
  };

  const handleRemoveVisit = async (vis) => {
    const idx = visits.findIndex((v) => v.id === vis.id);
    visits.splice(idx, 1);
    setVisits(visits);
    await removePetVisit(vis.id);
    triggerRefresh();
  };

  return (
    <div className="animal-visit-form-container">
      <h2>Wizyty u weterynarza</h2>
      <div className="existing-visits">
        <h3>Dotychczasowe wizyty:</h3>

        {visits.length > 0 ? (
          visits.map((visit, index) => (
            <AnimalVisit
              visit={visit}
              key={index}
              handleRemove={handleRemoveVisit}
            />
          ))
        ) : (
          <p>Brak wizyt w historii.</p>
        )}
      </div>

      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="add-visit-button"
        >
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
          <button
            type="button"
            onClick={handleAddVisit}
            className="animal-visit-form-button"
          >
            Dodaj wizytę
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            className="cancel-visit-button"
          >
            Anuluj
          </button>
        </form>
      )}
    </div>
  );
};

export default VisitTab;
