import React, { useState } from "react";
import "../styles/AddAnimal.css";

function AddAnimal() {
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
    console.log("Dane zwierzaka:", formData);
    // Tu dodaj logikę przesyłania danych na serwer
  };

  return (
    <div className="add-animal-container">
      <h2>Dodaj nowego zwierzaka</h2>
      <form className="add-animal-form" onSubmit={handleSubmit}>
        {/* Imię */}
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

        {/* Data urodzenia */}
        <div className="form-group">
          <label htmlFor="birthDate">Data urodzenia</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Imiona rodziców */}
        <div className="form-group">
          <label htmlFor="parentNames">Imiona rodziców</label>
          <input
            type="text"
            id="parentNames"
            name="parentNames"
            value={formData.parentNames}
            onChange={handleChange}
            placeholder="Wpisz imiona rodziców"
            required
          />
        </div>

        {/* Rasa */}
        <div className="form-group">
          <label htmlFor="breed">Rasa</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Wpisz rasę"
            required
          />
        </div>

        {/* Odcień koloru */}
        <div className="form-group">
          <label htmlFor="colorShade">Odcień koloru</label>
          <input
            type="text"
            id="colorShade"
            name="colorShade"
            value={formData.colorShade}
            onChange={handleChange}
            placeholder="Wpisz odcień koloru"
            required
          />
        </div>

        {/* Zdjęcie */}
        <div className="form-group">
          <label htmlFor="photo">Zdjęcie</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            required
          />
        </div>

        {/* Przyciski */}
        <button type="submit" className="submit-button">
          Dodaj zwierzaka
        </button>
      </form>
    </div>
  );
}

export default AddAnimal;
