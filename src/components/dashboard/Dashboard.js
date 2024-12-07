import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAnimal } from "../../context/AnimalContext";
import AnimalProfile from "../AnimalProfile";
import "../../styles/dashboard/Dashboard.css";

function Dashboard() {
  const { selectedAnimal, selectAnimal, animals } = useAnimal();
  const [ isSidebarVisible, setSidebarVisible ] = useState(false);

  useEffect(() => {
    if(selectedAnimal == null && animals?.length > 0){
      selectAnimal(animals[0].id);
    }
  })
 
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  }

  return (
    <div className="dashboard-layout">
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar}/>
      <Topbar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible}/>
      <div className="dashboard-content">
        <AnimalProfile animalId={selectedAnimal}/>
      </div>
    </div>
  );
}

export default Dashboard;
