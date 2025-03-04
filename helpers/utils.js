import axios from 'axios';
import { baseUrl } from './constants';

const getToken = () => {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem('access_token');
    } catch (error) {
      console.error('Error retrieving token from localStorage:', error);
      return null;
    }
  }
  return null;
};

const authAxios = axios.create({
  baseURL: `${baseUrl}/api`,
});

authAxios.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authAxios;