import "../../styles/dashboard/AddAnimalCard.css";
import { useNavigate } from "react-router-dom";

const AddAnimalCard = () => {
<<<<<<< HEAD
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
=======
    const navigate = useNavigate();
    return (
        <div
            className="animal-circle add-animal"
            onClick={() => navigate('/add-animal')} 
        >
            <span className="add-icon">+</span>
        </div>
    )
}
>>>>>>> 264d67292a04c3ec8cf9556f5965e758537efa43

export default AddAnimalCard;
