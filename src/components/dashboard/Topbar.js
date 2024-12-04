import { useNavigate } from "react-router-dom";
import "../../styles/dashboard/Topbar.css"

const Topbar = () => {
    const navigate = useNavigate();
    return (
      <header className="topbar">
        <div className="profile-section" onClick={() => navigate("/profile")}>
          <img
            src="https://via.placeholder.com/40"
            alt="Profil"
            className="profile-picture"
          />
          <span className="profile-name">Twój Profil</span>
        </div>
        <button
          className="settings-button"
          onClick={() => navigate("/settings")} 
        >
          ⚙️
        </button>
      </header>
    );
}

export default Topbar;
