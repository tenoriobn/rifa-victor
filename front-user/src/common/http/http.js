import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: `${baseURL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
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
    const token = Cookies.get('access_token');
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

// Função para salvar o token em um cookie com expiração de 2 minutos
export const salvarToken = (token) => {
  Cookies.set('access_token', token, { expires: 20 / 24 });
};

// Função para remover o token do cookie
export const removerToken = () => {
  Cookies.remove('access_token');
};
