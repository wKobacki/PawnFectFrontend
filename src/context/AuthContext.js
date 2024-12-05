import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  
  // Ładowanie tokena i userId z localStorage po załadowaniu komponentu
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");  
    const storedUserId = localStorage.getItem("userId");
    const avatarUrl = localStorage.getItem('avatar_url');
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);  
    }
    if(avatarUrl){
      setAvatarUrl(avatarUrl);
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
    localStorage.removeItem('avatar_url');
    setToken(null); 
    setUserId(null);
    setAvatarUrl(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, avatarUrl, setAvatarUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}
