import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Dodano Link
import { AuthContext } from '../context/AuthContext';
import '../styles/LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Tutaj dodaj logikę uwierzytelniania, np. wywołanie API
        login(); // Aktualizuje stan uwierzytelnienia
        navigate('/dashboard'); // Przekierowuje do panelu głównego
    };

    return (
        <div className="login-container">
            <h2>Logowanie</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Hasło:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Zaloguj się</button>
            </form>
            {/* Dodane linki do rejestracji i strony głównej */}
            <div className="login-links">
                <p>
                    Nie masz konta? <Link to="/register">Zarejestruj się</Link>
                </p>
                <p>
                    <Link to="/">Powrót do strony głównej</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
