import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('CRED_JWT');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global 401 Unauthorized handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Session Expired. Logging out...');
      // Clear storage and kick user to login page
      localStorage.removeItem('CRED_JWT');
      localStorage.removeItem('CRED_USER');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);