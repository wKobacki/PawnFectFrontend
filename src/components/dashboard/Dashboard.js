import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../styles/dashboard/Dashboard.css";
import Topbar from "./Topbar";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate("/"); 
  };
 
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
      <Topbar />

        
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
