// src/pages/Alunos/index.jsx

import React, { useState } from 'react';
import { Users, Plus, Download, Upload } from 'lucide-react';
import ListaAlunos from './components/ListaAlunos';
import FiltrosAlunos from './components/FiltrosAlunos';
import CadastroAlunoModal from './modals/CadastroAluno';
import DetalhesAlunoModal from './modals/DetalhesAluno';

const Alunos = () => {
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [filtros, setFiltros] = useState({
    searchTerm: '',
    turma: 'TODAS',
    status: 'ATIVO',
    serie: 'TODAS'
  });

  // Dados mockados - virão da API
  const alunos = [
    {
      id: 1,
      nome: 'Ana Carolina Silva',
      matricula: '2024001',
      foto: null,
      dataNascimento: '2014-05-15',
      idade: 10,
      turma: '5º Ano A',
      turno: 'MATUTINO',
      status: 'ATIVO',
      responsaveis: [
        { nome: 'Maria Silva', parentesco: 'Mãe', telefone: '(11) 98765-4321', email: 'maria@email.com' }
      ],
      endereco: 'Rua das Flores, 123',
      cpf: '123.456.789-00',
      rg: '12.345.678-9'
    },
    {
      id: 2,
      nome: 'Pedro Henrique Santos',
      matricula: '2024002',
      foto: null,
      dataNascimento: '2016-08-22',
      idade: 8,
      turma: '3º Ano B',
      turno: 'VESPERTINO',
      status: 'ATIVO',
      responsaveis: [
        { nome: 'João Santos', parentesco: 'Pai', telefone: '(11) 97654-3210', email: 'joao@email.com' }
      ],
      endereco: 'Av. Principal, 456',
      cpf: '987.654.321-00',
      rg: '98.765.432-1'
    },
    {
      id: 3,
      nome: 'Juliana Oliveira Costa',
      matricula: '2024003',
      foto: null,
      dataNascimento: '2018-03-10',
      idade: 6,
      turma: '1º Ano C',
      turno: 'MATUTINO',
      status: 'ATIVO',
      responsaveis: [
        { nome: 'Carlos Costa', parentesco: 'Pai', telefone: '(11) 96543-2109', email: 'carlos@email.com' }
      ],
      endereco: 'Rua da Paz, 789',
      cpf: '456.789.123-00',
      rg: '45.678.912-3'
    },
    {
      id: 4,
      nome: 'Lucas Gabriel Ferreira',
      matricula: '2024004',
      foto: null,
      dataNascimento: '2016-11-30',
      idade: 8,
      turma: '2º Ano A',
      turno: 'MATUTINO',
      status: 'ATIVO',
      responsaveis: [
        { nome: 'Fernanda Ferreira', parentesco: 'Mãe', telefone: '(11) 95432-1098', email: 'fernanda@email.com' }
      ],
      endereco: 'Rua do Sol, 321',
      cpf: '321.654.987-00',
      rg: '32.165.498-7'
    },
    {
      id: 5,
      nome: 'Beatriz Almeida Rocha',
      matricula: '2024005',
      foto: null,
      dataNascimento: '2015-07-18',
      idade: 9,
      turma: '4º Ano B',
      turno: 'VESPERTINO',
      status: 'INATIVO',
      responsaveis: [
        { nome: 'Roberto Rocha', parentesco: 'Pai', telefone: '(11) 94321-0987', email: 'roberto@email.com' }
      ],
      endereco: 'Av. Central, 654',
      cpf: '654.321.987-00',
      rg: '65.432.198-7'
    }
  ];

  const estatisticas = {
    total: alunos.length,
    ativos: alunos.filter(a => a.status === 'ATIVO').length,
    inativos: alunos.filter(a => a.status === 'INATIVO').length,
    matriculadosHoje: 2
  };

  const handleVerDetalhes = (aluno) => {
    setAlunoSelecionado(aluno);
    setShowDetalhesModal(true);
  };

  const handleEditarAluno = (aluno) => {
    setAlunoSelecionado(aluno);
    setShowCadastroModal(true);
  };

  const handleNovoAluno = () => {
    setAlunoSelecionado(null);
    setShowCadastroModal(true);
  };

  const handleImportarAlunos = () => {
    console.log('Importar planilha de alunos');
    alert('Funcionalidade de importação será implementada');
  };

  const handleExportarAlunos = () => {
    console.log('Exportar lista de alunos');
    alert('Exportando lista de alunos...');
  };

  // Aplicar filtros
  const alunosFiltrados = alunos.filter(aluno => {
    const matchSearch = filtros.searchTerm === '' || 
      aluno.nome.toLowerCase().includes(filtros.searchTerm.toLowerCase()) ||
      aluno.matricula.includes(filtros.searchTerm) ||
      aluno.responsaveis.some(r => r.nome.toLowerCase().includes(filtros.searchTerm.toLowerCase()));
    
    const matchStatus = filtros.status === 'TODOS' || aluno.status === filtros.status;
    const matchTurma = filtros.turma === 'TODAS' || aluno.turma.includes(filtros.turma);

    return matchSearch && matchStatus && matchTurma;
  });

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
      />

      {/* Modais */}
      {showCadastroModal && (
        <CadastroAlunoModal
          aluno={alunoSelecionado}
          onClose={() => {
            setShowCadastroModal(false);
            setAlunoSelecionado(null);
          }}
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