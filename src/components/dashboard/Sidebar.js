import AnimalGallery from "./AnimalGallery";
import AddAnimalCard from "./AddAnimalCard";

import "../../styles/dashboard/Sidebar.css";

const Sidebar = ({ isVisible, toggleSidebar }) => {
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
          <AnimalGallery/>
          <AddAnimalCard/>
      </nav>
    </div>
  );
}

export default Sidebar;
