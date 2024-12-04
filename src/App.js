import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";

import { AuthProvider } from "./context/AuthContext"; // Importuj AuthProvider
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute"; // Komponent PrivateRoute
import AddAnimal from "./components/dashboard/AddAnimal";
import ResetPassword from "./components/ResetPasPage";
import AnimalProfile from "./components/AnimalProfile"; // Komponent profilu zwierzęcia

function App() {
  return (
    <AuthProvider> {/* Opakowujemy całą aplikację w AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          
          {/* Chronione trasy */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute> {/* Tylko zalogowani użytkownicy mogą przejść do Dashboard */}
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-animal"
            element={
              <PrivateRoute> {/* Tylko zalogowani użytkownicy mogą dodawać zwierzęta */}
                <AddAnimal />
              </PrivateRoute>
            }
          />
          <Route path="/resetPass" element={<ResetPassword />} />

          {/* Trasa do profilu zwierzęcia */}
          <Route
            path="/animal/:animalId" // Dynamiczna trasa dla profilu zwierzęcia
            element={
              <PrivateRoute> {/* Tylko zalogowani użytkownicy mogą oglądać szczegóły zwierzęcia */}
                <AnimalProfile />  
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
