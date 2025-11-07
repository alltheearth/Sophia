export interface Aluno {
  id: string;
  nome: string;
  matricula: string;
  foto?: string;
  data_nascimento: string;
  turma_atual?: string;
  turma_nome?: string;
  turno?: string;
  status: 'ATIVO' | 'INATIVO' | 'TRANSFERIDO' | 'CONCLUIDO';
  cpf?: string;
  rg?: string;
  endereco?: string;
  responsaveis: Responsavel[];
}

export interface Responsavel {
  id: string;
  nome: string;
  parentesco: string;
  telefone: string;
  email: string;
  responsavel_financeiro: boolean;
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

const API_BASE = 'http://localhost:8000/api';

export const alunosApi = {
  // Listar alunos
  listar: async (escolaId: string, filtros?: any) => {
    const token = localStorage.getItem('access_token');
    const params = new URLSearchParams({
      escola: escolaId,
      ...filtros
    });
    
    const response = await fetch(`${API_BASE}/alunos/?${params}`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Erro ao buscar alunos');
    return response.json();
  },

  // Buscar um aluno específico
  buscar: async (id: string) => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE}/alunos/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Erro ao buscar aluno');
    return response.json();
  },

  // Criar aluno
  criar: async (data: AlunoFormData, escolaId: string) => {
    const token = localStorage.getItem('access_token');
    
    // Primeiro criar o usuário
    const usuarioResponse = await fetch(`${API_BASE}/usuarios/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.cpf || `aluno_${Date.now()}`,
        email: `${data.cpf}@temp.com`,
        first_name: data.nome.split(' ')[0],
        last_name: data.nome.split(' ').slice(1).join(' '),
        role: 'ALUNO',
        cpf: data.cpf,
        password: 'senha123', // Senha temporária
        password_confirm: 'senha123'
      })
    });

    if (!usuarioResponse.ok) {
      const error = await usuarioResponse.json();
      throw new Error(error.message || 'Erro ao criar usuário');
    }

    const usuario = await usuarioResponse.json();

    // Depois criar o perfil de aluno
    const alunoResponse = await fetch(`${API_BASE}/alunos/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario: usuario.id,
        escola: escolaId,
        matricula: data.matricula,
        data_nascimento: data.data_nascimento,
        turma_atual: data.turma_atual,
        cpf: data.cpf,
        rg: data.rg,
        endereco: data.endereco,
        status: 'ATIVO'
      })
    });

    if (!alunoResponse.ok) {
      const error = await alunoResponse.json();
      throw new Error(error.message || 'Erro ao criar aluno');
    }

    return alunoResponse.json();
  },

  // Atualizar aluno
  atualizar: async (id: string, data: Partial<AlunoFormData>) => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE}/alunos/${id}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao atualizar aluno');
    }

    return response.json();
  },

  // Deletar aluno
  deletar: async (id: string) => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE}/alunos/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar aluno');
    }

    return true;
  },

  // Buscar boletim completo
  buscarBoletim: async (id: string, anoLetivoId: string) => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE}/alunos/${id}/boletim_completo/?ano_letivo_id=${anoLetivoId}`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Erro ao buscar boletim');
    return response.json();
  }
};