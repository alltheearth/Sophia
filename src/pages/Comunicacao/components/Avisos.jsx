// src/pages/Comunicacao/components/Avisos.jsx

import React, { useState } from 'react';
import { Eye, Edit, Trash2, AlertCircle, CheckCircle, Users, Clock, Pin, Send } from 'lucide-react';

const Avisos = () => {
  const [filtroTipo, setFiltroTipo] = useState('TODOS');

  // Avisos mockados
  const avisos = [
    {
      id: 1,
      titulo: 'Reunião de Pais - 1º Bimestre',
      tipo: 'REUNIAO',
      conteudo: 'Informamos que no dia 15/11 às 19h teremos a reunião de pais do 1º bimestre. É importante a presença de todos os responsáveis.',
      destinatarios: ['5º Ano A', '5º Ano B', '5º Ano C'],
      dataCriacao: '2024-11-01',
      dataEnvio: '2024-11-01 08:00',
      criadoPor: 'Coordenação Pedagógica',
      visualizacoes: 85,
      confirmacoes: 72,
      total: 90,
      prioridade: 'ALTA',
      status: 'ENVIADO',
      fixado: true
    },
    {
      id: 2,
      titulo: 'Entrega de Uniformes Novos',
      tipo: 'ADMINISTRATIVO',
      conteudo: 'Os novos uniformes escolares já chegaram! A entrega será feita na secretaria de segunda a sexta, das 8h às 17h.',
      destinatarios: ['TODAS'],
      dataCriacao: '2024-11-02',
      dataEnvio: '2024-11-02 09:30',
      criadoPor: 'Secretaria',
      visualizacoes: 120,
      confirmacoes: 98,
      total: 847,
      prioridade: 'MEDIA',
      status: 'ENVIADO',
      fixado: false
    },
    {
      id: 3,
      titulo: 'Feira de Ciências - Participação Obrigatória',
      tipo: 'EVENTO',
      conteudo: 'No dia 22/11 teremos nossa Feira de Ciências! Todos os alunos deverão apresentar seus projetos. Contamos com a presença dos pais!',
      destinatarios: ['3º Ano A', '3º Ano B', '4º Ano A', '5º Ano A'],
      dataCriacao: '2024-11-03',
      dataEnvio: '2024-11-03 14:00',
      criadoPor: 'Coordenação',
      visualizacoes: 65,
      confirmacoes: 45,
      total: 112,
      prioridade: 'ALTA',
      status: 'ENVIADO',
      fixado: true
    },
    {
      id: 4,
      titulo: 'Cardápio da Semana',
      tipo: 'INFORMATIVO',
      conteudo: 'Confira o cardápio desta semana: Segunda - Arroz, feijão e frango. Terça - Macarrão ao molho. Quarta - Arroz, feijão e peixe...',
      destinatarios: ['TODAS'],
      dataCriacao: '2024-11-04',
      dataEnvio: null,
      criadoPor: 'Nutrição',
      visualizacoes: 0,
      confirmacoes: 0,
      total: 847,
      prioridade: 'BAIXA',
      status: 'RASCUNHO',
      fixado: false
    },
    {
      id: 5,
      titulo: 'Feriado - Dia da Consciência Negra',
      tipo: 'FERIADO',
      conteudo: 'Informamos que no dia 20/11 (quarta-feira) não haverá aula devido ao feriado do Dia da Consciência Negra.',
      destinatarios: ['TODAS'],
      dataCriacao: '2024-11-05',
      dataEnvio: '2024-11-05 10:00',
      criadoPor: 'Direção',
      visualizacoes: 200,
      confirmacoes: 180,
      total: 847,
      prioridade: 'ALTA',
      status: 'ENVIADO',
      fixado: true
    }
  ];

  const avisosFiltrados = avisos.filter(aviso => 
    filtroTipo === 'TODOS' || aviso.tipo === filtroTipo
  );

  const getTipoColor = (tipo) => {
    const colors = {
      'REUNIAO': 'bg-blue-100 text-blue-800 border-blue-300',
      'EVENTO': 'bg-green-100 text-green-800 border-green-300',
      'ADMINISTRATIVO': 'bg-purple-100 text-purple-800 border-purple-300',
      'INFORMATIVO': 'bg-gray-100 text-gray-800 border-gray-300',
      'FERIADO': 'bg-orange-100 text-orange-800 border-orange-300',
      'URGENTE': 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[tipo] || colors.INFORMATIVO;
  };

  const getPrioridadeColor = (prioridade) => {
    const colors = {
      'ALTA': 'text-red-600',
      'MEDIA': 'text-yellow-600',
      'BAIXA': 'text-green-600'
    };
    return colors[prioridade] || colors.MEDIA;
  };

  const getStatusBadge = (status) => {
    const badges = {
      'ENVIADO': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Enviado' },
      'RASCUNHO': { bg: 'bg-gray-100', text: 'text-gray-800', icon: Clock, label: 'Rascunho' },
      'AGENDADO': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock, label: 'Agendado' }
    };
    const badge = badges[status] || badges.RASCUNHO;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  const handleEnviar = (aviso) => {
    console.log('Enviando aviso:', aviso.id);
    alert(`Aviso "${aviso.titulo}" enviado para ${aviso.total} destinatários!`);
  };

  const handleEditar = (aviso) => {
    console.log('Editando aviso:', aviso.id);
  };

  const handleExcluir = (aviso) => {
    if (confirm(`Deseja excluir o aviso "${aviso.titulo}"?`)) {
      console.log('Excluindo aviso:', aviso.id);
    }
  };

  const handleFixar = (aviso) => {
    console.log('Fixando/Desafixando aviso:', aviso.id);
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Filtrar por tipo:</span>
          <div className="flex flex-wrap gap-2">
            {['TODOS', 'REUNIAO', 'EVENTO', 'ADMINISTRATIVO', 'INFORMATIVO', 'FERIADO', 'URGENTE'].map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFiltroTipo(tipo)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filtroTipo === tipo
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Avisos */}
      <div className="space-y-4">
        {avisosFiltrados.map((aviso) => (
          <div
            key={aviso.id}
            className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md ${
              aviso.fixado ? 'border-2 border-pink-300' : ''
            }`}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {aviso.fixado && (
                      <Pin className="w-4 h-4 text-pink-600 fill-current" />
                    )}
                    <h3 className="text-lg font-bold text-gray-800">{aviso.titulo}</h3>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getTipoColor(aviso.tipo)}`}>
                      {aviso.tipo}
                    </span>
                    {getStatusBadge(aviso.status)}
                    <span className={`text-xs font-medium ${getPrioridadeColor(aviso.prioridade)}`}>
                      Prioridade: {aviso.prioridade}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleFixar(aviso)}
                    className={`p-2 rounded-lg transition-colors ${
                      aviso.fixado
                        ? 'text-pink-600 hover:bg-pink-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={aviso.fixado ? 'Desafixar' : 'Fixar'}
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditar(aviso)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleExcluir(aviso)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Conteúdo */}
              <p className="text-gray-700 mb-4 leading-relaxed">{aviso.conteudo}</p>

              {/* Destinatários */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Destinatários:</span>
                {aviso.destinatarios.map((dest, index) => (
                  <span key={index} className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {dest}
                  </span>
                ))}
              </div>

              {/* Estatísticas */}
              {aviso.status === 'ENVIADO' && (
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">{aviso.visualizacoes}</p>
                    <p className="text-xs text-gray-600">Visualizações</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${(aviso.visualizacoes / aviso.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">{aviso.confirmacoes}</p>
                    <p className="text-xs text-gray-600">Confirmações de Leitura</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-green-600 h-1.5 rounded-full"
                        style={{ width: `${(aviso.confirmacoes / aviso.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">
                      {((aviso.confirmacoes / aviso.total) * 100).toFixed(0)}%
                    </p>
                    <p className="text-xs text-gray-600">Taxa de Leitura</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-purple-600 h-1.5 rounded-full"
                        style={{ width: `${(aviso.confirmacoes / aviso.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Criado por {aviso.criadoPor}</span>
                  <span>•</span>
                  <span>{new Date(aviso.dataCriacao).toLocaleDateString('pt-BR')}</span>
                  {aviso.dataEnvio && (
                    <>
                      <span>•</span>
                      <span>Enviado em {aviso.dataEnvio}</span>
                    </>
                  )}
                </div>
                {aviso.status === 'RASCUNHO' && (
                  <button
                    onClick={() => handleEnviar(aviso)}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-medium"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Agora
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {avisosFiltrados.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhum aviso encontrado</h3>
          <p className="text-gray-600">Não há avisos para o filtro selecionado.</p>
        </div>
      )}
    </div>
  );
};

export default Avisos;