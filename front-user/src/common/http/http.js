import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const fetchDados = async (rota) => {
  const response = await apiClient.get(rota);
  return response.data;
};
