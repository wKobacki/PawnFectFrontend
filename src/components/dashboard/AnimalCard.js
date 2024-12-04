import "../../styles/dashboard/AnimalCard.css";
import { useNavigate } from "react-router-dom";

const AnimalCard = ({ animal }) => {
  const navigate = useNavigate();
  return (
    <div
      className="animal-circle"
      onClick={() => navigate(`/animal/${animal.id}`)} 
    >
      <img src={animal.image} alt={animal.name} />
      <span className="animal-name">{animal.name}</span>
    </div>
  );
}

export default AnimalCard;
