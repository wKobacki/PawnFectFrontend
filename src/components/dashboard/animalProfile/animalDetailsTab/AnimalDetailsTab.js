import { useState } from "react";
import { useAnimal } from "../../../../context/AnimalContext";
import VisitTab from "./visitTab/VisitTab";
import DietTab from "./dietTab/DietTab";
import AnimalPhotoUpload from "./animalPhotoUpload/AnimalPhotoUpload";
import EditTab from "./editTab/EditTab";
import AnimalShare from "./animalShare/AnimalShare";
import "./AnimalDetailsTab.css";
import React from 'react';
import { deleteAnimal } from "../../../../api/petApi";

const AnimalDetailsTab = ({ animal }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const { triggerRefresh } = useAnimal();

  const checkPermission = () => {
    if (!animal.shared) return false; // Obsługa przypadku, gdy `shared` jest niezdefiniowane
    const userId = Number.parseInt(localStorage.getItem("userId"));
    const hasPermission = (u) => u.user_id === userId && u.access_level <= 1;
    return animal.shared.some((u) => hasPermission(u));
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć to zwierzę?");
    if (!confirmDelete) return;

    try {
      await deleteAnimal(animal.id); // Poprawione użycie `animal.id`
      alert("Zwierzę zostało usunięte.");
      triggerRefresh(); // Odświeżenie widoku po usunięciu
    } catch (error) {
      console.error("Błąd podczas usuwania zwierzęcia:", error.message);
      alert("Nie udało się usunąć zwierzęcia. Spróbuj ponownie.");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dieta":
        return <DietTab animal={animal} />;
      case "weterynarz":
        return <VisitTab animal={animal} />;
      case "avatar":
        return <AnimalPhotoUpload />;
      case "edit":
        return <EditTab animal={animal} />;
      case "share":
        return <AnimalShare animal={animal} />;
      case "profile":
        return (
          <div>
            <img
              src={animal?.image || "https://placehold.co/300x300"}
              alt={animal?.name || "Zwierzę"}
              className="animal-animal-profile-image"
            />
            <h1> {animal?.name}</h1>
            { <h1 className="animal-date-of-birth-container">{animal?.date_of_birth}</h1> }
            <p>{animal?.description}</p>
            {checkPermission() && 
              <div className="animal-profile-buttons">
                <button
                  className="change-animal-photo-button"
                  onClick={() => setActiveTab("avatar")}
                >
                  Zmień zdjęcie
                </button>
                <button
                  className="edit-animal-profile-button"
                  onClick={() => setActiveTab("edit")}
                >
                  Edytuj
                </button>
                <button 
                  className="delete-animal-profile-button"
                  onClick={handleDeleteClick}
                >
                  Usuń
                </button>
              </div>
            }
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="animal-animal-sidebar-menu">
      <div className="animal-animal-tabs">
        <button
          className={`animal-animal-menu-item ${
            activeTab === "profile" ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab("profile");
            triggerRefresh();
          }}
        >
          Ogólne
        </button>
        <button
          className={`animal-animal-menu-item ${
            activeTab === "dieta" ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab("dieta");
            triggerRefresh();
          }}
        >
          Dieta
        </button>
        <button
          className={`animal-animal-menu-item ${
            activeTab === "weterynarz" ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab("weterynarz");
            triggerRefresh();
          }}
        >
          Wizyty u weterynarza
        </button>
        <button
          className={`animal-animal-menu-item ${
            activeTab === "share" ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab("share");
          }}
        >
          Współdzielenie
        </button>
      </div>
      <div className="animal-animal-tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default AnimalDetailsTab;
