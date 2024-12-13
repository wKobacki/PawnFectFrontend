import { useEffect, useState } from "react";
import "../styles/DietTab.css";

const DietTab = ({ animal }) => {
    
    const [allergies, setAllergies] = useState([]);
    const [goodFoods, setGoodFoods] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newFoodData, setNewFoodData] = useState({
        foodType: "",
        isAllergen: false
    });
    
    useEffect(() => {
        setAllergies(animal.allergies || []);
        setGoodFoods(animal.goodFoods || []);
    }, [])

    const handleAddFood = () => {
        if (newFoodData.foodType) {
            if (newFoodData.isAllergen) {
                setAllergies([...allergies, newFoodData.foodType]);
            } else {
                setGoodFoods([...goodFoods, newFoodData.foodType]);
            }
            setNewFoodData({ foodType: "", isAllergen: false });
            setShowAddForm(false);
        }
    };

    return (
        <div className="diet-info-container">
            <div className="diet-column">
                <h3>Alergeny</h3>
                <ul>
                    {allergies.length > 0 ? allergies.map((item, index) => (
                        <li key={index}>{item}</li>
                    )) : <p>Brak danych o alergiach.</p>}
                </ul>
            </div>
            <div className="diet-column">
                <h3>Dobry Pokarm</h3>
                <ul>
                    {goodFoods.length > 0 ? goodFoods.map((item, index) => (
                        <li key={index}>{item}</li>
                    )) : <p>Brak danych o dobrym pokarmie.</p>}
                </ul>
            </div>
            <button onClick={() => setShowAddForm(true)} className="add-food-button">
                Dodaj produkt
            </button>
            {showAddForm && (
                <div className="add-food-form">
                    <h3>Dodaj nowy produkt</h3>
                    <input
                        type="text"
                        placeholder="Nazwa produktu"
                        value={newFoodData.foodType}
                        onChange={(e) => setNewFoodData({ ...newFoodData, foodType: e.target.value })}
                    />
                    <label>
                        Alergen
                        <input
                            type="checkbox"
                            checked={newFoodData.isAllergen}
                            onChange={() => setNewFoodData({ ...newFoodData, isAllergen: !newFoodData.isAllergen })}
                        />
                    </label>
                    <button onClick={handleAddFood}>Dodaj</button>
                </div>
            )}
        </div>
    );
}

export default DietTab;
