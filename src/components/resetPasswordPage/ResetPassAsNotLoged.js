import { useState } from 'react';
import Swal from 'sweetalert2';
import { sendResetEmail, resetPassword } from '../../api/authApi'; // Import funkcji z api
import { useNavigate } from 'react-router-dom';
import './ResetPasswordPage.css';


const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);  // Stan kontrolujący etap resetowania
    const [formData, setFormData] = useState({
        email: '',
        verificationCode: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // Obsługuje zmianę wartości w formularzu
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        // Sprawdzenie, czy hasła pasują
        if (name === 'newPassword' || name === 'confirmPassword') {
            const { newPassword, confirmPassword } = updatedFormData;
            setPasswordsMatch(newPassword === confirmPassword);
        }
    };

    // Obsługuje pierwszą część formularza (wysyłanie linku resetującego)
    const handleSubmitStep1 = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            setError('Proszę wprowadzić adres e-mail.');
            return;
        }

        try {
            await sendResetEmail(formData.email); // Wywołanie funkcji do wysyłania e-maila

            Swal.fire({
                icon: 'success',
                title: 'E-mail wysłany!',
                text: 'Sprawdź swoją skrzynkę e-mail, aby zresetować hasło.',
            });

            setStep(2);  // Przejście do drugiego kroku
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Błąd!',
                text: err.message || 'Wystąpił problem z wysłaniem e-maila.',
            });
        }
    };

    // Obsługuje drugą część formularza (weryfikacja kodu i zmiana hasła)
    const handleSubmitStep2 = async (e) => {
        e.preventDefault();
        if (!formData.verificationCode || !formData.newPassword || !formData.confirmPassword) {
            setError('Proszę wypełnić wszystkie pola.');
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Hasła muszą być identyczne.');
            return;
        }

        try {
            await resetPassword(formData.verificationCode, formData.newPassword); // Wywołanie funkcji do resetowania hasła

            Swal.fire({
                icon: 'success',
                title: 'Hasło zostało zresetowane!',
                text: 'Możesz teraz zalogować się na swoje konto.',
            });

            navigate('/login');  // Przekierowanie do strony logowania
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Błąd!',
                text: err.message || 'Wystąpił problem z resetowaniem hasła.',
            });
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Resetowanie hasła</h2>

            {step === 1 && (
                <div className="step-1">
                    <h3>Wprowadź adres e-mail</h3>
                    <form onSubmit={handleSubmitStep1}>
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
                        </div>
                        {error && <span className="error">{error}</span>}
                        <button type="submit" className="submit-button">Wyślij link resetujący</button>
                    </form>
                </div>
            )}

            {step === 2 && (
                <div className="step-2">
                    <h3>Wprowadź kod i nowe hasło</h3>
                    <form onSubmit={handleSubmitStep2}>
                        <div className="form-group">
                            <label>Kod weryfikacyjny:</label>
                            <input
                                type="text"
                                name="verificationCode"
                                value={formData.verificationCode}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Hasło:</label>
                            <div className="password-input-container">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="password-toggle-btn"
                                >
                                    {passwordVisible ? "Ukryj" : "Pokaż"}
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
                                    {confirmPasswordVisible ? "Ukryj" : "Pokaż"}
                                </button>
                            </div>
                        </div>

                        {error && <span className="error">{error}</span>}

                        <button type="submit" className="submit-button" disabled={!passwordsMatch}>Zresetuj hasło</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ResetPasswordPage;
