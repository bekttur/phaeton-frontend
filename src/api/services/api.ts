import axios from 'axios';
import { TECDOC_TOKEN_KEY } from '../constants/auth';

export const api = axios.create({
  baseURL: 'https://api-tecdoc.phaeton.kz',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TECDOC_TOKEN_KEY);

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
