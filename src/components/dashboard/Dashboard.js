import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../styles/dashboard/Dashboard.css";
import Topbar from "./Topbar";
import { useAuth } from "../../context/AuthContext";
import { useAnimal } from "../../context/AnimalContext";
import AnimalProfile from "../AnimalProfile";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { setAnimals, animals } = useAnimal();
  const { selectedAnimal, selectAnimal } = useAnimal();
  if(selectedAnimal == null && animals?.length > 0){
    selectAnimal(animals[0].id);
  }
  const handleLogout = () => {
    logout();
    navigate("/");
    setAnimals([]);
  };
 
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />

          
        <div className="dashboard-container">
          <AnimalProfile animalId={selectedAnimal}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
