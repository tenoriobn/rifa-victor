import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchDados = async (rota) => {
  const response = await apiClient.get(rota);
  return response.data;
};

export const postDados = async (rota, dados) => {
  try {
    const response = await apiClient.post(rota, dados);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer POST', error);
    throw error;
  }
}