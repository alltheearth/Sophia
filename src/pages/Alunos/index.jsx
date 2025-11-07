import React, { useState, useEffect } from 'react';
import { Users, Plus, Download, Upload, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { alunosApi, Aluno } from '../../services/alunosApi';
import ListaAlunos from './components/ListaAlunos';
import FiltrosAlunos from './components/FiltrosAlunos';
import CadastroAlunoModal from './modals/CadastroAluno';
import DetalhesAlunoModal from './modals/DetalhesAluno';

const Alunos = () => {
  const { escola } = useAuth();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [filtros, setFiltros] = useState({
    searchTerm: '',
    turma: 'TODAS',
    status: 'ATIVO',
    turno: 'TODOS'
  });

  // Carregar alunos
  useEffect(() => {
    if (escola?.id) {
      carregarAlunos();
    }
  }, [escola, filtros]);

  const carregarAlunos = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await alunosApi.listar(escola!.id, {
        status: filtros.status !== 'TODOS' ? filtros.status : undefined,
        search: filtros.searchTerm || undefined
      });
      setAlunos(data.results || data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar alunos');
      console.error('Erro ao carregar alunos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerDetalhes = async (aluno: Aluno) => {
    try {
      const alunoCompleto = await alunosApi.buscar(aluno.id);
      setAlunoSelecionado(alunoCompleto);
      setShowDetalhesModal(true);
    } catch (err: any) {
      alert('Erro ao carregar detalhes do aluno');
    }
  };

  const handleEditarAluno = async (aluno: Aluno) => {
    try {
      const alunoCompleto = await alunosApi.buscar(aluno.id);
      setAlunoSelecionado(alunoCompleto);
      setShowCadastroModal(true);
    } catch (err: any) {
      alert('Erro ao carregar dados do aluno');
    }
  };

  const handleNovoAluno = () => {
    setAlunoSelecionado(null);
    setShowCadastroModal(true);
  };

  const handleSalvarAluno = async () => {
    await carregarAlunos();
    setShowCadastroModal(false);
    setAlunoSelecionado(null);
  };

  const handleImportarAlunos = () => {
    alert('Funcionalidade de importação será implementada');
  };

  const handleExportarAlunos = () => {
    // Exportar para CSV
    const csv = [
      ['Nome', 'Matrícula', 'Turma', 'Status', 'Responsável', 'Telefone'].join(','),
      ...alunos.map(a => [
        a.nome,
        a.matricula,
        a.turma_nome || '-',
        a.status,
        a.responsaveis[0]?.nome || '-',
        a.responsaveis[0]?.telefone || '-'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alunos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Aplicar filtros locais
  const alunosFiltrados = alunos.filter(aluno => {
    const matchSearch = filtros.searchTerm === '' || 
      aluno.nome.toLowerCase().includes(filtros.searchTerm.toLowerCase()) ||
      aluno.matricula.includes(filtros.searchTerm) ||
      aluno.responsaveis.some(r => r.nome.toLowerCase().includes(filtros.searchTerm.toLowerCase()));
    
    const matchStatus = filtros.status === 'TODOS' || aluno.status === filtros.status;
    const matchTurma = filtros.turma === 'TODAS' || (aluno.turma_nome && aluno.turma_nome.includes(filtros.turma));
    const matchTurno = filtros.turno === 'TODOS' || aluno.turno === filtros.turno;

    return matchSearch && matchStatus && matchTurma && matchTurno;
  });

  const estatisticas = {
    total: alunos.length,
    ativos: alunos.filter(a => a.status === 'ATIVO').length,
    inativos: alunos.filter(a => a.status === 'INATIVO').length,
    matriculadosHoje: 0 // Implementar contagem por data
  };

  if (loading && alunos.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando alunos...</p>
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
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              Alunos
            </h1>
            <p className="text-gray-600 mt-1">Gestão completa de alunos e matrículas</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleImportarAlunos}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Importar
            </button>
            <button 
              onClick={handleExportarAlunos}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button 
              onClick={handleNovoAluno}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Novo Aluno
            </button>
          </div>
        </div>

        {/* Erro */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Alunos</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alunos Ativos</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.ativos}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-gray-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inativos</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.inativos}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Matrículas Hoje</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.matriculadosHoje}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <FiltrosAlunos
        filtros={filtros}
        onFiltrosChange={setFiltros}
      />

      {/* Lista de Alunos */}
      <ListaAlunos
        alunos={alunosFiltrados}
        totalAlunos={alunos.length}
        onVerDetalhes={handleVerDetalhes}
        onEditar={handleEditarAluno}
        loading={loading}
      />

      {/* Modais */}
      {showCadastroModal && (
        <CadastroAlunoModal
          aluno={alunoSelecionado}
          escolaId={escola!.id}
          onClose={() => {
            setShowCadastroModal(false);
            setAlunoSelecionado(null);
          }}
          onSalvar={handleSalvarAluno}
        />
      )}

      {showDetalhesModal && alunoSelecionado && (
        <DetalhesAlunoModal
          aluno={alunoSelecionado}
          onClose={() => {
            setShowDetalhesModal(false);
            setAlunoSelecionado(null);
          }}
          onEditar={() => {
            setShowDetalhesModal(false);
            setShowCadastroModal(true);
          }}
        />
      )}
    </div>
  );
};

export default Alunos;