import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };

    return (
        <div className="dashboard-container">
            <h2>Panel główny</h2>
            <p>Witaj w aplikacji</p>
            <button onClick={handleLogout}>Wyloguj się</button>
        </div>
    );
}

export default Dashboard;
