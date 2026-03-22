export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  REGISTER: '/user/register',
  LOGIN: '/user/login',
  UPLOAD_URL: '/upload/upload-url',
  UPLOAD_COMPLETE: '/upload/upload-complete',
  SEARCH: '/search/content',
  FILES: '/files',
};
