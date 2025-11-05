// src/pages/Turmas/index.jsx

import React, { useState } from 'react';
import { Users, Plus, Download, Grid, List } from 'lucide-react';
import ListaTurmas from './components/ListaTurmas';
import FiltrosTurmas from './components/FiltrosTurmas';
import CadastroTurmaModal from './modals/CadastroTurma';
import DetalhesTurmaModal from './modals/DetalhesTurma';
import AlocarAlunosModal from './modals/AlocarAlunos';

const Turmas = () => {
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [showAlocarModal, setShowAlocarModal] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [visualizacao, setVisualizacao] = useState('grid');
  const [filtros, setFiltros] = useState({
    searchTerm: '',
    serie: 'TODAS',
    turno: 'TODOS',
    anoLetivo: '2025'
  });

  // Dados mockados - virão da API
  const turmas = [
    {
      id: 1,
      nome: '5º Ano A',
      serie: '5º Ano',
      turno: 'MATUTINO',
      anoLetivo: 2025,
      capacidadeMaxima: 30,
      totalAlunos: 28,
      coordenador: { nome: 'Maria Silva', foto: null },
      professorTitular: { nome: 'João Santos', foto: null },
      sala: '101',
      disciplinas: [
        { nome: 'Matemática', professor: 'João Santos' },
        { nome: 'Português', professor: 'Ana Costa' },
        { nome: 'Ciências', professor: 'Carlos Lima' },
        { nome: 'História', professor: 'Paula Rocha' }
      ],
      mediaGeral: 8.2,
      frequenciaMedia: 96.5,
      status: 'ATIVO'
    },
    {
      id: 2,
      nome: '5º Ano B',
      serie: '5º Ano',
      turno: 'VESPERTINO',
      anoLetivo: 2025,
      capacidadeMaxima: 30,
      totalAlunos: 30,
      coordenador: { nome: 'Maria Silva', foto: null },
      professorTitular: { nome: 'João Santos', foto: null },
      sala: '102',
      disciplinas: [
        { nome: 'Matemática', professor: 'João Santos' },
        { nome: 'Português', professor: 'Ana Costa' },
        { nome: 'Ciências', professor: 'Carlos Lima' },
        { nome: 'Geografia', professor: 'Roberto Alves' }
      ],
      mediaGeral: 7.8,
      frequenciaMedia: 95.2,
      status: 'ATIVO'
    },
    {
      id: 3,
      nome: '4º Ano C',
      serie: '4º Ano',
      turno: 'MATUTINO',
      anoLetivo: 2025,
      capacidadeMaxima: 28,
      totalAlunos: 25,
      coordenador: { nome: 'Maria Silva', foto: null },
      professorTitular: { nome: 'Ana Costa', foto: null },
      sala: '201',
      disciplinas: [
        { nome: 'Matemática', professor: 'João Santos' },
        { nome: 'Português', professor: 'Ana Costa' },
        { nome: 'Ciências', professor: 'Carlos Lima' }
      ],
      mediaGeral: 8.5,
      frequenciaMedia: 97.8,
      status: 'ATIVO'
    },
    {
      id: 4,
      nome: '3º Ano A',
      serie: '3º Ano',
      turno: 'MATUTINO',
      anoLetivo: 2025,
      capacidadeMaxima: 25,
      totalAlunos: 24,
      coordenador: { nome: 'Pedro Oliveira', foto: null },
      professorTitular: { nome: 'Maria Costa', foto: null },
      sala: '301',
      disciplinas: [
        { nome: 'Matemática', professor: 'João Santos' },
        { nome: 'Português', professor: 'Maria Costa' },
        { nome: 'Ciências', professor: 'Carlos Lima' }
      ],
      mediaGeral: 8.0,
      frequenciaMedia: 96.0,
      status: 'ATIVO'
    },
    {
      id: 5,
      nome: '2º Ano A',
      serie: '2º Ano',
      turno: 'VESPERTINO',
      anoLetivo: 2025,
      capacidadeMaxima: 25,
      totalAlunos: 22,
      coordenador: { nome: 'Pedro Oliveira', foto: null },
      professorTitular: { nome: 'Paula Rocha', foto: null },
      sala: '302',
      disciplinas: [
        { nome: 'Matemática', professor: 'João Santos' },
        { nome: 'Português', professor: 'Paula Rocha' },
        { nome: 'Artes', professor: 'Lucia Santos' }
      ],
      mediaGeral: 8.3,
      frequenciaMedia: 98.0,
      status: 'ATIVO'
    },
    {
      id: 6,
      nome: '1º Ano B',
      serie: '1º Ano',
      turno: 'MATUTINO',
      anoLetivo: 2025,
      capacidadeMaxima: 20,
      totalAlunos: 18,
      coordenador: { nome: 'Pedro Oliveira', foto: null },
      professorTitular: { nome: 'Juliana Lima', foto: null },
      sala: '401',
      disciplinas: [
        { nome: 'Alfabetização', professor: 'Juliana Lima' },
        { nome: 'Matemática', professor: 'Juliana Lima' },
        { nome: 'Artes', professor: 'Lucia Santos' }
      ],
      mediaGeral: 8.7,
      frequenciaMedia: 97.5,
      status: 'ATIVO'
    }
  ];

  const estatisticas = {
    total: turmas.length,
    totalAlunos: turmas.reduce((acc, t) => acc + t.totalAlunos, 0),
    mediaAlunos: Math.round(turmas.reduce((acc, t) => acc + t.totalAlunos, 0) / turmas.length),
    mediaGeral: (turmas.reduce((acc, t) => acc + t.mediaGeral, 0) / turmas.length).toFixed(1)
  };

  const handleVerDetalhes = (turma) => {
    setTurmaSelecionada(turma);
    setShowDetalhesModal(true);
  };

  const handleEditarTurma = (turma) => {
    setTurmaSelecionada(turma);
    setShowCadastroModal(true);
  };

  const handleAlocarAlunos = (turma) => {
    setTurmaSelecionada(turma);
    setShowAlocarModal(true);
  };

  const handleNovaTurma = () => {
    setTurmaSelecionada(null);
    setShowCadastroModal(true);
  };

  const handleExportarTurmas = () => {
    console.log('Exportar lista de turmas');
    alert('Exportando lista de turmas...');
  };

  // Aplicar filtros
  const turmasFiltradas = turmas.filter(turma => {
    const matchSearch = filtros.searchTerm === '' || 
      turma.nome.toLowerCase().includes(filtros.searchTerm.toLowerCase()) ||
      turma.professorTitular.nome.toLowerCase().includes(filtros.searchTerm.toLowerCase());
    
    const matchSerie = filtros.serie === 'TODAS' || turma.serie.includes(filtros.serie);
    const matchTurno = filtros.turno === 'TODOS' || turma.turno === filtros.turno;
    const matchAno = turma.anoLetivo.toString() === filtros.anoLetivo;

    return matchSearch && matchSerie && matchTurno && matchAno;
  });

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
      />

      {/* Modais */}
      {showCadastroModal && (
        <CadastroTurmaModal
          turma={turmaSelecionada}
          onClose={() => {
            setShowCadastroModal(false);
            setTurmaSelecionada(null);
          }}
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
        />
      )}
    </div>
  );
};

export default Turmas;