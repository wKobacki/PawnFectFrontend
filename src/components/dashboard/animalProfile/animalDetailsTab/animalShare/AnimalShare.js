import { useState } from "react";
import { useAnimal } from "../../../../../context/AnimalContext";
import { sharePetAccess } from "../../../../../api/petApi";
import AnimalOwnersList from "./AnimalOwnersList";
import "./AnimalShare.css"

const AnimalShare = ({ animal }) => {
    const [user, setUser] = useState("");
    const [accessLevel, setAccessLevel] = useState(1);
    const {triggerRefresh} = useAnimal();

    const handleShareInputChange = (e) => {
        const { value } = e.target;
        setUser(value);
    };

    const handleAccessInputChange = (e) => {
        const { value } = e.target;
        setAccessLevel(value);
    }

    const handleAccessShare = async () => {
        await sharePetAccess(animal.id, user, accessLevel);
        triggerRefresh();
    }

    return (
        <div className="animal-share-container">
            <div className="animal-share-input-container">
                <input
                    type="text"
                    name="username"
                    value={user}
                    onChange={handleShareInputChange}
                    className="animal-share-input"
                    placeholder="username"
                />
                <select 
                    className="animal-share-access-level"
                    onChange={handleAccessInputChange}
                >
                    <option value={1}>Co-owner</option>
                    <option value={2}>Read-only</option>
                </select>
                <button
                    className="animal-share-submit"
                    onClick={handleAccessShare}
                >
                    Dodaj
                </button>
            </div>
            <AnimalOwnersList animal={animal}/>
        </div>
    )
}

export default AnimalShare;
