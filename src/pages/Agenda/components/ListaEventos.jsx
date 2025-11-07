// src/pages/Agenda/components/ListaEventos.jsx

import React, { useState } from 'react';
import { Eye, Edit, Calendar, Clock, MapPin, Users, ChevronDown, ChevronUp } from 'lucide-react';

const ListaEventos = ({ eventos, onVerDetalhes, onEditar, compact = false }) => {
  const [eventoExpandido, setEventoExpandido] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      weekday: compact ? 'short' : 'long', 
      year: 'numeric', 
      month: compact ? 'short' : 'long', 
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

  // Mostrar apenas os próximos eventos no modo compacto
  const datasExibir = compact ? datasOrdenadas.slice(0, 5) : datasOrdenadas;

  return (
    <div className={`space-y-${compact ? '3' : '6'} ${compact ? 'h-full overflow-auto' : ''}`}>
      {datasExibir.map((data) => (
        <div key={data} className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header da Data */}
          <div className={`bg-gradient-to-r from-orange-500 to-red-500 text-white px-${compact ? '3' : '6'} py-${compact ? '2' : '3'}`}>
            <div className="flex items-center gap-2">
              <Calendar className={`w-${compact ? '4' : '5'} h-${compact ? '4' : '5'}`} />
              <h3 className={`font-bold ${compact ? 'text-sm' : 'text-lg'}`}>{formatDate(data)}</h3>
              <span className={`ml-auto bg-white/20 px-${compact ? '2' : '3'} py-1 rounded-full text-xs`}>
                {eventosAgrupados[data].length} {eventosAgrupados[data].length === 1 ? 'evento' : 'eventos'}
              </span>
            </div>
          </div>

          {/* Lista de Eventos */}
          <div className="divide-y divide-gray-200">
            {eventosAgrupados[data].map((evento) => (
              <div key={evento.id} className={`p-${compact ? '3' : '6'} hover:bg-gray-50 transition-colors`}>
                <div className="flex items-start gap-3">
                  {/* Indicador de Tipo */}
                  <div className={`w-1.5 ${compact ? 'h-12' : 'h-full'} ${getTipoIcon(evento.tipo)} rounded-full flex-shrink-0`}></div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className={`${compact ? 'text-sm' : 'text-lg'} font-bold text-gray-800 truncate`}>{evento.titulo}</h4>
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${getTipoColor(evento.tipo)}`}>
                            {evento.tipo}
                          </span>
                          {getStatusBadge(evento.status)}
                        </div>

                        <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'} gap-${compact ? '1' : '4'} text-xs`}>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{evento.horaInicio} - {evento.horaFim}</span>
                          </div>
                          {!compact && (
                            <>
                              <div className="flex items-center gap-1.5 text-gray-600">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{evento.local}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-gray-600">
                                <Users className="w-3.5 h-3.5" />
                                <span>{evento.participantes} participantes</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-gray-600">
                                <Users className="w-3.5 h-3.5" />
                                <span>{evento.responsavel}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-1.5 ml-3">
                        <button
                          onClick={() => onVerDetalhes(evento)}
                          className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Ver Detalhes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {!compact && (
                          <>
                            <button
                              onClick={() => onEditar(evento)}
                              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toggleExpand(evento.id)}
                              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title={eventoExpandido === evento.id ? 'Recolher' : 'Expandir'}
                            >
                              {eventoExpandido === evento.id ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Turmas */}
                    {!compact && evento.turmas && evento.turmas.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {evento.turmas.map((turma, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px]"
                          >
                            {turma}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Descrição Expandida */}
                    {!compact && eventoExpandido === evento.id && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <h5 className="font-medium text-gray-800 mb-1.5 text-sm">Descrição:</h5>
                        <p className="text-gray-600 text-xs leading-relaxed">
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

      {compact && datasOrdenadas.length > 5 && (
        <div className="text-center py-3 bg-white rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">
            +{datasOrdenadas.length - 5} dias com eventos
          </p>
        </div>
      )}

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