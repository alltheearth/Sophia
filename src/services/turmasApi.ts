// src/services/turmasApi.ts

export interface Turma {
  id: string;
  nome: string;
  serie: string;
  turno: 'MATUTINO' | 'VESPERTINO' | 'NOTURNO' | 'INTEGRAL';
  anoLetivo: number;
  ano_letivo?: number;
  capacidadeMaxima: number;
  capacidade_maxima?: number;
  totalAlunos: number;
  sala: string;
  
  // Relacionamentos
  coordenador: {
    id: string;
    nome: string;
    foto?: string;
  };
  professorTitular: {
    id: string;
    nome: string;
    foto?: string;
  };
  professor_titular?: {
    id: string;
    nome: string;
  };
  
  disciplinas: Array<{
    id?: string;
    nome: string;
    professor: string;
  }>;
  
  // Métricas
  mediaGeral: number;
  frequenciaMedia: number;
  status?: string;
  
  // Escola
  escola?: string;
  escola_nome?: string;
}

export interface TurmaFormData {
  nome: string;
  serie: string;
  turno: string;
  ano_letivo: number;
  capacidade_maxima: number;
  sala: string;
  coordenador?: string;
  professor_titular?: string;
  escola?: string;
}

export interface AlocarAlunosData {
  turma_id: string;
  alunos_ids: string[];
}

