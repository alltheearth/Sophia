// src/services/alunosApi.ts

export interface Responsavel {
  id?: string;
  nome: string;
  parentesco: string;
  telefone: string;
  email: string;
  responsavel_financeiro: boolean;
  cpf?: string;
}

export interface Aluno {
  id: string;
  nome: string;
  matricula: string;
  foto?: string;
  data_nascimento: string;
  dataNascimento?: string; // Para compatibilidade
  turma_atual?: string;
  turma_nome?: string;
  turma?: string; // Para compatibilidade
  turno?: string;
  status: 'ATIVO' | 'INATIVO' | 'TRANSFERIDO' | 'CONCLUIDO';
  cpf?: string;
  rg?: string;
  sexo?: string;
  
  // Endereço
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  
  // Dados escolares
  data_matricula?: string;
  dataMatricula?: string;
  
  // Responsáveis
  responsaveis: Responsavel[];
  
  // Saúde
  tipo_sanguineo?: string;
  tipoSanguineo?: string;
  alergias?: string;
  medicamentos?: string;
  observacoes_medicas?: string;
  observacoesMedicas?: string;
}

export interface AlunoFormData {
  // Dados do Aluno
  nome: string;
  data_nascimento: string;
  cpf?: string;
  rg?: string;
  sexo?: string;
  
  // Endereço
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  
  // Dados Escolares
  matricula?: string;
  turma_atual?: string;
  turno?: string;
  data_matricula?: string;
  
  // Responsáveis
  responsaveis: {
    nome: string;
    cpf: string;
    parentesco: string;
    telefone: string;
    email: string;
    responsavel_financeiro: boolean;
  }[];
  
  // Saúde
  tipo_sanguineo?: string;
  alergias?: string;
  medicamentos?: string;
  observacoes_medicas?: string;
}

export interface AlunosListResponse {
  results?: Aluno[];
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

// Função auxiliar para normalizar dados do aluno
const normalizeAluno = (aluno: any): Aluno => {
  return {
    ...aluno,
    dataNascimento: aluno.data_nascimento || aluno.dataNascimento,
    turma: aluno.turma_nome || aluno.turma,
    dataMatricula: aluno.data_matricula || aluno.dataMatricula,
    tipoSanguineo: aluno.tipo_sanguineo || aluno.tipoSanguineo,
    observacoesMedicas: aluno.observacoes_medicas || aluno.observacoesMedicas,
  };
};

export const alunosApi = {
  // Listar alunos
  listar: async (escolaId: string, filtros?: any): Promise<Aluno[]> => {
    try {
      const params = new URLSearchParams({
        escola: escolaId,
        ...(filtros?.status && filtros.status !== 'TODOS' && { status: filtros.status }),
        ...(filtros?.search && { search: filtros.search })
      });
      
      const response = await fetch(`${API_BASE}/alunos/?${params}`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar alunos');
      }
      
      const data: AlunosListResponse | Aluno[] = await response.json();
      
      // Se a resposta tem paginação
      if (data && typeof data === 'object' && 'results' in data) {
        return (data.results || []).map(normalizeAluno);
      }
      
      // Se a resposta é um array direto
      return Array.isArray(data) ? data.map(normalizeAluno) : [];
    } catch (error) {
      console.error('Erro ao listar alunos:', error);
      throw error;
    }
  },

  // Buscar um aluno específico
  buscar: async (id: string): Promise<Aluno> => {
    try {
      const response = await fetch(`${API_BASE}/alunos/${id}/`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar aluno');
      }
      
      const data = await response.json();
      return normalizeAluno(data);
    } catch (error) {
      console.error('Erro ao buscar aluno:', error);
      throw error;
    }
  },

  // Criar aluno
  criar: async (formData: any, escolaId: string): Promise<Aluno> => {
    try {
      // Preparar dados para envio
      const payload = {
        escola: escolaId,
        nome: formData.nome,
        data_nascimento: formData.dataNascimento || formData.data_nascimento,
        cpf: formData.cpf,
        rg: formData.rg,
        sexo: formData.sexo,
        
        // Endereço
        cep: formData.cep,
        endereco: formData.endereco,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        
        // Dados escolares
        matricula: formData.matricula,
        turma_atual: formData.turma,
        turno: formData.turno,
        data_matricula: formData.dataMatricula || formData.data_matricula,
        status: 'ATIVO',
        
        // Responsáveis
        responsaveis: formData.responsaveis.map((r: any) => ({
          nome: r.nome,
          cpf: r.cpf,
          parentesco: r.parentesco,
          telefone: r.telefone,
          email: r.email,
          responsavel_financeiro: r.responsavelFinanceiro || r.responsavel_financeiro
        })),
        
        // Saúde
        tipo_sanguineo: formData.tipoSanguineo || formData.tipo_sanguineo,
        alergias: formData.alergias,
        medicamentos: formData.medicamentos,
        observacoes_medicas: formData.observacoesMedicas || formData.observacoes_medicas
      };

      const response = await fetch(`${API_BASE}/alunos/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao criar aluno');
      }

      const data = await response.json();
      return normalizeAluno(data);
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      throw error;
    }
  },

  // Atualizar aluno
  atualizar: async (id: string, formData: any): Promise<Aluno> => {
    try {
      const payload = {
        nome: formData.nome,
        data_nascimento: formData.dataNascimento || formData.data_nascimento,
        cpf: formData.cpf,
        rg: formData.rg,
        sexo: formData.sexo,
        
        // Endereço
        cep: formData.cep,
        endereco: formData.endereco,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        
        // Dados escolares
        matricula: formData.matricula,
        turma_atual: formData.turma,
        turno: formData.turno,
        
        // Saúde
        tipo_sanguineo: formData.tipoSanguineo || formData.tipo_sanguineo,
        alergias: formData.alergias,
        medicamentos: formData.medicamentos,
        observacoes_medicas: formData.observacoesMedicas || formData.observacoes_medicas
      };

      const response = await fetch(`${API_BASE}/alunos/${id}/`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao atualizar aluno');
      }

      const data = await response.json();
      return normalizeAluno(data);
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      throw error;
    }
  },

  // Deletar aluno
  deletar: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/alunos/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao deletar aluno');
      }

      return true;
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
      throw error;
    }
  },

  // Buscar boletim completo
  buscarBoletim: async (id: string, anoLetivoId: string) => {
    try {
      const response = await fetch(
        `${API_BASE}/alunos/${id}/boletim_completo/?ano_letivo_id=${anoLetivoId}`,
        {
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar boletim');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao buscar boletim:', error);
      throw error;
    }
  }
};