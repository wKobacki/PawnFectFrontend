import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPets, createNewPet } from "../api/petApi"; 
import AddAnimal from "./AddAnimal"; 
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [isAddAnimalOpen, setIsAddAnimalOpen] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  // Pobieramy token i userId z localStorage
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);
    
      if (!token || !userId) {
        setError("Brak tokena dostępu lub userId.");
        setLoading(false);
        return;
      }
    
      try {
        const pets = await getPets(userId, token);
        setAnimals(pets);
      } catch (error) {
        setError(error.message || "Błąd podczas pobierania zwierząt.");
      } finally {
        setLoading(false);
      }
    };    

    if (token && userId) {
      fetchPets();
    }
  }, [token, userId]); 

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate("/"); 
  };

  const handleAddAnimalClick = () => {
    setIsAddAnimalOpen(true); 
  };

  const handleAddAnimalSubmit = async (newAnimal) => {
    try {
        const addedAnimal = await createNewPet({...newAnimal, userId}, token);
        setAnimals((prevAnimals) => [...prevAnimals, addedAnimal]); 
        setIsAddAnimalOpen(false);
    } catch (error) {
        setError(error.message || "Błąd podczas dodawania zwierzęcia.");
    }
  };

  const handleAnimalClick = (animalId) => {
    navigate(`/animal/${animalId}`); 
  };  

  return (
    <div className="dashboard-layout">
      <nav className="sidebar">
        <h1 className="sidebar-title">Pawfect</h1>
        <hr className="sidebar-divider" />
        <div className="animal-gallery">
          {loading ? (
            <p>Ładowanie zwierząt...</p> 
          ) : error ? (
            <p>{error}</p> 
          ) : (
            // Renderowanie zwierząt
            animals.length === 0 ? (
              <p>Brak zwierząt w bazie danych</p>
            ) : (
              animals.map((animal) => (
                <div
                  key={animal.id}
                  className="animal-circle"
                  onClick={() => handleAnimalClick(animal.id)} 
                >
                  <img src={animal.image} alt={animal.name} />
                  <span className="animal-name">{animal.name}</span>
                </div>
              ))
            )
          )}
          <div
            className="animal-circle add-animal"
            onClick={handleAddAnimalClick} 
          >
            <span className="add-icon">+</span>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <header className="topbar">
          <div className="profile-section" onClick={() => navigate("/profile")}>
            <img
              src="https://via.placeholder.com/40"
              alt="Profil"
              className="profile-picture"
            />
            <span className="profile-name">Twój Profil</span>
          </div>
          <button
            className="settings-button"
            onClick={() => navigate("/settings")} 
          >
            ⚙️
          </button>
        </header>

        {!isAddAnimalOpen && (
          <div className="dashboard-container">
            <h2>Panel główny</h2>
            <p>Witaj w aplikacji</p>
            <button onClick={handleLogout}>Wyloguj się</button>
          </div>
        )}

        {isAddAnimalOpen && (
          <AddAnimal
            onClose={() => setIsAddAnimalOpen(false)} 
            onSubmit={handleAddAnimalSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
