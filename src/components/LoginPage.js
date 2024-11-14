import { loginUser } from '../api/authApi';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser({ username, password });
            Swal.fire({
                icon: 'success',
                title: 'Zalogowano pomyślnie!',
                text: 'Zostałeś zalogowany do swojego konta.',
            }).then(() => {
                navigate('/dashboard'); 
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Błąd logowania!',
                text: err.message,
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Logowanie</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nazwa użytkownika:</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Hasło:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Zaloguj się</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
