// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

import logo from "../assets/logo.png";
import dogImage from "../assets/dog.jpg";
import catImage from "../assets/cat.jpg";

// Importujemy ikony słońca i księżyca
import { FaSun, FaMoon } from "react-icons/fa";

function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Funkcja przełączająca motyw
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`home-container ${darkMode ? "dark" : ""}`}>
      {/* Panel nawigacyjny z wyśrodkowanym logo i przyciskami po prawej stronie */}
      <nav className="navbar">
        <div className="nav-left">
          {/* Przycisk przełączania motywu */}
          <button onClick={toggleTheme} className="theme-toggle-button">
            {darkMode ? <FaMoon /> : <FaSun />}
          </button>
        </div>
        <div className="nav-center">
          {/* <img src={logo} alt="Logo" className="logo" /> */}
          <div className="nav-title">PawFect</div>
        </div>
        <div className="nav-right">
          <Link to="/login" className="nav-button">
            Zaloguj się
          </Link>
          <Link to="/register" className="nav-button">
            Zarejestruj się
          </Link>
        </div>
      </nav>
      {/* Duży napis pomiędzy sekcją nawigacyjną a sekcją z psem */}
      <div className="main-message">Aby twoim zwierzakom żyło się lepiej</div>

      {/* Sekcja z psem */}
      <section className="section dog-section">
        <div className="section-content">
          <img src={dogImage} alt="Pies" className="section-image-dog" />
          <div className="section-text-dog">
            <h2>Bruno</h2>
            <p>Wiek: 5 lat</p>
            <p>Rasa: Labrador</p>
            <p>Barwa: Złoty</p>
            <p>Dieta: Sucha karma</p>
            <p>Uczulenia: Brak</p>
          </div>
        </div>
      </section>

      {/* Sekcja z kotem */}
      <section className="section cat-section">
        <div className="section-content">
          <img src={catImage} alt="Kot" className="section-image-cat" />
          <div className="section-text-cat">
            <h2>Tygrys</h2>
            <p>Wiek: 3 lat</p>
            <p>Rasa: Dachowiec</p>
            <p>Barwa: Jasno-brązowa panterka</p>
            <p>Dieta: Mokre saszetki</p>
            <p>Uczulenia: Cytrusy</p>
          </div>
        </div>
      </section>

      {/* Sekcja "O aplikacji" */}
      <footer className="about-section">
        <h2>O aplikacji</h2>
        <p>
          Nasza aplikacja pomaga właścicielom zwierząt domowych w zarządzaniu
          informacjami o ich pupilach. Umożliwia łatwe śledzenie diety, alergii,
          historii zdrowia i innych ważnych informacji, które pomagają zapewnić
          najlepszą opiekę dla twojego zwierzaka. Dzięki intuicyjnemu
          interfejsowi, wszystkie informacje są zawsze pod ręką, a przypomnienia
          o wizytach u weterynarza lub zmianach w diecie pomagają zachować pełną
          kontrolę nad zdrowiem i dobrostanem pupila. Aplikacja jest idealnym
          rozwiązaniem zarówno dla nowych właścicieli, jak i doświadczonych
          opiekunów, chcących mieć wszystko w jednym miejscu.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
