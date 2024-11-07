import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Dashboard.css';
import { Navigate } from 'react-router-dom';

function Dashboard() {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout(Navigate);
    };

    return (
        <div className="dashboard-container">
            <h2>Panel główny</h2>
            <p>Witaj w aplikacji zarządzania zwierzętami!</p>
            <button onClick={handleLogout}>Wyloguj się</button>
        </div>
    );
}

export default Dashboard;
