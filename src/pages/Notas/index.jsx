// src/pages/Notas/index.jsx

import React, { useState } from 'react';
import { BarChart3, Plus, Download, FileText, Calendar } from 'lucide-react';
import FiltrosNotas from './components/FiltrosNotas';
import TabelaNotas from './components/TabelaNotas';
import LancarNotasModal from './modals/LancarNotas';
import BoletimModal from './modals/Boletim';
import FrequenciaModal from './modals/Frequencia';

const Notas = () => {
  const [showLancarModal, setShowLancarModal] = useState(false);
  const [showBoletimModal, setShowBoletimModal] = useState(false);
  const [showFrequenciaModal, setShowFrequenciaModal] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [filtros, setFiltros] = useState({
    turma: '',
    disciplina: '',
    periodo: '3º Bimestre',
    anoLetivo: '2025'
  });

  // Dados mockados - virão da API
  const notas = [
    {
      id: 1,
      aluno: { id: 1, nome: 'Ana Carolina Silva', matricula: '2024001', foto: null },
      turma: '5º Ano A',
      disciplina: 'Matemática',
      professor: 'João Santos',
      periodo: '3º Bimestre',
      notas: [
        { tipo: 'Prova', valor: 8.5, data: '2024-10-15' },
        { tipo: 'Trabalho', valor: 9.0, data: '2024-10-20' },
        { tipo: 'Participação', valor: 8.0, data: '2024-10-25' }
      ],
      media: 8.5,
      frequencia: 95,
      totalAulas: 20,
      presencas: 19
    },
    {
      id: 2,
      aluno: { id: 2, nome: 'Pedro Henrique Santos', matricula: '2024002', foto: null },
      turma: '5º Ano A',
      disciplina: 'Matemática',
      professor: 'João Santos',
      periodo: '3º Bimestre',
      notas: [
        { tipo: 'Prova', valor: 7.0, data: '2024-10-15' },
        { tipo: 'Trabalho', valor: 8.5, data: '2024-10-20' }
      ],
      media: 7.8,
      frequencia: 90,
      totalAulas: 20,
      presencas: 18
    },
    {
      id: 3,
      aluno: { id: 3, nome: 'Juliana Oliveira Costa', matricula: '2024003', foto: null },
      turma: '5º Ano A',
      disciplina: 'Português',
      professor: 'Ana Costa',
      periodo: '3º Bimestre',
      notas: [
        { tipo: 'Prova', valor: 9.5, data: '2024-10-16' },
        { tipo: 'Trabalho', valor: 9.0, data: '2024-10-21' },
        { tipo: 'Seminário', valor: 10.0, data: '2024-10-28' }
      ],
      media: 9.5,
      frequencia: 100,
      totalAulas: 20,
      presencas: 20
    },
    {
      id: 4,
      aluno: { id: 1, nome: 'Ana Carolina Silva', matricula: '2024001', foto: null },
      turma: '5º Ano A',
      disciplina: 'Português',
      professor: 'Ana Costa',
      periodo: '3º Bimestre',
      notas: [
        { tipo: 'Prova', valor: 8.0, data: '2024-10-16' },
        { tipo: 'Trabalho', valor: 8.5, data: '2024-10-21' }
      ],
      media: 8.2,
      frequencia: 95,
      totalAulas: 20,
      presencas: 19
    }
  ];

  const estatisticas = {
    mediaGeral: 8.5,
    frequenciaMedia: 95,
    alunosAcimaDaMedia: 24,
    alunosAbaixoDaMedia: 4
  };

  const handleLancarNotas = () => {
    setShowLancarModal(true);
  };

  const handleVerBoletim = (aluno) => {
    setAlunoSelecionado(aluno);
    setShowBoletimModal(true);
  };

  const handleLancarFrequencia = () => {
    setShowFrequenciaModal(true);
  };

  const handleExportar = () => {
    console.log('Exportar relatório de notas');
    alert('Exportando relatório...');
  };

  // Aplicar filtros
  const notasFiltradas = notas.filter(nota => {
    const matchTurma = !filtros.turma || nota.turma === filtros.turma;
    const matchDisciplina = !filtros.disciplina || nota.disciplina === filtros.disciplina;
    const matchPeriodo = nota.periodo === filtros.periodo;
    return matchTurma && matchDisciplina && matchPeriodo;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              Notas e Boletins
            </h1>
            <p className="text-gray-600 mt-1">Lançamento de notas, frequência e geração de boletins</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleLancarFrequencia}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Lançar Frequência
            </button>
            <button 
              onClick={handleExportar}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button 
              onClick={handleLancarNotas}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Lançar Notas
            </button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Média Geral</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.mediaGeral}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Frequência Média</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.frequenciaMedia}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Acima da Média</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.alunosAcimaDaMedia}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Abaixo da Média</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.alunosAbaixoDaMedia}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <FiltrosNotas
        filtros={filtros}
        onFiltrosChange={setFiltros}
      />

      {/* Tabela de Notas */}
      <TabelaNotas
        notas={notasFiltradas}
        onVerBoletim={handleVerBoletim}
      />

      {/* Modais */}
      {showLancarModal && (
        <LancarNotasModal
          onClose={() => setShowLancarModal(false)}
        />
      )}

      {showBoletimModal && alunoSelecionado && (
        <BoletimModal
          aluno={alunoSelecionado}
          onClose={() => {
            setShowBoletimModal(false);
            setAlunoSelecionado(null);
          }}
        />
      )}

      {showFrequenciaModal && (
        <FrequenciaModal
          onClose={() => setShowFrequenciaModal(false)}
        />
      )}
    </div>
  );
};

export default Notas;