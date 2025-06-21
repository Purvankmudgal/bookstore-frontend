import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Change if needed
  withCredentials: true, // To send cookies if using cookie auth (optional)
});

// Add JWT token header if stored
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
