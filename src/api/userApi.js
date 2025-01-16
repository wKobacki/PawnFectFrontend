import apiClient from './apiClient';

// Funkcja do przesyłania avataru użytkownika
export const uploadUserAvatar = async (userId, photo) => {
    try {
        const formData = new FormData();
        formData.append('image', photo);  
        
        // Wysyłamy zdjęcie na serwer
        const response = await apiClient.post(`/users/${userId}/avatar`, formData);
        
        // Po udanym przesłaniu zdjęcia, tworzymy URL do zdjęcia
        const avatarUrl = `${apiClient.defaults.baseURL}/users/avatars/${response.data.fileName}`;
        
        // Zapisujemy URL do localStorage
        localStorage.setItem('avatar_url', avatarUrl);
        
        return response.data; // Możesz zwrócić dane, jeśli chcesz coś dalej przetwarzać
    } catch (error) {
        // Obsługa błędów
        throw new Error(error.response?.data?.message || 'Błąd przesyłania zdjęcia.');
    }
};

// Funkcja do pobierania informacji o użytkowniku
export const getUserInfo = async (userId) => {
    try {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Błąd pobierania informacji o użytkowniku.');
    }
};

// Funkcja do usuwania użytkownika
export const deleteUser = async (userId) => {
    try {
        const response = await apiClient.delete(`/users/${userId}`);
        return response.data;  // Zwraca dane odpowiedzi po usunięciu użytkownika
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Błąd usuwania użytkownika.');
    }
};

export const editUserInfo = async (userId, updatedData) => {
    try {
        // Wysyłamy zaktualizowane dane na serwer
        const response = await apiClient.put(`/users/${userId}`, updatedData);
        
        return response.data; // Zwraca zaktualizowane dane użytkownika
    } catch (error) {
        // Obsługa błędów
        throw new Error(error.response?.data?.message || 'Błąd edycji danych użytkownika.');
    }
};
