import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAnimalClick = (animalId) => {
    navigate(`/animal/${animalId}`); // Przykładowa trasa dla zwierzaka
  };

  const handleAddAnimalClick = () => {
    navigate("/add-animal"); // Trasa do dodania nowego zwierzaka
  };

  const animals = [
    { id: 1, name: "Pies", image: "https://via.placeholder.com/100" },
    { id: 2, name: "Kot", image: "https://via.placeholder.com/100" },
  ];

  return (
    <div className="dashboard-layout">
      {/* Menu boczne */}
      <nav className="sidebar">
        <h1 className="sidebar-title">Pawfect</h1>
        <hr className="sidebar-divider" />
        <div className="animal-gallery">
          {animals.map((animal) => (
            <div
              key={animal.id}
              className="animal-circle"
              onClick={() => handleAnimalClick(animal.id)}
            >
              <img src={animal.image} alt={animal.name} />
              <span className="animal-name">{animal.name}</span>
            </div>
          ))}
          <div
            className="animal-circle add-animal"
            onClick={handleAddAnimalClick}
          >
            <span className="add-icon">+</span>
          </div>
        </div>
      </nav>

      {/* Główna sekcja */}
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

        <div className="dashboard-container">
          <h2>Panel główny</h2>
          <p>Witaj w aplikacji</p>
          <button onClick={handleLogout}>Wyloguj się</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
