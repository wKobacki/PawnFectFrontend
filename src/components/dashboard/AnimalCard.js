import { useAnimal } from "../../context/AnimalContext";
import "../../styles/dashboard/AnimalCard.css";
import { useNavigate } from "react-router-dom";

const AnimalCard = ({ animal }) => {
  const navigate = useNavigate();
  const { selectAnimal } = useAnimal();
  return (
    <div
      className="animal-circle"
      onClick={() => selectAnimal(animal.id)} 
    >
      <img src={animal.image ? animal.image : 'https://placehold.co/100'} alt={animal.name} />
      <span className="animal-name">{animal.name}</span>
    </div>
  );
}

export default AnimalCard;
