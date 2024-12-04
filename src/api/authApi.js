import apiClient from './apiClient';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3300/api/v1';

// Funkcja do rejestracji użytkownika
export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post('/register', userData);  

        // Zapisywanie danych w localStorage
        localStorage.setItem('userId', response.data.userId); 
        localStorage.setItem('verificationCode', response.data.verificationCode); 
        localStorage.setItem('accessToken', response.accessToken)

        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);  
        }

        return response.data;  
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Błąd rejestracji użytkownika.');
    }
};

// Funkcja weryfikacji użytkownika
export const verifyUser = async ({ email, code }) => {
    try {
        const response = await apiClient.post('/verify', { email, code });  
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Błąd weryfikacji e-mail.');
    }
};

// Funkcja logowania użytkownika
export const loginUser = async (loginData) => {
    try {
        const response = await apiClient.post('/login', loginData); 

        if (response.status !== 200) {
            throw new Error(response.data.message || 'Login failed');
        }

        const data = response.data;
        
        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);  
        }

        if (data.uid) {
            localStorage.setItem('userId', data.uid);  
        }

        return data;  
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const refreshAccesToken = async () => {
    try{
        const response = await apiClient.post('/refresh');

        const newAccessToken = response.data.accessToken;
        
        if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken); 
        }

        return newAccessToken;
    } catch (error) {
        console.error('Error while refreshing acces token: ', error);
    }
} 

// Wyślij link resetujący
export const sendResetEmail = async (email) => {
    const response = await apiClient.post(`${BASE_URL}/password-reset`, { email });
    return response.data;
};

// Zresetuj hasło
export const resetPassword = async (verificationCode, newPassword) => {
    const response = await apiClient.post(`${BASE_URL}/password-reset/confirm`, { verificationCode, newPassword });
    return response.data;
};
