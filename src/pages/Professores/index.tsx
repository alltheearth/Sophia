// src/pages/Professores/index.tsx

import { useState, useEffect } from 'react';
import { GraduationCap, Plus, Download, Upload, Calendar, Loader2 } from 'lucide-react';
import ListaProfessores from './components/ListaProfessores';
import FiltrosProfessores from './components/FiltrosProfessores';
import CadastroProfessorModal from './modals/CadastroProfessor';
import DetalhesProfessorModal from './modals/DetalhesProfessor';
import HorariosProfessorModal from './modals/HorariosProfessor';
import { professoresApi, type Professor } from '../../services/professoresApi';
import { useAuth } from '../../hooks/useAuth';

const Professores = () => {
  const { escola } = useAuth();
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [professoresFiltrados, setProfessoresFiltrados] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [showHorariosModal, setShowHorariosModal] = useState(false);
  const [professorSelecionado, setProfessorSelecionado] = useState<Professor | null>(null);
  
  const [filtros, setFiltros] = useState({
    searchTerm: '',
    disciplina: 'TODAS',
    status: 'ATIVO',
    turno: 'TODOS'
  });

  // Carregar professores ao montar o componente
  useEffect(() => {
    carregarProfessores();
  }, [escola]);

  // Aplicar filtros quando mudarem
  useEffect(() => {
    aplicarFiltros();
  }, [professores, filtros]);

  const carregarProfessores = async () => {
    if (!escola?.id) {
      setError('Nenhuma escola selecionada');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await professoresApi.listar(escola.id, filtros);
      setProfessores(data);
    } catch (err: any) {
      console.error('Erro ao carregar professores:', err);
      setError(err.message || 'Erro ao carregar professores');
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    let resultado = [...professores];

    // Filtro de busca
    if (filtros.searchTerm) {
      const termo = filtros.searchTerm.toLowerCase();
      resultado = resultado.filter(prof => 
        prof.nome.toLowerCase().includes(termo) ||
        prof.email.toLowerCase().includes(termo) ||
        prof.disciplinas.some(d => d.toLowerCase().includes(termo))
      );
    }

    // Filtro de status
    if (filtros.status !== 'TODOS') {
      resultado = resultado.filter(prof => prof.status === filtros.status);
    }

    // Filtro de disciplina
    if (filtros.disciplina !== 'TODAS') {
      resultado = resultado.filter(prof => 
        prof.disciplinas.includes(filtros.disciplina)
      );
    }

    // Filtro de turno
    if (filtros.turno !== 'TODOS') {
      resultado = resultado.filter(prof => prof.turno === filtros.turno);
    }

    setProfessoresFiltrados(resultado);
  };

  const handleVerDetalhes = (professor: Professor) => {
    setProfessorSelecionado(professor);
    setShowDetalhesModal(true);
  };

  const handleEditarProfessor = (professor: Professor) => {
    setProfessorSelecionado(professor);
    setShowCadastroModal(true);
  };

  const handleVerHorarios = (professor: Professor) => {
    setProfessorSelecionado(professor);
    setShowHorariosModal(true);
  };

  const handleNovoProfessor = () => {
    setProfessorSelecionado(null);
    setShowCadastroModal(true);
  };

  const handleSalvarProfessor = async (formData: any) => {
    if (!escola?.id) return;

    try {
      if (professorSelecionado) {
        // Atualizar
        await professoresApi.atualizar(professorSelecionado.id, formData);
      } else {
        // Criar
        await professoresApi.criar(formData, escola.id);
      }
      
      // Recarregar lista
      await carregarProfessores();
      setShowCadastroModal(false);
      setProfessorSelecionado(null);
    } catch (err: any) {
      console.error('Erro ao salvar professor:', err);
      alert(err.message || 'Erro ao salvar professor');
      throw err; // Lança erro para o modal tratar
    }
  };

  const handleDeletarProfessor = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este professor?')) {
      return;
    }

    try {
      await professoresApi.deletar(id);
      await carregarProfessores();
      alert('Professor excluído com sucesso!');
    } catch (err: any) {
      console.error('Erro ao deletar professor:', err);
      alert(err.message || 'Erro ao deletar professor');
    }
  };

  const handleImportarProfessores = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (file && escola?.id) {
        try {
          await professoresApi.importarLote(file, escola.id);
          await carregarProfessores();
          alert('Professores importados com sucesso!');
        } catch (err: any) {
          console.error('Erro ao importar:', err);
          alert(err.message || 'Erro ao importar professores');
        }
      }
    };
    input.click();
  };

  const handleExportarProfessores = async () => {
    if (!escola?.id) return;
    
    try {
      await professoresApi.exportar(escola.id, 'xlsx');
    } catch (err: any) {
      console.error('Erro ao exportar:', err);
      alert(err.message || 'Erro ao exportar professores');
    }
  };

  // Calcular estatísticas
  const estatisticas = {
    total: professores.length,
    ativos: professores.filter(p => p.status === 'ATIVO').length,
    ferias: professores.filter(p => p.status === 'FERIAS').length,
    mediaAlunos: professores.length > 0 
      ? Math.round(professores.reduce((acc, p) => acc + p.turmas.length, 0) / professores.length * 30)
      : 0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando professores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar professores</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={carregarProfessores}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              Professores
            </h1>
            <p className="text-gray-600 mt-1">Gestão completa do corpo docente</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleImportarProfessores}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Importar
            </button>
            <button 
              onClick={handleExportarProfessores}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button 
              onClick={handleNovoProfessor}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Novo Professor
            </button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Professores</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.total}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Professores Ativos</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.ativos}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Em Férias</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.ferias}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Média Alunos/Prof</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.mediaAlunos}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <FiltrosProfessores
        filtros={filtros}
        onFiltrosChange={setFiltros}
      />

      {/* Lista de Professores */}
      <ListaProfessores
        professores={professoresFiltrados}
        totalProfessores={professores.length}
        onVerDetalhes={handleVerDetalhes}
        onEditar={handleEditarProfessor}
        onVerHorarios={handleVerHorarios}
        onDeletar={handleDeletarProfessor}
      />

      {/* Modais */}
      {showCadastroModal && (
        <CadastroProfessorModal
          professor={professorSelecionado}
          onClose={() => {
            setShowCadastroModal(false);
            setProfessorSelecionado(null);
          }}
          onSave={handleSalvarProfessor}
        />
      )}

      {showDetalhesModal && professorSelecionado && (
        <DetalhesProfessorModal
          professor={professorSelecionado}
          onClose={() => {
            setShowDetalhesModal(false);
            setProfessorSelecionado(null);
          }}
          onEditar={() => {
            setShowDetalhesModal(false);
            setShowCadastroModal(true);
          }}
        />
      )}

      {showHorariosModal && professorSelecionado && (
        <HorariosProfessorModal
          professor={professorSelecionado}
          onClose={() => {
            setShowHorariosModal(false);
            setProfessorSelecionado(null);
          }}
        />
      )}
    </div>
  );
};

export default Professores;