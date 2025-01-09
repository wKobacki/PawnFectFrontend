import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimal } from "../../context/AnimalContext";
import { useAuth } from "../../context/AuthContext";
import "../../styles/dashboard/Topbar.css";

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

        <div className="profile-name">
          <span onClick={() => navigate("/profile")}>Twój Profil</span>
        </div>

        <div className="settings-section">
          <button className="settings-button" onClick={() => toggleMenu()}>
            ⚙️
          </button>

          {isMenuOpen && (
            <ul className="settings-menu">
              <li onClick={() => navigate("/resetPass/Loged")}>Zmień hasło</li>
              <li onClick={() => navigate("/profile")}>Zmiana profilowego</li>
              <li
                onClick={() => handleLogout()}
                className="settings-menu-logout"
              >
                Wyloguj się
              </li>
            </ul>
          )}
        </div>
      </header>
    </div>
  );
};

export default Topbar;
