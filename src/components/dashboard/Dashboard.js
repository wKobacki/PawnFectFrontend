import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAnimal } from "../../context/AnimalContext";
import AnimalProfile from "../AnimalProfile";
import "../../styles/dashboard/Dashboard.css";

function Dashboard() {
  const { selectedAnimal, selectAnimal, animals } = useAnimal();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

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
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <Topbar toggleSidebar={toggleSidebar} />
      <div className="dashboard-content">
<<<<<<< HEAD
        {selectedAnimal && <AnimalProfile animalId={selectedAnimal} />}
        {selectedAnimal && <AnimalPhotoUpload />}
=======
        { selectedAnimal && <AnimalProfile animalId={selectedAnimal} />}
>>>>>>> e1e19dd0c5f51c7c8641e62efaafefd0e02797de
      </div>
    </div>
  );
}

export default Dashboard;
