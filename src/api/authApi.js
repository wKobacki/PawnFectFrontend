import apiClient from './apiClient';

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

export const refreshAccessToken = async () => {
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
    try {
        const response = await apiClient.post(`/password-reset`, { email });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Nie udało się wysłać e-maila resetującego.');
    }
};

// Zresetuj hasło
export const resetPassword = async (verificationCode, newPassword) => {
    try {
        const response = await apiClient.post(`/password-reset/confirm`, { verificationCode, newPassword });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Nie udało się zresetować hasła.');
    }
};

// reset hasla dla zalogowanego 
export const updatePassword = async (currentPassword, newPassword) => {
    const userId = localStorage.getItem("userId");
    try {
        const response = await apiClient.post('/change-password', { userId, currentPassword, newPassword }); 
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Nied udało się zresetować hasła.');
    }
};
