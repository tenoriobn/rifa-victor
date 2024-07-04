import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
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

// export const postDados = async (rota, dados) => {
//   try {
//     const response = await apiClient.post(rota, dados);
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       // O servidor respondeu com um código de status fora da faixa 2xx
//       console.error('Erro ao fazer POST:', {
//         data: error.response.data,
//         status: error.response.status,
//         headers: error.response.headers,
//       });
//     } else if (error.request) {
//       // A solicitação foi feita, mas nenhuma resposta foi recebida
//       console.error('Erro ao fazer POST (sem resposta):', error.request);
//     } else {
//       // Algo aconteceu ao configurar a solicitação que acionou um erro
//       console.error('Erro ao fazer POST (configuração):', error.message);
//     }
//     throw error;
//   }
// };
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