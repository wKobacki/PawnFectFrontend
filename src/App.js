import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AddAnimal from "./components/AddAnimal";
import ResetPassword from "./components/ResetPasPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {" "}
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-animal"
          element={
            <PrivateRoute>
              <AddAnimal />
            </PrivateRoute>
          }
        />
        <Route path="/resetPass" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
