import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom'; 
import { registerUser, verifyUser } from '../api/authApi';
import '../styles/RegistrationPage.css';

const RegistrationPage = () => {
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        verificationCode: '',
        photo: null,
    });
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [passwordsMatch, setPasswordsMatch] = useState(null);
    const [passwordValidity, setPasswordValidity] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        digit: false,
        specialChar: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
    
        if (name === 'password' || name === 'confirmPassword') {
            const { password, confirmPassword } = updatedFormData;
            if (password && confirmPassword) {
                setPasswordsMatch(password === confirmPassword);
            } else {
                setPasswordsMatch(null); 
            }
        }
    
        if (name === 'password') {
            setPasswordValidity({
                length: value.length >= 8,
                lowercase: /[a-z]/.test(value),
                uppercase: /[A-Z]/.test(value),
                digit: /\d/.test(value),
                specialChar: /[@$!%*?#&^_-]/.test(value),
            });
        }
    };
    

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (step === 1) {
            const { username, email, password } = formData;
            const registerData = { username, email, password };

            try {
                await registerUser(registerData);
                Swal.fire({
                    icon: 'success',
                    title: 'Sukces!',
                    text: 'Rejestracja zakończona pomyślnie! Sprawdź swój e-mail w celu potwierdzenia.',
                });
                setStep(2); 
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Błąd!',
                    text: err.message,
                });
            }
        } else if (step === 2) {
            const { email, verificationCode } = formData;
            try {
                await verifyUser({ email, code: verificationCode });
                Swal.fire({
                    icon: 'success',
                    title: 'Zweryfikowano!',
                    text: 'Email został zweryfikowany.',
                });
                setStep(3);
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Błąd!',
                    text: err.message,
                });
                setErrors({ verificationCode: 'Nieprawidłowy kod weryfikacyjny.' });
            }
        } else if (step === 3) {
            Swal.fire({
                icon: 'success',
                title: 'Rejestracja zakończona!',
                text: 'Twoje konto zostało utworzone.',
            }).then(() => {
                navigate('/dashboard'); 
            });
        }
    };

    const skipPhotoUpload = () => {
        Swal.fire({
            icon: 'success',
            title: 'Rejestracja zakończona!',
            text: 'Twoje konto zostało utworzone.',
        }).then(() => {
            navigate('/dashboard'); 
        });
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
                                autoComplete="username"
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
                                autoComplete="email"
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
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="form-group">
                            <label>Potwierdź hasło:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        
                        <ul className="password-requirements">
                            <li className={passwordValidity.length ? 'valid' : 'invalid'}>Minimum 8 znaków</li>
                            <li className={passwordValidity.lowercase ? 'valid' : 'invalid'}>Co najmniej jedna mała litera</li>
                            <li className={passwordValidity.uppercase ? 'valid' : 'invalid'}>Co najmniej jedna duża litera</li>
                            <li className={passwordValidity.digit ? 'valid' : 'invalid'}>Co najmniej jedna cyfra</li>
                            <li className={passwordValidity.specialChar ? 'valid' : 'invalid'}>Co najmniej jeden znak specjalny (@$!%*?#&^_-)</li>
                            <li className={passwordsMatch === true ? 'valid' : 'invalid'}>Hasła są identyczne</li>
                        </ul>

                        <button type="submit" className="submit-button">Dalej</button>
                    </form>
                    <p className="login-register-link">
                        Masz już konto? <Link to="/login">Zaloguj się</Link>
                    </p>
                </div>
            )}

            {step === 2 && (
                <div className="confirm-email-form">
                    <h2>Zweryfikuj email</h2>
                    <p>Wprowadzony adres e-mail: {formData.email}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Kod weryfikacyjny:</label>
                            <input
                                type="text"
                                name="verificationCode"
                                value={formData.verificationCode}
                                onChange={handleChange}
                                required
                            />
                            {errors.verificationCode && (
                                <span className="error">{errors.verificationCode}</span>
                            )}
                        </div>
                        <button type="submit" className="submit-button">Zweryfikuj</button>
                    </form>
                </div>
            )}

            {step === 3 && (
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
                        <button type="submit" className="submit-button">Zarejestruj się</button>
                    </form>
                    <button onClick={skipPhotoUpload} className="skip-button">Pomiń</button>
                </div>
            )}
        </div>
    );
};

export default RegistrationPage;
