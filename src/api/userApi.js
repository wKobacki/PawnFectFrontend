import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3300/api/v1';

export const uploadUserAvatar = async (userId, photo) => {
    try {
        const formData = new FormData();
        formData.append('image', photo);  

        const token = localStorage.getItem('accessToken');  
        console.log(token);
        const response = await axios.post(`${BASE_URL}/users/${userId}/avatar`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',  
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Błąd przesyłania zdjęcia.');
    }
};
