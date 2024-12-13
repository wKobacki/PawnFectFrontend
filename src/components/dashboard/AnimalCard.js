import { useAnimal } from "../../context/AnimalContext";
import "../../styles/dashboard/AnimalCard.css";

const AnimalCard = ({ animal }) => {
  const { selectAnimal } = useAnimal();
  return (
    <div className="animal-card" onClick={() => selectAnimal(animal.id)}>
      <div className="animal-circle">
        <img
          src={animal.image ? animal.image : "https://placehold.co/100"}
          alt={animal.name}
        />
      </div>
      <span className="animal-name">{animal.name}</span>
    </div>
  );
};
export default AnimalCard;
