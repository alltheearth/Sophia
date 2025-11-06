// src/pages/Agenda/components/ListaEventos.jsx

import React, { useState } from 'react';
import { Eye, Edit, Calendar, Clock, MapPin, Users, ChevronDown, ChevronUp } from 'lucide-react';

const ListaEventos = ({ eventos, onVerDetalhes, onEditar }) => {
  const [eventoExpandido, setEventoExpandido] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTipoColor = (tipo) => {
    const colors = {
      'REUNIAO': 'bg-blue-100 text-blue-800 border-blue-300',
      'PROVA': 'bg-red-100 text-red-800 border-red-300',
      'EVENTO': 'bg-green-100 text-green-800 border-green-300',
      'FERIADO': 'bg-gray-100 text-gray-800 border-gray-300',
      'ADMINISTRATIVO': 'bg-orange-100 text-orange-800 border-orange-300',
      'CULTURAL': 'bg-purple-100 text-purple-800 border-purple-300',
      'ESPORTIVO': 'bg-teal-100 text-teal-800 border-teal-300'
    };
    return colors[tipo] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getTipoIcon = (tipo) => {
    const colors = {
      'REUNIAO': 'bg-blue-500',
      'PROVA': 'bg-red-500',
      'EVENTO': 'bg-green-500',
      'FERIADO': 'bg-gray-500',
      'ADMINISTRATIVO': 'bg-orange-500',
      'CULTURAL': 'bg-purple-500',
      'ESPORTIVO': 'bg-teal-500'
    };
    return colors[tipo] || 'bg-gray-500';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'AGENDADO': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Agendado' },
      'CONFIRMADO': { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmado' },
      'CANCELADO': { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelado' },
      'REALIZADO': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Realizado' }
    };
    const badge = badges[status] || badges.AGENDADO;
    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  const toggleExpand = (eventoId) => {
    setEventoExpandido(eventoExpandido === eventoId ? null : eventoId);
  };

  // Agrupar eventos por data
  const eventosAgrupados = eventos.reduce((acc, evento) => {
    const data = evento.data;
    if (!acc[data]) {
      acc[data] = [];
    }
    acc[data].push(evento);
    return acc;
  }, {});

  // Ordenar datas
  const datasOrdenadas = Object.keys(eventosAgrupados).sort();

  return (
    <div className="space-y-6">
      {datasOrdenadas.map((data) => (
        <div key={data} className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header da Data */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <h3 className="font-bold text-lg">{formatDate(data)}</h3>
              <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm">
                {eventosAgrupados[data].length} {eventosAgrupados[data].length === 1 ? 'evento' : 'eventos'}
              </span>
            </div>
          </div>

          {/* Lista de Eventos */}
          <div className="divide-y divide-gray-200">
            {eventosAgrupados[data].map((evento) => (
              <div key={evento.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Indicador de Tipo */}
                  <div className={`w-2 h-full ${getTipoIcon(evento.tipo)} rounded-full flex-shrink-0`}></div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-800">{evento.titulo}</h4>
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getTipoColor(evento.tipo)}`}>
                            {evento.tipo}
                          </span>
                          {getStatusBadge(evento.status)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{evento.horaInicio} - {evento.horaFim}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{evento.local}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{evento.participantes} participantes</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{evento.responsavel}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => onVerDetalhes(evento)}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Ver Detalhes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditar(evento)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleExpand(evento.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title={eventoExpandido === evento.id ? 'Recolher' : 'Expandir'}
                        >
                          {eventoExpandido === evento.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Turmas */}
                    {evento.turmas && evento.turmas.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {evento.turmas.map((turma, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {turma}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Descrição Expandida */}
                    {eventoExpandido === evento.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h5 className="font-medium text-gray-800 mb-2">Descrição:</h5>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {evento.descricao}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {eventos.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhum evento encontrado</h3>
          <p className="text-gray-600">
            Não há eventos para os filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
};

export default ListaEventos;