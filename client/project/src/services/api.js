import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (email, password, name) => {
    console.log(API_ENDPOINTS.REGISTER);
    const response = await api.post(API_ENDPOINTS.REGISTER, { email, password, name });
    return response.data;
  },

  login: async (email, password) => {
    console.log("login",API_ENDPOINTS.LOGIN);
    const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export const fileService = {
  getUploadUrl: async (fileName, fileType) => {
    const response = await api.post(API_ENDPOINTS.UPLOAD_URL, {
      fileName,
      fileType,
    });
    return response.data;
  },

  uploadComplete: async (uploadData) => {
    const response = await api.post(API_ENDPOINTS.UPLOAD_COMPLETE, uploadData);
    return response.data;
  },

  getFiles: async () => {
    const response = await api.get(`${API_ENDPOINTS.FILES}/allfiles`);
    console.log("getFiles response:", response.data);
    return response.data;
  },

  getFile: async (fileId) => {
    const response = await api.get(`${API_ENDPOINTS.FILES}/${fileId}`);
    return response.data;
  },

  retryProcessing: async (fileId) => {
    const response = await api.post(`${API_ENDPOINTS.FILES}/${fileId}/retry`);
    return response.data;
  },
};

export const searchService = {
  search: async (query) => {
    const response = await api.post(API_ENDPOINTS.SEARCH, { query });
    return response.data;
  },
};

export default api;
