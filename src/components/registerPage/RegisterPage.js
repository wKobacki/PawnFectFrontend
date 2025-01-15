import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Importowanie ikon
import { registerUser, verifyUser } from '../../api/authApi';
import './RegisterPage.css';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        verificationCode: '',
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
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); 
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        if (name === 'password' || name === 'confirmPassword') {
            const { password, confirmPassword } = updatedFormData;
            setPasswordsMatch(password === confirmPassword);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step === 1) {
            if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
                Swal.fire('Błąd!', 'Proszę wypełnić wszystkie pola.', 'error');
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                Swal.fire('Błąd!', 'Hasła muszą być identyczne.', 'error');
                return;
            }

            if (!passwordValidity.length || !passwordValidity.lowercase || !passwordValidity.uppercase || !passwordValidity.digit || !passwordValidity.specialChar) {
                Swal.fire('Błąd!', 'Hasło musi spełniać wszystkie wymagania.', 'error');
                return;
            }

            try {
                const response = await registerUser({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                });

                if (response && response.userId) {
                    setUserId(response.userId);
                    localStorage.setItem('userId', response.userId);
                }

                Swal.fire('Sukces!', 'Sprawdź swój e-mail, aby potwierdzić rejestrację.', 'success');
                setStep(2);
            } catch (err) {
                Swal.fire('Błąd!', err.message, 'error');
            }
        } else if (step === 2) {
            try {
                await verifyUser({
                    email: formData.email,
                    code: formData.verificationCode,
                });
                Swal.fire('Sukces!', 'Email został zweryfikowany.', 'success');
                setStep(3);
                navigate('/login');
            } catch (err) {
                Swal.fire('Błąd!', err.message, 'error');
                setErrors({ verificationCode: 'Nieprawidłowy kod weryfikacyjny.' });
            }
        }
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
                            <div className="password-input-container">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="password-toggle-btn"
                                >
                                    {passwordVisible ? <FaEye /> : <FaEyeSlash/>}
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Potwierdź hasło:</label>
                            <div className="password-input-container">
                                <input
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    className="password-toggle-btn"
                                >
                                    {confirmPasswordVisible ? <FaEye/> : <FaEyeSlash/>}
                                </button>
                            </div>
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
                            {errors.verificationCode && <span className="error">{errors.verificationCode}</span>}
                        </div>

                        <button type="submit" className="submit-button">Zweryfikuj</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default RegistrationPage;
