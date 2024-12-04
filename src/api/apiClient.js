import axios from 'axios';
import { refreshAccessToken } from './authApi';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3300/api/v1';

const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

apiClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    response => response, 
    async (error) => {
        if(error.response?.status === 403){
            try{
                const newToken = await refreshAccessToken();
                if(newToken){
                    const originalRequest = error.config;
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return apiClient(originalRequest);
                }
            } catch(refreshErr){
                console.error('Token refresh failed: ', refreshErr);
                // wylogowac tutaj trzeba
            }
        }
});

export default apiClient;