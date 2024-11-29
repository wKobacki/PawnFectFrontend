import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // Ładowanie tokena i userId z localStorage po załadowaniu komponentu
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");  
    const storedUserId = localStorage.getItem("userId");  
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);  
    }
  }, []);
  
  const login = (newToken, newUserId) => {
    localStorage.setItem("accessToken", newToken);   
    localStorage.setItem("userId", newUserId); 
    setToken(newToken);   
    setUserId(newUserId); 
  };   

  // Funkcja wylogowania
  const logout = () => {
    localStorage.removeItem("accessToken"); 
    localStorage.removeItem("userId"); 
    setToken(null); 
    setUserId(null); 
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
