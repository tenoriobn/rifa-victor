import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchDados = async (rota, token) => {
  const response = await apiClient.get(rota, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const putDados = async (rota, dados, token) => {
  const response = await apiClient.put(rota, dados, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteDados = async (rota, token) => {
  const response = await apiClient.delete(rota, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postDados = async (rota, dados, incluirToken = false) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (incluirToken) {
    const token = Cookies.get('_token');
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

// Função para salvar o token no cookie com prazo de 1 dia
export const salvarToken = (token) => {
  Cookies.set('_token', token, { expires: 1 });
};

// Função para remover o token do cookie
export const removerToken = () => {
  Cookies.remove('_token');
};
