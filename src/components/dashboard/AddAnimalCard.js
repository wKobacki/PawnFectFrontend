import '../../styles/dashboard/AddAnimalCard.css';
import { useNavigate } from "react-router-dom";

const AddAnimalCard = () => {
    const navigate = useNavigate();
    return (
        <div
            className="add-animal animal-circle"
            onClick={() => navigate('/add-animal')} 
        >
            <span className="add-icon">+</span>
        </div>
    )
}

export default AddAnimalCard;
