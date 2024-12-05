import React, { useState } from "react";
import "../../styles/dashboard/AddAnimal.css";
import { createNewPet } from "../../api/petApi";
import { useNavigate } from "react-router-dom";
import { useAnimal } from "../../context/AnimalContext";

const AddAnimal = () => {
  const { animals, updateAnimals } = useAnimal();

  const onSubmit = async (newAnimal) => {
    const userId = localStorage.getItem('userId');
    try {
        const response = await createNewPet({...newAnimal, userId});
        const newPet = response.newPet;
        updateAnimals(newPet);
    } catch (error) {
        console.error(error.message || "Błąd podczas dodawania zwierzęcia.");
    }
};

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    description: "",
  });

  const [errors, setErrors] = useState({}); 

  // Funkcja obsługująca zmiany w polach formularza
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Funkcja walidująca dane formularza
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Nazwa zwierzaka jest wymagana.";
    if (!formData.gender) newErrors.gender = "Wybierz płeć zwierzaka.";
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Data urodzenia jest wymagana.";
    } else if (new Date(formData.dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = "Data urodzenia nie może być w przyszłości.";
    }
    if (!formData.description) newErrors.description = "Opis jest wymagany.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData); 
      setFormData({ name: "", gender: "", dateOfBirth: "", description: "" });
    }
    navigate('/dashboard');
  };

  const handleClose = () => {
    setFormData({ name: "", gender: "", dateOfBirth: "", description: "" });
    navigate('/dashboard'); 
  };

  return (
    <div className="add-animal-container">
      <h2>Dodaj zwierzaka</h2>
      <form onSubmit={handleSubmit} className="add-animal-form">
        <div className="form-group">
          <label htmlFor="name">Nazwa zwierzaka</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-describedby="name-error"
          />
          {errors.name && <span id="name-error" className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Płeć</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            aria-describedby="gender-error"
          >
            <option value="">Wybierz płeć</option>
            <option value="M">Samiec</option>
            <option value="F">Samica</option>
          </select>
          {errors.gender && <span id="gender-error" className="error-text">{errors.gender}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Data urodzenia</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]} 
            required
            aria-describedby="dateOfBirth-error"
          />
          {errors.dateOfBirth && <span id="dateOfBirth-error" className="error-text">{errors.dateOfBirth}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Opis</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
            aria-describedby="description-error"
          />
          {errors.description && <span id="description-error" className="error-text">{errors.description}</span>}
        </div>

        <div className="button-group">
          <button type="submit" className="submit-button">
            Dodaj zwierzaka
          </button>
          <button type="button" className="cancel-button" onClick={handleClose}>
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnimal;
