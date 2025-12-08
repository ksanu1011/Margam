import axios from 'axios';

const api = axios.create({
    baseURL:'https://margam-ptd1.onrender.com', // Backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
