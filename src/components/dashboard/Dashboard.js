import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAnimal } from "../../context/AnimalContext";
import AnimalProfile from "../AnimalProfile";
import AddAnimal from "./AddAnimal";
import "../../styles/dashboard/Dashboard.css";

function Dashboard() {
  const { selectedAnimal, selectAnimal, animals } = useAnimal();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isAddingAnimal, setIsAddingAnimal] = useState(false); // Nowy stan

  useEffect(() => {
    if (selectedAnimal == null && animals?.length > 0) {
      selectAnimal(animals[0].id);
    }
  }, [selectedAnimal, animals, selectAnimal]);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        isVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
        onAddAnimal={() => setIsAddingAnimal(true)} // Nowy callback
      />
      <Topbar toggleSidebar={toggleSidebar} />
      <div className="dashboard-content">
        {isAddingAnimal ? (
          <AddAnimal onCancel={() => setIsAddingAnimal(false)} /> // Przekazanie funkcji powrotu
        ) : (
          selectedAnimal && <AnimalProfile animalId={selectedAnimal} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
