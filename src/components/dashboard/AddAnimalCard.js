import "../../styles/dashboard/AddAnimalCard.css";
import { useNavigate } from "react-router-dom";

const AddAnimalCard = () => {
  const navigate = useNavigate();
  return (
    <div
      className="animal-circle add-animal"
      onClick={() => navigate("/add-animal")}
    >
      <span className="add-icon">+</span>
    </div>
  );
};

export default AddAnimalCard;
