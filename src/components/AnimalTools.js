import Swal from 'sweetalert2';
import '../styles/AnimalTools.css';
import { useAnimal } from '../context/AnimalContext';

const AnimalTools = () => {
    const { removeAnimal, selectedAnimal, selectAnimal, animals } = useAnimal();
    const showAnimalDeletionDialog = async () => {
        const dialogResult = await Swal.fire({
            title: 'Czy na pewno chcesz usunac zwierzaka?',
            showDenyButton: true,
            confirmButtonText: 'Tak',
            denyButtonText: 'Nie'
        });
        if(dialogResult.isConfirmed){
            await removeAnimal(selectedAnimal);
            selectAnimal(animals[0].id);
        }
    }
    return (
        <div className="animal-tools-container">
            <button className="animal-tools-remove-btn" onClick={() => showAnimalDeletionDialog()}>Usuń zwierzaka</button>
        </div>
    );
}

export default AnimalTools;
