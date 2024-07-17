import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.alimaprojetos.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
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

export const postDados = async (rota, dados, incluirToken = false) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (incluirToken) {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const response = await apiClient.post(rota, dados, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Erro ao fazer POST:', {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error('Erro ao fazer POST (sem resposta):', error.request);
    } else {
      console.error('Erro ao fazer POST (configuração):', error.message);
    }
    throw error;
  }
};