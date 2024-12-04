import AnimalGallery from "./AnimalGallery";
import AddAnimalCard from "./AddAnimalCard";

import "../../styles/dashboard/Sidebar.css";

const Sidebar = ({handleAddAnimalClick}) => {
  return (
    <nav className="sidebar">
        <h1 className="sidebar-title">Pawfect</h1>
        <hr className="sidebar-divider" />
        <AnimalGallery/>
        <AddAnimalCard/>
    </nav>
  );
}

export default Sidebar;
