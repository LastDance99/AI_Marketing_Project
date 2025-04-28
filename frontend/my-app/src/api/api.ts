import axios from 'axios';

const API = axios.create({
    baseURL: 'http://192.168.0.171:8000',
    headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use(config => {
    const token = localStorage.getItem('access');
    if (token) {
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;