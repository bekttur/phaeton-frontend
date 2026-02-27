import axios from 'axios';
import { BACKEND_FRA_TOKEN_KEY, TECDOC_TOKEN_KEY } from '../constants/auth';
import { getOrCreateSessionId } from '../../shared/lib/session';

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

// BACKEND_FRA
const apiBackendFra = axios.create({
  baseURL: 'https://backendfra.phaeton.kz',
});

apiBackendFra.interceptors.request.use((config) => {
  const token = localStorage.getItem(BACKEND_FRA_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    const sessionID = getOrCreateSessionId();
    config.headers.SessionID = sessionID;
  }

  return config;
});

export default apiBackendFra;
