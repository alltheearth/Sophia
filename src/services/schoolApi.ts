// src/services/schoolApi.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api'
});

// Interceptor para adicionar escola_id em todas requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  const escolaId = localStorage.getItem('escola_ativa_id');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  if (escolaId) {
    config.headers['X-Escola-ID'] = escolaId;
  }
  
  return config;
});

export default api;