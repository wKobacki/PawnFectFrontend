import "../../styles/dashboard/AddAnimalCard.css";

const AddAnimalCard = ({ onClick }) => {
  return (
    <div className="animal-circle add-animal" onClick={onClick}>
      <span className="add-icon">+</span>
    </div>
  );
};

export default AddAnimalCard;
