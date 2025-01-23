import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimalProvider } from "./context/AnimalContext";
import { AuthProvider } from "./context/AuthContext"; // Importuj AuthProvider
import HomePage from "./components/homePage/HomePage";
import LoginPage from "./components/loginPage/LoginPage";
import RegisterPage from "./components/registerPage/RegisterPage";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./context/PrivateRoute"; // Komponent PrivateRoute
import ResetPasswordNotLoged from "./components/resetPasswordPage/ResetPassAsNotLoged";
import ResetPasswordLoged from "./components/resetPasswordPage/ResetPassAsLoged";
import ProfilPage from "./components/ProfilPage"
import "./App.css";
// import AnimalPhotoUpload from ".components\dashboard\animalProfile\animalDetailsTab\animalPhotoUpload\AnimalPhotoUpload"

function App() {
  return (
    <AuthProvider> {/* Opakowujemy całą aplikację w AuthProvider */}
    <AnimalProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
            {/* Chronione trasy */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute> {/* Tylko zalogowani użytkownicy mogą przejść do Dashboard */}
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/resetPass" element={<ResetPasswordNotLoged />} />
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilPage />
            </PrivateRoute>
            } />
          {/* <Route path="/animals/:animalId/avatar" element={
            <PrivateRoute>
              <AnimalPhotoUpload/>
            </PrivateRoute>
          }/> */}
          <Route path="/resetPass/Loged" element={<ResetPasswordLoged />} />
          {/* <Route
            path="/animal/:animalId" // Dynamiczna trasa dla profilu zwierzęcia
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
