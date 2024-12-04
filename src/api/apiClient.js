import axios from 'axios';
import { refreshAccesToken } from './authApi';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3300/api/v1';

const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
    const accesToken = localStorage.getItem('accesToken');
    if(accesToken){
        config.headers.Authorization = `Bearer ${accesToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    response => response, 
    async (error) => {
        if(error.response?.status === 403 || error.response?.status === 401){
            try{
                const newToken = await refreshAccesToken();
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