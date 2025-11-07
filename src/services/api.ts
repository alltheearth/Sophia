const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  // Função auxiliar para fazer requisições autenticadas
  fetch: async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('access_token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Token ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    return response.json();
  },

  // Auth
  login: (username: string, password: string) => {
    return fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  },

  logout: () => {
    const token = localStorage.getItem('access_token');
    return fetch(`${API_BASE_URL}/auth/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
  },

  // Usuários
  getUsuario: (id: string) => {
    return api.fetch(`/usuarios/${id}/`);
  },

  // Alunos
  getAlunos: () => {
    return api.fetch('/alunos/');
  },

  getAluno: (id: string) => {
    return api.fetch(`/alunos/${id}/`);
  },

  // Dashboard
  getDashboard: (escolaId: string) => {
    return api.fetch(`/dashboard/geral/?escola_id=${escolaId}`);
  },
};