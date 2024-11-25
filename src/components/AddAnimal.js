import React, { useState } from "react";
import "../styles/AddAnimal.css";

function AddAnimal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    parentNames: "",
    breed: "",
    colorShade: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Imię zwierzaka jest wymagane.");
      return;
    }
    onSubmit(formData); // Przekazanie danych do komponentu rodzica
  };

  return (
    <div className="add-animal-modal">
      <div className="add-animal-content">
        <h2>Dodaj nowego zwierzaka</h2>
        <form className="add-animal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Imię</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Wpisz imię"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthDate">Data urodzenia</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="parentNames">Imiona rodziców</label>
            <input
              type="text"
              id="parentNames"
              name="parentNames"
              value={formData.parentNames}
              onChange={handleChange}
              placeholder="Wpisz imiona rodziców"
            />
          </div>
          <div className="form-group">
            <label htmlFor="breed">Rasa</label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Wpisz rasę"
            />
          </div>
          <div className="form-group">
            <label htmlFor="colorShade">Odcień koloru</label>
            <input
              type="text"
              id="colorShade"
              name="colorShade"
              value={formData.colorShade}
              onChange={handleChange}
              placeholder="Wpisz odcień koloru"
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Zdjęcie</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">
              Dodaj zwierzaka
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAnimal;
