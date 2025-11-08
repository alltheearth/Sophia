// src/pages/Turmas/index.tsx

import React, { useState, useEffect } from 'react';
import { Users, Plus, Download, Grid, List, Loader2 } from 'lucide-react';
import ListaTurmas from './components/ListaTurmas';
import FiltrosTurmas from './components/FiltrosTurmas';
import CadastroTurmaModal from './modals/CadastroTurma';
import DetalhesTurmaModal from './modals/DetalhesTurma';
import AlocarAlunosModal from './modals/AlocarAlunos';
import { turmasApi, type Turma } from '../../services/turmasApi';
import { useAuth } from '../../hooks/useAuth';

const Turmas = () => {
  const { escola } = useAuth();
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmasFiltradas, setTurmasFiltradas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [showAlocarModal, setShowAlocarModal] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);
  const [visualizacao, setVisualizacao] = useState('grid');
  
  const [filtros, setFiltros] = useState({
    searchTerm: '',
    serie: 'TODAS',
    turno: 'TODOS',
    anoLetivo: '2025'
  });

  // Carregar turmas ao montar o componente
  useEffect(() => {
    carregarTurmas();
  }, [escola]);

  // Aplicar filtros quando mudarem
  useEffect(() => {
    aplicarFiltros();
  }, [turmas, filtros]);

  const carregarTurmas = async () => {
    if (!escola?.id) {
      setError('Nenhuma escola selecionada');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await turmasApi.listar(escola.id, filtros);
      setTurmas(data);
    } catch (err: any) {
      console.error('Erro ao carregar turmas:', err);
      setError(err.message || 'Erro ao carregar turmas');
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    let resultado = [...turmas];

    // Filtro de busca
    if (filtros.searchTerm) {
      const termo = filtros.searchTerm.toLowerCase();
      resultado = resultado.filter(turma => 
        turma.nome.toLowerCase().includes(termo) ||
        turma.professorTitular?.nome?.toLowerCase().includes(termo)
      );
    }

    // Filtro de série
    if (filtros.serie !== 'TODAS') {
      resultado = resultado.filter(turma => turma.serie.includes(filtros.serie));
    }

    // Filtro de turno
    if (filtros.turno !== 'TODOS') {
      resultado = resultado.filter(turma => turma.turno === filtros.turno);
    }

    // Filtro de ano letivo
    if (filtros.anoLetivo) {
      resultado = resultado.filter(turma => 
        turma.anoLetivo?.toString() === filtros.anoLetivo
      );
    }

    setTurmasFiltradas(resultado);
  };

  const handleVerDetalhes = (turma: Turma) => {
    setTurmaSelecionada(turma);
    setShowDetalhesModal(true);
  };

  const handleEditarTurma = (turma: Turma) => {
    setTurmaSelecionada(turma);
    setShowCadastroModal(true);
  };

  const handleAlocarAlunos = (turma: Turma) => {
    setTurmaSelecionada(turma);
    setShowAlocarModal(true);
  };

  const handleNovaTurma = () => {
    setTurmaSelecionada(null);
    setShowCadastroModal(true);
  };

  const handleSalvarTurma = async (formData: any) => {
    if (!escola?.id) return;

    try {
      if (turmaSelecionada) {
        // Atualizar
        await turmasApi.atualizar(turmaSelecionada.id, formData);
      } else {
        // Criar
        await turmasApi.criar(formData, escola.id);
      }
      
      // Recarregar lista
      await carregarTurmas();
      setShowCadastroModal(false);
      setTurmaSelecionada(null);
    } catch (err: any) {
      console.error('Erro ao salvar turma:', err);
      alert(err.message || 'Erro ao salvar turma');
      throw err;
    }
  };

  const handleDeletarTurma = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta turma? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      await turmasApi.deletar(id);
      await carregarTurmas();
      alert('Turma excluída com sucesso!');
    } catch (err: any) {
      console.error('Erro ao deletar turma:', err);
      alert(err.message || 'Erro ao deletar turma');
    }
  };

  const handleExportarTurmas = async () => {
    if (!escola?.id) return;
    
    try {
      await turmasApi.exportar(escola.id, 'xlsx');
    } catch (err: any) {
      console.error('Erro ao exportar:', err);
      alert(err.message || 'Erro ao exportar turmas');
    }
  };

  // Calcular estatísticas
  const estatisticas = {
    total: turmas.length,
    totalAlunos: turmas.reduce((acc, t) => acc + (t.totalAlunos || 0), 0),
    mediaAlunos: turmas.length > 0 
      ? Math.round(turmas.reduce((acc, t) => acc + (t.totalAlunos || 0), 0) / turmas.length)
      : 0,
    mediaGeral: turmas.length > 0
      ? (turmas.reduce((acc, t) => acc + (t.mediaGeral || 0), 0) / turmas.length).toFixed(1)
      : '0.0'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando turmas...</p>
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar turmas</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={carregarTurmas}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
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
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              Turmas
            </h1>
            <p className="text-gray-600 mt-1">Gestão completa de turmas e alocação de alunos</p>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-2 border border-gray-300 rounded-lg p-1 bg-white">
              <button
                onClick={() => setVisualizacao('grid')}
                className={`p-2 rounded transition-colors ${
                  visualizacao === 'grid'
                    ? 'bg-teal-100 text-teal-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setVisualizacao('list')}
                className={`p-2 rounded transition-colors ${
                  visualizacao === 'list'
                    ? 'bg-teal-100 text-teal-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={handleExportarTurmas}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button 
              onClick={handleNovaTurma}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nova Turma
            </button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Turmas</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.total}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Alunos</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.totalAlunos}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Média Alunos/Turma</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.mediaAlunos}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Média Geral</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.mediaGeral}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <FiltrosTurmas
        filtros={filtros}
        onFiltrosChange={setFiltros}
      />

      {/* Lista de Turmas */}
      <ListaTurmas
        turmas={turmasFiltradas}
        totalTurmas={turmas.length}
        visualizacao={visualizacao}
        onVerDetalhes={handleVerDetalhes}
        onEditar={handleEditarTurma}
        onAlocarAlunos={handleAlocarAlunos}
        onDeletar={handleDeletarTurma}
      />

      {/* Modais */}
      {showCadastroModal && (
        <CadastroTurmaModal
          turma={turmaSelecionada}
          onClose={() => {
            setShowCadastroModal(false);
            setTurmaSelecionada(null);
          }}
          onSave={handleSalvarTurma}
        />
      )}

      {showDetalhesModal && turmaSelecionada && (
        <DetalhesTurmaModal
          turma={turmaSelecionada}
          onClose={() => {
            setShowDetalhesModal(false);
            setTurmaSelecionada(null);
          }}
          onEditar={() => {
            setShowDetalhesModal(false);
            setShowCadastroModal(true);
          }}
          onAlocarAlunos={() => {
            setShowDetalhesModal(false);
            setShowAlocarModal(true);
          }}
        />
      )}

      {showAlocarModal && turmaSelecionada && (
        <AlocarAlunosModal
          turma={turmaSelecionada}
          onClose={() => {
            setShowAlocarModal(false);
            setTurmaSelecionada(null);
          }}
          onSave={async (alunosIds: string[]) => {
            try {
              await turmasApi.alocarAlunos(turmaSelecionada.id, alunosIds);
              await carregarTurmas();
              setShowAlocarModal(false);
              setTurmaSelecionada(null);
            } catch (err: any) {
              console.error('Erro ao alocar alunos:', err);
              alert(err.message || 'Erro ao alocar alunos');
            }
          }}
        />
      )}
    </div>
  );
};

export default Turmas;