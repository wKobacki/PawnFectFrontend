import { useState } from "react";
import DietTab from "./DietTab";
import VisitTab from "./VisitTab";
import "../styles/AnimalDetailsTab.css";
import { useAnimal } from "../context/AnimalContext";
import AnimalPhotoUpload from "./AnimalPhotoUpload";
import EditTab from "./EditTab"; 
import AnimalShare from "./AnimalShare";

const AnimalDetailsTab = ({ animal }) => {
    const [activeTab, setActiveTab] = useState("dieta");
    const { triggerRefresh } = useAnimal();

    const renderTabContent = () => {
        switch (activeTab) {
            case "dieta":
                return <DietTab animal={animal} />;
            case "weterynarz":
                return <VisitTab animal={animal} />;
            case "avatar":
                return <AnimalPhotoUpload />;
            case "edit":
                return <EditTab animal={animal} />
            case "share":
                return <AnimalShare animal={animal} />
                
            default:
                return null;
        }
    };

    return (
        <div className="animal-animal-sidebar-menu">
            <div className="animal-animal-tabs">
                <button
                    className={`animal-animal-menu-item ${activeTab === "dieta" ? "active" : ""}`}
                    onClick={() => {
                        setActiveTab("dieta");
                        triggerRefresh();
                    }}
                >
                    Dieta
                </button>
                <button
                    className={`animal-animal-menu-item ${activeTab === "weterynarz" ? "active" : ""}`}
                    onClick={() => {
                        setActiveTab("weterynarz");
                        triggerRefresh();
                    }}
                >
                    Wizyty u weterynarza
                </button>
                <button
                    className={`animal-animal-menu-item ${activeTab === "avatar" ? "active" : ""}`}
                    onClick={() => setActiveTab("avatar")}
                >
                    Zmień zdjęcie
                </button>
                <button
                    className={`animal-animal-menu-item ${activeTab === "edit" ? "active" : ""}`}
                    onClick={() => setActiveTab("edit")}
                >
                    Edytuj
                </button>
                <button
                    className={`animal-animal-menu-item ${activeTab === "share" ? "active" : ""}`}
                    onClick={() => {setActiveTab("share")}}
                >
                    Współdzielenie
                </button>
            </div>
            <div className="animal-animal-tab-content">{renderTabContent()}</div>
        </div>
    );
};

export default AnimalDetailsTab;
