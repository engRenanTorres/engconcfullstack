import axios from 'axios';
import { tokenService } from '../../services/auth/tokenService';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_DEV}/api`,
  // baseURL: `${import.meta.env.VITE_BACKEND_DEV}/api`,
});

axiosClient.interceptors.request.use((config) => {
  try {
    const token = tokenService.get();

    if (token != null && config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    throw new Error('Erro na injeção de token');
  }
});

export default axiosClient;
