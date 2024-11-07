import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegistrationPage.css';

function RegistrationPage() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        photo: null,
    });

    const [errors, setErrors] = useState({});
    const [passwordValidity, setPasswordValidity] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        digit: false,
        specialChar: false,
    });
    const [passwordsMatch, setPasswordsMatch] = useState(null); // Dodano stan

    // Funkcja sprawdzająca poszczególne wymagania hasła
    const checkPasswordValidity = (password) => {
        const validity = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            digit: /\d/.test(password),
            specialChar: /[@$!%*?#&^_-]/.test(password),
        };
        setPasswordValidity(validity);
    };

    // Funkcja walidująca hasło przy wysyłaniu formularza
    const validatePassword = (password) => {
        const errors = {};
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^_-])[A-Za-z\d@$!%*?#&^_-]{8,}$/;

        if (!passwordRegex.test(password)) {
            errors.password = 'Hasło musi spełniać wszystkie wymagania.';
        }

        if (password !== formData.confirmPassword) {
            errors.confirmPassword = 'Hasła nie są identyczne.';
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
        setErrors({ ...errors, [name]: '' });

        if (name === 'password') {
            checkPasswordValidity(value);
        }

        // Sprawdź, czy hasła są identyczne
        if (name === 'password' || name === 'confirmPassword') {
            const { password, confirmPassword } = updatedFormData;
            if (password && confirmPassword) {
                setPasswordsMatch(password === confirmPassword);
            } else {
                setPasswordsMatch(null);
            }
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (step === 1) {
            // Walidacja hasła
            const validationErrors = validatePassword(formData.password);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
            } else {
                setStep(2);
            }
        } else {
            // Tutaj można dodać logikę wysyłania danych na serwer
            console.log(formData);
            alert('Rejestracja zakończona sukcesem!');
            // Przekierowanie użytkownika na stronę logowania
            navigate('/login');
        }
    };

    const skipPhotoUpload = () => {
        // Użytkownik zdecydował się pominąć dodawanie zdjęcia
        alert('Rejestracja zakończona sukcesem!');
        navigate('/login');
    };

    return (
        <div className="registration-container">
            {step === 1 && (
                <div className="registration-form">
                    <h2>Formularz Rejestracji</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nazwa użytkownika:</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            {errors.username && <span className="error">{errors.username}</span>}
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label>Hasło:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label>Potwierdź hasło:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            {/* Komunikat o zgodności haseł */}
                            {passwordsMatch !== null && (
                                <span className={`password-match ${passwordsMatch ? 'match' : 'no-match'}`}>
                                    {passwordsMatch ? 'Hasła są identyczne.' : 'Hasła nie są identyczne.'}
                                </span>
                            )}
                            {errors.confirmPassword && (
                                <span className="error">{errors.confirmPassword}</span>
                            )}
                        </div>
                        {/* Lista wymagań hasła pod polem potwierdzenia hasła */}
                        <ul className="password-requirements">
                            <li className={passwordValidity.length ? 'valid' : 'invalid'}>
                                Minimum 8 znaków
                            </li>
                            <li className={passwordValidity.lowercase ? 'valid' : 'invalid'}>
                                Co najmniej jedna mała litera
                            </li>
                            <li className={passwordValidity.uppercase ? 'valid' : 'invalid'}>
                                Co najmniej jedna duża litera
                            </li>
                            <li className={passwordValidity.digit ? 'valid' : 'invalid'}>
                                Co najmniej jedna cyfra
                            </li>
                            <li className={passwordValidity.specialChar ? 'valid' : 'invalid'}>
                                Co najmniej jeden znak specjalny (@$!%*?#&^_-)
                            </li>
                        </ul>
                        <button type="submit" className="submit-button">
                            Dalej
                        </button>
                    </form>
                </div>
            )}

            {step === 2 && (
                <div className="photo-upload-form">
                    <h2>Dodaj zdjęcie (opcjonalnie)</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Wybierz zdjęcie:</label>
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            Zarejestruj się
                        </button>
                    </form>
                    <button onClick={skipPhotoUpload} className="skip-button">
                        Pomiń
                    </button>
                </div>
            )}
        </div>
    );
}

export default RegistrationPage;
