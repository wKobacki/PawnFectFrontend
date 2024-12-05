import { useState } from 'react';
import Swal from 'sweetalert2';
import { updatePassword } from '../api/authApi'; 
import { useNavigate } from 'react-router-dom';
import '../styles/ResetPassAsLoged.css';

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [error, setError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    // Obsługa zmiany w polach formularza
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        // Sprawdzenie, czy nowe hasła pasują
        if (name === 'newPassword' || name === 'confirmNewPassword') {
            const { newPassword, confirmNewPassword } = updatedFormData;
            setPasswordsMatch(newPassword === confirmNewPassword);
        }
    };

    // Obsługuje przesyłanie formularza zmiany hasła
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword) {
            setError('Proszę wypełnić wszystkie pola.');
            return;
        }

        if (formData.newPassword !== formData.confirmNewPassword) {
            setError('Nowe hasła muszą być identyczne.');
            return;
        }

        try {
            // Wywołanie API do aktualizacji hasła
            await updatePassword(formData.currentPassword, formData.newPassword);

            Swal.fire({
                icon: 'success',
                title: 'Hasło zmienione!',
                text: 'Twoje hasło zostało pomyślnie zaktualizowane.',
            });

            navigate('/dashboard'); // Przekierowanie do strony profilu
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Błąd!',
                text: err.message || 'Nie udało się zmienić hasła.',
            });
        }
    };

    return (
        <div className="change-password-container">
            <h2>Zmień hasło</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Obecne hasło:</label>
                    <div className="password-input-container">
                        <input
                            type={passwordVisible.current ? "text" : "password"}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible({ ...passwordVisible, current: !passwordVisible.current })}
                            className="password-toggle-btn"
                        >
                            {passwordVisible.current ? "Ukryj" : "Pokaż"}
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Nowe hasło:</label>
                    <div className="password-input-container">
                        <input
                            type={passwordVisible.new ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible({ ...passwordVisible, new: !passwordVisible.new })}
                            className="password-toggle-btn"
                        >
                            {passwordVisible.new ? "Ukryj" : "Pokaż"}
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Potwierdź nowe hasło:</label>
                    <div className="password-input-container">
                        <input
                            type={passwordVisible.confirm ? "text" : "password"}
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible({ ...passwordVisible, confirm: !passwordVisible.confirm })}
                            className="password-toggle-btn"
                        >
                            {passwordVisible.confirm ? "Ukryj" : "Pokaż"}
                        </button>
                    </div>
                </div>

                {error && <span className="error">{error}</span>}

                <button type="submit" className="submit-button" disabled={!passwordsMatch}>Zmień hasło</button>
            </form>
        </div>
    );
};

export default ChangePasswordPage;
