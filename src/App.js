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
import { AnimalProvider } from "./context/AnimalContext";

function App() {
  return (
    <AuthProvider> {/* Opakowujemy całą aplikację w AuthProvider */}
    <AnimalProvider> 
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

          {/* <Route
            path="/animal/:animalId" 
            element={
              <PrivateRoute> 
                <AnimalProfile />  
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </Router>
    </AnimalProvider>
    </AuthProvider>
  );
}

export default App;
