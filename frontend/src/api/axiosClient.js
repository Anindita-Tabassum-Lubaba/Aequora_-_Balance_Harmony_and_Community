// frontend/src/api/axiosClient.js

import axios from 'axios';

// Set the base URL for all API requests to the Django backend
const API_BASE_URL = 'http://localhost:8000/api/';

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // Authorization token will be added here dynamically later
    },
});

export default axiosClient;