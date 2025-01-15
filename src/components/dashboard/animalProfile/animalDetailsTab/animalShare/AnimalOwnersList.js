import { useEffect, useState } from "react";
import { revokePetAccess } from "../../../../../api/petApi";
import { useAnimal } from "../../../../../context/AnimalContext";
import AnimalOwner from "./AnimalOwner";
import "./AnimalOwnersList.css"

const AnimalOwnersList = ({ animal }) => {
    const [owners, setOwners] = useState([]);
    const {triggerRefresh} = useAnimal();

    useEffect(() => {
        setOwners(animal.shared);
    }, [animal])

    const handleOwnerRemoval = async (owner) => {
        if(owner.access_level === 0) return;
        await revokePetAccess(animal.id, owner.user_id);
        const idx = owners.find((u) => u.username === owner.username);
        owners.splice(idx, 1);
        setOwners(owners);
        triggerRefresh();
    }

    return (
        <div className="animal-share-owners-list">
            {owners.length > 0 ? 
                owners.map((s, i) => <AnimalOwner user={s} key={i} handleRemoval={handleOwnerRemoval}/>) 
                : "Brak współwłaścicieli"}
        </div>  
    );
}

export default AnimalOwnersList;
