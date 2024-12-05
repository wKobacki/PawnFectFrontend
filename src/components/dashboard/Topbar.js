import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard/Topbar.css";

const Topbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const avatarUrl = localStorage.getItem('avatar_url');
    return (
        <header className="topbar">
            <div className="profile-section" onClick={() => navigate("/profile")}>
                <img
                    src={avatarUrl ? avatarUrl : "https://via.placeholder.com/40"}
                    alt="Profil"
                    className="profile-picture"
                />
                <span className="profile-name">Twój Profil</span>
            </div>

            <div className="settings-section">
                <button
                    className="settings-button"
                    onClick={toggleMenu}
                >
                    ⚙️
                </button>

                {isMenuOpen && (
                    <ul className="settings-menu">
                        <li onClick={() => navigate("/resetPass/Loged")}>
                            Zmień hasło
                        </li>
                        {/* Inne funkcjonalności możesz dodać tutaj */}
                        <li onClick={() => navigate("/profile")}>
                            Zmiana profilowego
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
};

export default Topbar;
