const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3300';

//funkcja rejstrowania
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/register`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server response:', errorData); 
            throw new Error(errorData.message || 'Registration failed');
        }

        return response.json();
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

//funkcja logowania 
export const loginUser = async (loginData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            if (response.headers.get('Content-Type')?.includes('application/json')) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            } else {
                throw new Error('Internal Server Error');
            }
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);

        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

//funkcja do weryfikownaia 
export const verifyUser = async (verificationData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(verificationData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Verification failed');
        }

        return response.json();
    } catch (error) {
        console.error('Error during verification:', error);
        throw error;
    }
};