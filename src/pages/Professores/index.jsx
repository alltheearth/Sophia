// src/pages/Professores/index.jsx

import React, { useState } from 'react';
import { GraduationCap, Plus, Download, Upload, Calendar } from 'lucide-react';
import ListaProfessores from './components/ListaProfessores';
import FiltrosProfessores from './components/FiltrosProfessores';
import CadastroProfessorModal from './modals/CadastroProfessor';
import DetalhesProfessorModal from './modals/DetalhesProfessor';
import HorariosProfessorModal from './modals/HorariosProfessor';

const Professores = () => {
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [showHorariosModal, setShowHorariosModal] = useState(false);
  const [professorSelecionado, setProfessorSelecionado] = useState(null);
  const [filtros, setFiltros] = useState({
    searchTerm: '',
    disciplina: 'TODAS',
    status: 'ATIVO',
    turno: 'TODOS'
  });

  // Dados mockados - virão da API
  const professores = [
    {
      id: 1,
      nome: 'João Silva Santos',
      email: 'joao.silva@escola.com',
      telefone: '(11) 98765-4321',
      cpf: '123.456.789-00',
      rg: '12.345.678-9',
      foto: null,
      dataNascimento: '1985-03-15',
      dataAdmissao: '2020-02-01',
      status: 'ATIVO',
      formacao: 'Licenciatura em Matemática',
      especializacao: 'Mestrado em Educação Matemática',
      disciplinas: ['Matemática', 'Física'],
      turmas: ['5º Ano A', '5º Ano B', '4º Ano C'],
      cargaHoraria: 40,
      turno: 'MATUTINO',
      salario: 4500.00,
      endereco: 'Rua das Flores, 123 - Centro'
    },
    {
      id: 2,
      nome: 'Maria Oliveira Costa',
      email: 'maria.costa@escola.com',
      telefone: '(11) 97654-3210',
      cpf: '987.654.321-00',
      rg: '98.765.432-1',
      foto: null,
      dataNascimento: '1990-07-22',
      dataAdmissao: '2019-08-15',
      status: 'ATIVO',
      formacao: 'Licenciatura em Letras',
      especializacao: 'Especialização em Língua Portuguesa',
      disciplinas: ['Português', 'Literatura'],
      turmas: ['3º Ano A', '3º Ano B', '4º Ano A'],
      cargaHoraria: 30,
      turno: 'VESPERTINO',
      salario: 3800.00,
      endereco: 'Av. Principal, 456 - Jardim'
    },
    {
      id: 3,
      nome: 'Carlos Eduardo Ferreira',
      email: 'carlos.ferreira@escola.com',
      telefone: '(11) 96543-2109',
      cpf: '456.789.123-00',
      rg: '45.678.912-3',
      foto: null,
      dataNascimento: '1988-11-10',
      dataAdmissao: '2021-03-20',
      status: 'ATIVO',
      formacao: 'Licenciatura em História',
      especializacao: 'Mestrado em História do Brasil',
      disciplinas: ['História', 'Geografia'],
      turmas: ['2º Ano A', '1º Ano B'],
      cargaHoraria: 20,
      turno: 'MATUTINO',
      salario: 2800.00,
      endereco: 'Rua da Paz, 789 - Vila Nova'
    },
    {
      id: 4,
      nome: 'Ana Paula Rodrigues',
      email: 'ana.rodrigues@escola.com',
      telefone: '(11) 95432-1098',
      cpf: '321.654.987-00',
      rg: '32.165.498-7',
      foto: null,
      dataNascimento: '1992-05-18',
      dataAdmissao: '2022-01-10',
      status: 'ATIVO',
      formacao: 'Licenciatura em Ciências Biológicas',
      especializacao: 'Especialização em Meio Ambiente',
      disciplinas: ['Ciências'],
      turmas: ['5º Ano A', '5º Ano B', '5º Ano C'],
      cargaHoraria: 40,
      turno: 'INTEGRAL',
      salario: 4200.00,
      endereco: 'Rua do Sol, 321 - Bela Vista'
    },
    {
      id: 5,
      nome: 'Roberto Almeida Lima',
      email: 'roberto.lima@escola.com',
      telefone: '(11) 94321-0987',
      cpf: '654.321.987-00',
      rg: '65.432.198-7',
      foto: null,
      dataNascimento: '1983-09-25',
      dataAdmissao: '2018-05-05',
      status: 'FERIAS',
      formacao: 'Licenciatura em Educação Física',
      especializacao: 'Especialização em Educação Física Escolar',
      disciplinas: ['Educação Física'],
      turmas: ['1º Ano A', '2º Ano A', '3º Ano A', '4º Ano A', '5º Ano A'],
      cargaHoraria: 40,
      turno: 'INTEGRAL',
      salario: 3500.00,
      endereco: 'Av. Central, 654 - Centro'
    }
  ];

  const estatisticas = {
    total: professores.length,
    ativos: professores.filter(p => p.status === 'ATIVO').length,
    ferias: professores.filter(p => p.status === 'FERIAS').length,
    mediaAlunos: 85
  };

  const handleVerDetalhes = (professor) => {
    setProfessorSelecionado(professor);
    setShowDetalhesModal(true);
  };

  const handleEditarProfessor = (professor) => {
    setProfessorSelecionado(professor);
    setShowCadastroModal(true);
  };

  const handleVerHorarios = (professor) => {
    setProfessorSelecionado(professor);
    setShowHorariosModal(true);
  };

  const handleNovoProfessor = () => {
    setProfessorSelecionado(null);
    setShowCadastroModal(true);
  };

  const handleImportarProfessores = () => {
    console.log('Importar planilha de professores');
    alert('Funcionalidade de importação será implementada');
  };

  const handleExportarProfessores = () => {
    console.log('Exportar lista de professores');
    alert('Exportando lista de professores...');
  };

  // Aplicar filtros
  const professoresFiltrados = professores.filter(professor => {
    const matchSearch = filtros.searchTerm === '' || 
      professor.nome.toLowerCase().includes(filtros.searchTerm.toLowerCase()) ||
      professor.email.toLowerCase().includes(filtros.searchTerm.toLowerCase()) ||
      professor.disciplinas.some(d => d.toLowerCase().includes(filtros.searchTerm.toLowerCase()));
    
    const matchStatus = filtros.status === 'TODOS' || professor.status === filtros.status;
    const matchDisciplina = filtros.disciplina === 'TODAS' || 
      professor.disciplinas.includes(filtros.disciplina);
    const matchTurno = filtros.turno === 'TODOS' || professor.turno === filtros.turno;

    return matchSearch && matchStatus && matchDisciplina && matchTurno;
  });

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
      />

      {/* Modais */}
      {showCadastroModal && (
        <CadastroProfessorModal
          professor={professorSelecionado}
          onClose={() => {
            setShowCadastroModal(false);
            setProfessorSelecionado(null);
          }}
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