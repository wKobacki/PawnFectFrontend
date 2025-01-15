import AnimalGallery from "./animalGallery/AnimalGallery";
import AddAnimalCard from "./addAnimalCard/AddAnimalCard";
import "./Sidebar.css";

const Sidebar = ({ isVisible, toggleSidebar, onAddAnimal }) => {
  return (
    <div className={`sidebar-container ${isVisible ? "show" : ""}`}>
      <nav className="sidebar">
        <h1 className="sidebar-title">Pawfect</h1>
        <hr className="sidebar-divider" />
        <button
          className={`sidebar-close-button ${!isVisible ? "hidden" : ""}`}
          onClick={toggleSidebar}
        >
          ✖️
        </button>
        <AnimalGallery />
        <AddAnimalCard onClick={onAddAnimal} />
      </nav>
    </div>
  );
};

export default Sidebar;
