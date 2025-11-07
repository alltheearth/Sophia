const API_BASE_URL = 'http://localhost:8000/api';

// Helper para fazer fetch com autenticação
const authenticatedFetch = async (endpoint: string, options: RequestInit = {}) => {
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
    const error = await response.json();
    throw new Error(error.message || 'Erro na requisição');
  }

  return response.json();
};

export const api = {
  // ========== AUTENTICAÇÃO ==========
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  },

  logout: async () => {
    return authenticatedFetch('/auth/logout/', { method: 'POST' });
  },

  // ========== USUÁRIOS ==========
  getUsuario: (id: string) => {
    return authenticatedFetch(`/usuarios/${id}/`);
  },

  // ========== ALUNOS ==========
  getAlunos: (escolaId?: string) => {
    const params = escolaId ? `?escola=${escolaId}` : '';
    return authenticatedFetch(`/alunos/${params}`);
  },

  getAluno: (id: string) => {
    return authenticatedFetch(`/alunos/${id}/`);
  },

  // ========== PROFESSORES ==========
  getProfessores: (escolaId?: string) => {
    const params = escolaId ? `?escola=${escolaId}` : '';
    return authenticatedFetch(`/professores/${params}`);
  },

  // ========== TURMAS ==========
  getTurmas: (escolaId?: string) => {
    const params = escolaId ? `?escola=${escolaId}` : '';
    return authenticatedFetch(`/turmas/${params}`);
  },

  // ========== DASHBOARD ==========
  getDashboard: (escolaId: string) => {
    return authenticatedFetch(`/dashboard/geral/?escola_id=${escolaId}`);
  },
};