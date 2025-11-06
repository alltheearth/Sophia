// src/pages/Agenda/index.jsx

import React, { useState } from 'react';
import { Calendar, Plus, Download, List, Grid, Filter, Bell } from 'lucide-react';
import CalendarioView from './components/CalendarioView';
import ListaEventos from './components/ListaEventos';
import FiltrosAgenda from './components/FiltrosAgenda';
import CadastroEventoModal from './modals/CadastroEvento';
import DetalhesEventoModal from './modals/DetalhesEvento';
import GerarCalendarioLetivoModal from './modals/GerarCalendarioLetivo';

const Agenda = () => {
  const [visualizacao, setVisualizacao] = useState('calendario'); // 'calendario' ou 'lista'
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [showGerarCalendarioModal, setShowGerarCalendarioModal] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [mesAtual, setMesAtual] = useState(new Date());
  const [filtros, setFiltros] = useState({
    tipo: 'TODOS',
    turma: 'TODAS',
    status: 'TODOS'
  });

  // Eventos mockados
  const eventos = [
    {
      id: 1,
      titulo: 'Reunião de Pais - 1º Ano',
      tipo: 'REUNIAO',
      data: '2024-11-15',
      horaInicio: '19:00',
      horaFim: '21:00',
      local: 'Auditório Principal',
      descricao: 'Reunião com pais do 1º ano para apresentação do desempenho dos alunos',
      turmas: ['1º Ano A', '1º Ano B'],
      responsavel: 'Maria Silva',
      participantes: 45,
      status: 'CONFIRMADO',
      cor: 'blue'
    },
    {
      id: 2,
      titulo: 'Prova Bimestral - Matemática',
      tipo: 'PROVA',
      data: '2024-11-18',
      horaInicio: '08:00',
      horaFim: '10:00',
      local: 'Salas de Aula',
      descricao: 'Prova do 3º bimestre de Matemática',
      turmas: ['5º Ano A', '5º Ano B', '5º Ano C'],
      responsavel: 'João Santos',
      participantes: 85,
      status: 'AGENDADO',
      cor: 'red'
    },
    {
      id: 3,
      titulo: 'Feira de Ciências',
      tipo: 'EVENTO',
      data: '2024-11-22',
      horaInicio: '09:00',
      horaFim: '17:00',
      local: 'Pátio Central',
      descricao: 'Exposição dos projetos científicos desenvolvidos pelos alunos',
      turmas: ['TODAS'],
      responsavel: 'Carlos Lima',
      participantes: 300,
      status: 'CONFIRMADO',
      cor: 'green'
    },
    {
      id: 4,
      titulo: 'Formatura 5º Ano',
      tipo: 'EVENTO',
      data: '2024-11-28',
      horaInicio: '19:30',
      horaFim: '22:00',
      local: 'Auditório Principal',
      descricao: 'Cerimônia de formatura dos alunos do 5º ano',
      turmas: ['5º Ano A', '5º Ano B', '5º Ano C'],
      responsavel: 'Coordenação',
      participantes: 200,
      status: 'CONFIRMADO',
      cor: 'purple'
    },
    {
      id: 5,
      titulo: 'Recesso Escolar',
      tipo: 'FERIADO',
      data: '2024-11-20',
      horaInicio: '00:00',
      horaFim: '23:59',
      local: '-',
      descricao: 'Dia da Consciência Negra - Feriado Nacional',
      turmas: ['TODAS'],
      responsavel: '-',
      participantes: 0,
      status: 'CONFIRMADO',
      cor: 'gray'
    },
    {
      id: 6,
      titulo: 'Entrega de Boletins',
      tipo: 'ADMINISTRATIVO',
      data: '2024-11-25',
      horaInicio: '14:00',
      horaFim: '18:00',
      local: 'Secretaria',
      descricao: 'Entrega dos boletins do 3º bimestre aos responsáveis',
      turmas: ['TODAS'],
      responsavel: 'Secretaria',
      participantes: 150,
      status: 'AGENDADO',
      cor: 'orange'
    }
  ];

  const estatisticas = {
    totalEventos: eventos.length,
    proximosEventos: eventos.filter(e => new Date(e.data) >= new Date()).length,
    eventosHoje: eventos.filter(e => e.data === new Date().toISOString().split('T')[0]).length,
    reunioesAgendadas: eventos.filter(e => e.tipo === 'REUNIAO').length
  };

  const handleVerDetalhes = (evento) => {
    setEventoSelecionado(evento);
    setShowDetalhesModal(true);
  };

  const handleEditarEvento = (evento) => {
    setEventoSelecionado(evento);
    setShowCadastroModal(true);
  };

  const handleNovoEvento = () => {
    setEventoSelecionado(null);
    setShowCadastroModal(true);
  };

  const handleExportar = () => {
    console.log('Exportar calendário');
    alert('Exportando calendário...');
  };

  // Aplicar filtros
  const eventosFiltrados = eventos.filter(evento => {
    const matchTipo = filtros.tipo === 'TODOS' || evento.tipo === filtros.tipo;
    const matchTurma = filtros.turma === 'TODAS' || evento.turmas.includes(filtros.turma) || evento.turmas.includes('TODAS');
    const matchStatus = filtros.status === 'TODOS' || evento.status === filtros.status;
    
    return matchTipo && matchTurma && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              Agenda Escolar
            </h1>
            <p className="text-gray-600 mt-1">Calendário, eventos e atividades</p>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-2 border border-gray-300 rounded-lg p-1 bg-white">
              <button
                onClick={() => setVisualizacao('calendario')}
                className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                  visualizacao === 'calendario'
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-4 h-4" />
                Calendário
              </button>
              <button
                onClick={() => setVisualizacao('lista')}
                className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                  visualizacao === 'lista'
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-4 h-4" />
                Lista
              </button>
            </div>
            <button 
              onClick={() => setShowGerarCalendarioModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Gerar Calendário Letivo
            </button>
            <button 
              onClick={handleExportar}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button 
              onClick={handleNovoEvento}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Novo Evento
            </button>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Eventos</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.totalEventos}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Próximos Eventos</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.proximosEventos}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Eventos Hoje</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.eventosHoje}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reuniões Agendadas</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.reunioesAgendadas}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <FiltrosAgenda
        filtros={filtros}
        onFiltrosChange={setFiltros}
      />

      {/* Conteúdo Principal */}
      {visualizacao === 'calendario' ? (
        <CalendarioView
          eventos={eventosFiltrados}
          mesAtual={mesAtual}
          onMesChange={setMesAtual}
          onEventoClick={handleVerDetalhes}
        />
      ) : (
        <ListaEventos
          eventos={eventosFiltrados}
          onVerDetalhes={handleVerDetalhes}
          onEditar={handleEditarEvento}
        />
      )}

      {/* Modais */}
      {showCadastroModal && (
        <CadastroEventoModal
          evento={eventoSelecionado}
          onClose={() => {
            setShowCadastroModal(false);
            setEventoSelecionado(null);
          }}
        />
      )}

      {showDetalhesModal && eventoSelecionado && (
        <DetalhesEventoModal
          evento={eventoSelecionado}
          onClose={() => {
            setShowDetalhesModal(false);
            setEventoSelecionado(null);
          }}
          onEditar={() => {
            setShowDetalhesModal(false);
            setShowCadastroModal(true);
          }}
        />
      )}

      {showGerarCalendarioModal && (
        <GerarCalendarioLetivoModal
          onClose={() => setShowGerarCalendarioModal(false)}
        />
      )}
    </div>
  );
};

export default Agenda;