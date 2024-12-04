import apiClient from './apiClient';

export const uploadUserAvatar = async (userId, photo) => {
    try {
        const formData = new FormData();
        formData.append('image', photo);  

        const response = await apiClient.post(`/users/${userId}/avatar`, formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Błąd przesyłania zdjęcia.');
    }
};
