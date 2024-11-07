import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

import logo from '../assets/logo.png';
import dogImage from '../assets/dog.jpg';
import catImage from '../assets/cat.jpg';

function HomePage() {
    return (
        <div className="home-container">
            {/* Panel nawigacyjny z wyśrodkowanym logo i przyciskami po prawej stronie */}
            <nav className="navbar">
                <div className="nav-left"></div>
                <div className="nav-center">
                    <img src={logo} alt="Logo" className="logo" />
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

            {/* Sekcja z psem */}
            <section className="section dog-section">
                <div className="section-content">
                    <img src={dogImage} alt="Pies" className="section-image-dog" />
                    <div className="section-text-dog">
                        <h2>Użytkownik Jan Kowalski</h2>
                        <p>
                            "Ta aplikacja całkowicie odmieniła moje życie. Zarządzanie moimi
                            zwierzętami nigdy nie było prostsze!"
                        </p>
                    </div>
                </div>
            </section>

            {/* Sekcja z kotem */}
            <section className="section cat-section">
                <div className="section-content">
                    <div className="section-text-cat">
                        <h2>Użytkowniczka Anna Nowak</h2>
                        <p>
                            "Dzięki tej aplikacji mam wszystko pod kontrolą. Polecam każdemu
                            właścicielowi zwierząt."
                        </p>
                    </div>
                    <img src={catImage} alt="Kot" className="section-image-cat" />
                </div>
            </section>
        </div>
    );
}

export default HomePage;
