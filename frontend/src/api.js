import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://margam-ptd1.onrender.com/api', // Backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
