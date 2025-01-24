import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimal } from "../../context/AnimalContext";
import { useAuth } from "../../context/AuthContext";
import "./Topbar.css";
import LogoutImage from "../../assets/logout.png"

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setAnimals, selectAnimal } = useAnimal();
  const { logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setAnimals([]);
    selectAnimal(null);
    navigate("/");
  };

  const avatarUrl = localStorage.getItem("avatar_url");

  return (
    <div className="topbar-container">
      <header className="topbar">
        <div className="menu-button">
          <button onClick={toggleSidebar}>☰</button>
        </div>

        {/* Kliknięcie w avatar przekieruje do profilu */}
        <div
          className="profile-picture"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={avatarUrl ? avatarUrl : "https://via.placeholder.com/40"}
            alt="Profil"
          />
        </div>

          <button className="settings-button" onClick={() => handleLogout()}>
            <img src={LogoutImage} alt="LogOutImage" className="image-logout" />
          </button>
      </header>
    </div>
  );
};

export default Topbar;
