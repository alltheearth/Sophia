// src/services/professoresApi.ts

export interface Professor {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  rg?: string;
  foto?: string;
  dataNascimento?: string;
  data_nascimento?: string;
  sexo?: string;
  
  // Endereço
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  
  // Dados Profissionais
  dataAdmissao: string;
  data_admissao?: string;
  registro?: string;
  registro_profissional?: string;
  formacao: string;
  especializacao?: string;
  cargaHoraria: number;
  carga_horaria?: number;
  turno: 'MATUTINO' | 'VESPERTINO' | 'NOTURNO' | 'INTEGRAL';
  status: 'ATIVO' | 'FERIAS' | 'LICENCA' | 'AFASTADO';
  salario?: number;
  
  // Relacionamentos
  disciplinas: string[];
  turmas: string[];
  escola?: string;
  escola_nome?: string;
}

export interface ProfessorFormData {
  // Dados Pessoais
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  rg?: string;
  data_nascimento?: string;
  sexo?: string;
  
  // Endereço
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  
  // Dados Profissionais
  data_admissao: string;
  registro_profissional?: string;
  formacao: string;
  especializacao?: string;
  carga_horaria: number;
  turno: string;
  status: string;
  salario?: number;
  
  // Disciplinas
  disciplinas?: string[];
  turmas?: string[];
}

export interface ProfessoresListResponse {
  results?: Professor[];
  count?: number;
  next?: string | null;
  previous?: string | null;
}

const API_BASE = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json'
  };
};

// Função auxiliar para normalizar dados do professor
const normalizeProfessor = (professor: any): Professor => {
  return {
    ...professor,
    dataNascimento: professor.data_nascimento || professor.dataNascimento,
    dataAdmissao: professor.data_admissao || professor.dataAdmissao,
    cargaHoraria: professor.carga_horaria || professor.cargaHoraria,
    disciplinas: professor.disciplinas || [],
    turmas: professor.turmas || [],
  };
};

export const professoresApi = {
  // Listar professores
  listar: async (escolaId: string, filtros?: any): Promise<Professor[]> => {
    try {
      const params = new URLSearchParams({
        escola: escolaId,
        ...(filtros?.status && filtros.status !== 'TODOS' && { status: filtros.status }),
        ...(filtros?.turno && filtros.turno !== 'TODOS' && { turno: filtros.turno }),
        ...(filtros?.searchTerm && { search: filtros.searchTerm })
      });
      
      const response = await fetch(`${API_BASE}/professores/?${params}`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar professores');
      }
      
      const data: ProfessoresListResponse | Professor[] = await response.json();
      
      // Se a resposta tem paginação
      if (data && typeof data === 'object' && 'results' in data) {
        return (data.results || []).map(normalizeProfessor);
      }
      
      // Se a resposta é um array direto
      return Array.isArray(data) ? data.map(normalizeProfessor) : [];
    } catch (error) {
      console.error('Erro ao listar professores:', error);
      throw error;
    }
  },

  // Buscar um professor específico
  buscar: async (id: string): Promise<Professor> => {
    try {
      const response = await fetch(`${API_BASE}/professores/${id}/`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar professor');
      }
      
      const data = await response.json();
      return normalizeProfessor(data);
    } catch (error) {
      console.error('Erro ao buscar professor:', error);
      throw error;
    }
  },

  // Criar professor
  criar: async (formData: ProfessorFormData, escolaId: string): Promise<Professor> => {
    try {
      // 1. Criar o usuário primeiro
      const usuarioPayload = {
        username: formData.email.split('@')[0], // Usar parte do email como username
        email: formData.email,
        first_name: formData.nome.split(' ')[0],
        last_name: formData.nome.split(' ').slice(1).join(' '),
        role: 'PROFESSOR',
        cpf: formData.cpf,
        telefone: formData.telefone,
        password: 'senha123', // Senha temporária - será alterada no primeiro acesso
        password_confirm: 'senha123'
      };

      const usuarioResponse = await fetch(`${API_BASE}/usuarios/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(usuarioPayload)
      });

      if (!usuarioResponse.ok) {
        const error = await usuarioResponse.json();
        throw new Error(error.message || 'Erro ao criar usuário do professor');
      }

      const usuario = await usuarioResponse.json();

      // 2. Criar o perfil de professor
      const professorPayload = {
        usuario: usuario.id,
        escola: escolaId,
        registro_profissional: formData.registro_profissional,
        formacao: formData.formacao,
        especializacao: formData.especializacao,
        data_admissao: formData.data_admissao,
        carga_horaria: formData.carga_horaria,
        turno: formData.turno,
        salario: formData.salario || 0,
        status: formData.status || 'ATIVO'
      };

      const professorResponse = await fetch(`${API_BASE}/professores/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(professorPayload)
      });

      if (!professorResponse.ok) {
        const error = await professorResponse.json();
        throw new Error(error.message || 'Erro ao criar professor');
      }

      const data = await professorResponse.json();
      return normalizeProfessor(data);
    } catch (error) {
      console.error('Erro ao criar professor:', error);
      throw error;
    }
  },

  // Atualizar professor
  atualizar: async (id: string, formData: Partial<ProfessorFormData>): Promise<Professor> => {
    try {
      const payload = {
        ...(formData.registro_profissional && { registro_profissional: formData.registro_profissional }),
        ...(formData.formacao && { formacao: formData.formacao }),
        ...(formData.especializacao && { especializacao: formData.especializacao }),
        ...(formData.data_admissao && { data_admissao: formData.data_admissao }),
        ...(formData.carga_horaria && { carga_horaria: formData.carga_horaria }),
        ...(formData.turno && { turno: formData.turno }),
        ...(formData.status && { status: formData.status }),
        ...(formData.salario !== undefined && { salario: formData.salario })
      };

      const response = await fetch(`${API_BASE}/professores/${id}/`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao atualizar professor');
      }

      const data = await response.json();
      return normalizeProfessor(data);
    } catch (error) {
      console.error('Erro ao atualizar professor:', error);
      throw error;
    }
  },

  // Deletar professor
  deletar: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/professores/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok && response.status !== 204) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao deletar professor');
      }

      return true;
    } catch (error) {
      console.error('Erro ao deletar professor:', error);
      throw error;
    }
  },

  // Buscar horários do professor
  buscarHorarios: async (id: string) => {
    try {
      const response = await fetch(
        `${API_BASE}/professores/${id}/horarios/`,
        {
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar horários');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao buscar horários:', error);
      throw error;
    }
  },

  // Importar professores em lote
  importarLote: async (arquivo: File, escolaId: string) => {
    try {
      const formData = new FormData();
      formData.append('arquivo', arquivo);
      formData.append('escola_id', escolaId);

      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE}/professores/importar/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao importar professores');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao importar professores:', error);
      throw error;
    }
  },

  // Exportar professores
  exportar: async (escolaId: string, formato: 'xlsx' | 'pdf' = 'xlsx') => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(
        `${API_BASE}/professores/exportar/?escola=${escolaId}&formato=${formato}`,
        {
          headers: {
            'Authorization': `Token ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao exportar professores');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `professores_${new Date().toISOString().split('T')[0]}.${formato}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error('Erro ao exportar professores:', error);
      throw error;
    }
  }
};