export interface TurmasListResponse {
  results?: Turma[];
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

// Função auxiliar para normalizar dados da turma
const normalizeTurma = (turma: any): Turma => {
  return {
    ...turma,
    anoLetivo: turma.ano_letivo || turma.anoLetivo,
    capacidadeMaxima: turma.capacidade_maxima || turma.capacidadeMaxima,
    totalAlunos: turma.total_alunos || turma.totalAlunos || 0,
    professorTitular: turma.professor_titular || turma.professorTitular || { id: '', nome: 'Não definido' },
    disciplinas: turma.disciplinas || [],
    mediaGeral: turma.media_geral || turma.mediaGeral || 0,
    frequenciaMedia: turma.frequencia_media || turma.frequenciaMedia || 0,
  };
};

export const turmasApi = {
  // Listar turmas
  listar: async (escolaId: string, filtros?: any): Promise<Turma[]> => {
    try {
      const params = new URLSearchParams({
        escola: escolaId,
        ...(filtros?.serie && filtros.serie !== 'TODAS' && { serie: filtros.serie }),
        ...(filtros?.turno && filtros.turno !== 'TODOS' && { turno: filtros.turno }),
        ...(filtros?.anoLetivo && { ano_letivo: filtros.anoLetivo }),
        ...(filtros?.searchTerm && { search: filtros.searchTerm })
      });
      
      const response = await fetch(`${API_BASE}/turmas/?${params}`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar turmas');
      }
      
      const data: TurmasListResponse | Turma[] = await response.json();
      
      // Se a resposta tem paginação
      if (data && typeof data === 'object' && 'results' in data) {
        return (data.results || []).map(normalizeTurma);
      }
      
      // Se a resposta é um array direto
      return Array.isArray(data) ? data.map(normalizeTurma) : [];
    } catch (error) {
      console.error('Erro ao listar turmas:', error);
      throw error;
    }
  },

  // Buscar uma turma específica
  buscar: async (id: string): Promise<Turma> => {
    try {
      const response = await fetch(`${API_BASE}/turmas/${id}/`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar turma');
      }
      
      const data = await response.json();
      return normalizeTurma(data);
    } catch (error) {
      console.error('Erro ao buscar turma:', error);
      throw error;
    }
  },

  // Criar turma
  criar: async (formData: TurmaFormData, escolaId: string): Promise<Turma> => {
    try {
      const payload = {
        nome: formData.nome,
        serie: formData.serie,
        turno: formData.turno,
        ano_letivo: formData.ano_letivo,
        capacidade_maxima: formData.capacidade_maxima,
        sala: formData.sala,
        escola: escolaId,
        ...(formData.coordenador && { coordenador: formData.coordenador }),
        ...(formData.professor_titular && { professor_titular: formData.professor_titular })
      };

      const response = await fetch(`${API_BASE}/turmas/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao criar turma');
      }

      const data = await response.json();
      return normalizeTurma(data);
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      throw error;
    }
  },

  // Atualizar turma
  atualizar: async (id: string, formData: Partial<TurmaFormData>): Promise<Turma> => {
    try {
      const payload = {
        ...(formData.nome && { nome: formData.nome }),
        ...(formData.serie && { serie: formData.serie }),
        ...(formData.turno && { turno: formData.turno }),
        ...(formData.ano_letivo && { ano_letivo: formData.ano_letivo }),
        ...(formData.capacidade_maxima && { capacidade_maxima: formData.capacidade_maxima }),
        ...(formData.sala && { sala: formData.sala }),
        ...(formData.coordenador && { coordenador: formData.coordenador }),
        ...(formData.professor_titular && { professor_titular: formData.professor_titular })
      };

      const response = await fetch(`${API_BASE}/turmas/${id}/`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao atualizar turma');
      }

      const data = await response.json();
      return normalizeTurma(data);
    } catch (error) {
      console.error('Erro ao atualizar turma:', error);
      throw error;
    }
  },

  // Deletar turma
  deletar: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/turmas/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok && response.status !== 204) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao deletar turma');
      }

      return true;
    } catch (error) {
      console.error('Erro ao deletar turma:', error);
      throw error;
    }
  },

  // Buscar alunos da turma
  buscarAlunos: async (turmaId: string) => {
    try {
      const response = await fetch(
        `${API_BASE}/turmas/${turmaId}/alunos/`,
        {
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar alunos');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      throw error;
    }
  },

  // Alocar alunos na turma
  alocarAlunos: async (turmaId: string, alunosIds: string[]): Promise<any> => {
    try {
      const response = await fetch(
        `${API_BASE}/turmas/${turmaId}/alocar_alunos/`,
        {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ alunos_ids: alunosIds })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao alocar alunos');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao alocar alunos:', error);
      throw error;
    }
  },

  // Remover aluno da turma
  removerAluno: async (turmaId: string, alunoId: string): Promise<any> => {
    try {
      const response = await fetch(
        `${API_BASE}/turmas/${turmaId}/remover_aluno/`,
        {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ aluno_id: alunoId })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao remover aluno');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao remover aluno:', error);
      throw error;
    }
  },

  // Buscar disciplinas da turma
  buscarDisciplinas: async (turmaId: string) => {
    try {
      const response = await fetch(
        `${API_BASE}/turmas/${turmaId}/disciplinas/`,
        {
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar disciplinas');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
      throw error;
    }
  },

  // Vincular disciplina à turma
  vincularDisciplina: async (turmaId: string, disciplinaId: string, professorId: string) => {
    try {
      const response = await fetch(
        `${API_BASE}/turmas/${turmaId}/vincular_disciplina/`,
        {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            disciplina_id: disciplinaId,
            professor_id: professorId
          })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao vincular disciplina');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao vincular disciplina:', error);
      throw error;
    }
  },

  // Buscar estatísticas da turma
  buscarEstatisticas: async (turmaId: string) => {
    try {
      const response = await fetch(
        `${API_BASE}/turmas/${turmaId}/estatisticas/`,
        {
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar estatísticas');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  },

  // Exportar turmas
  exportar: async (escolaId: string, formato: 'xlsx' | 'pdf' = 'xlsx') => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(
        `${API_BASE}/turmas/exportar/?escola=${escolaId}&formato=${formato}`,
        {
          headers: {
            'Authorization': `Token ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao exportar turmas');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `turmas_${new Date().toISOString().split('T')[0]}.${formato}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error('Erro ao exportar turmas:', error);
      throw error;
    }
  },

  // Buscar anos letivos disponíveis
  buscarAnosLetivos: async (escolaId: string) => {
    try {
      const response = await fetch(
        `${API_BASE}/anos-letivos/?escola=${escolaId}&ativo=true`,
        {
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar anos letivos');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao buscar anos letivos:', error);
      throw error;
    }
  },

  // Buscar coordenadores disponíveis
  buscarCoordenadores: async (escolaId: string) => {
    try {
      const response = await fetch(
        `${API_BASE}/usuarios/?escola=${escolaId}&role=COORDENADOR`,
        {
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar coordenadores');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao buscar coordenadores:', error);
      throw error;
    }
  },

  // Buscar professores disponíveis
  buscarProfessores: async (escolaId: string) => {
    try {
      const response = await fetch(
        `${API_BASE}/professores/?escola=${escolaId}&status=ATIVO`,
        {
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar professores');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
      throw error;
    }
  }
};