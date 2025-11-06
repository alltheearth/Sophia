// src/pages/Agenda/components/CalendarioView.jsx

import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const CalendarioView = ({ eventos, mesAtual, onMesChange, onEventoClick }) => {
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const primeiroDiaMes = new Date(mesAtual.getFullYear(), mesAtual.getMonth(), 1);
  const ultimoDiaMes = new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 0);
  const diasNoMes = ultimoDiaMes.getDate();
  const primeiroDiaSemana = primeiroDiaMes.getDay();

  const mesAnterior = () => {
    const novaData = new Date(mesAtual);
    novaData.setMonth(novaData.getMonth() - 1);
    onMesChange(novaData);
  };

  const proximoMes = () => {
    const novaData = new Date(mesAtual);
    novaData.setMonth(novaData.getMonth() + 1);
    onMesChange(novaData);
  };

  const voltarHoje = () => {
    onMesChange(new Date());
  };

  const getEventosDoDia = (dia) => {
    const dataFormatada = `${mesAtual.getFullYear()}-${String(mesAtual.getMonth() + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    return eventos.filter(evento => evento.data === dataFormatada);
  };

  const ehHoje = (dia) => {
    const hoje = new Date();
    return (
      dia === hoje.getDate() &&
      mesAtual.getMonth() === hoje.getMonth() &&
      mesAtual.getFullYear() === hoje.getFullYear()
    );
  };

  const getTipoColor = (tipo) => {
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

  const dias = [];
  for (let i = 0; i < primeiroDiaSemana; i++) {
    dias.push(null);
  }
  for (let dia = 1; dia <= diasNoMes; dia++) {
    dias.push(dia);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header do Calendário */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={mesAnterior}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {meses[mesAtual.getMonth()]} {mesAtual.getFullYear()}
            </h2>
            <button
              onClick={proximoMes}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <button
            onClick={voltarHoje}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Hoje
          </button>
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Reunião</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">Prova</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Evento</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded"></div>
            <span className="text-gray-600">Feriado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-gray-600">Administrativo</span>
          </div>
        </div>
      </div>

      {/* Grid do Calendário */}
      <div className="p-6">
        {/* Dias da Semana */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {diasSemana.map((dia, index) => (
            <div
              key={index}
              className={`text-center text-sm font-semibold py-2 ${
                index === 0 || index === 6 ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              {dia}
            </div>
          ))}
        </div>

        {/* Dias do Mês */}
        <div className="grid grid-cols-7 gap-2">
          {dias.map((dia, index) => {
            if (dia === null) {
              return <div key={`empty-${index}`} className="aspect-square"></div>;
            }

            const eventosDoDia = getEventosDoDia(dia);
            const isHoje = ehHoje(dia);
            const isDomingo = index % 7 === 0;
            const isSabado = index % 7 === 6;

            return (
              <div
                key={dia}
                className={`aspect-square border-2 rounded-lg p-2 transition-all hover:shadow-md cursor-pointer ${
                  isHoje
                    ? 'border-orange-500 bg-orange-50'
                    : eventosDoDia.length > 0
                      ? 'border-gray-300 bg-white hover:border-orange-300'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                } ${(isDomingo || isSabado) && !isHoje ? 'bg-red-50' : ''}`}
              >
                <div className="flex flex-col h-full">
                  <span
                    className={`text-sm font-medium mb-1 ${
                      isHoje
                        ? 'text-orange-600 font-bold'
                        : isDomingo || isSabado
                          ? 'text-red-600'
                          : 'text-gray-700'
                    }`}
                  >
                    {dia}
                  </span>
                  <div className="flex-1 overflow-y-auto space-y-1">
                    {eventosDoDia.slice(0, 3).map((evento) => (
                      <div
                        key={evento.id}
                        onClick={() => onEventoClick(evento)}
                        className={`${getTipoColor(evento.tipo)} text-white text-xs px-2 py-1 rounded truncate hover:opacity-80 transition-opacity cursor-pointer`}
                        title={evento.titulo}
                      >
                        {evento.titulo}
                      </div>
                    ))}
                    {eventosDoDia.length > 3 && (
                      <div className="text-xs text-gray-500 text-center font-medium">
                        +{eventosDoDia.length - 3} mais
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resumo do Mês */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-orange-600">{eventos.length}</p>
            <p className="text-xs text-gray-600 mt-1">Eventos no Mês</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {eventos.filter(e => e.tipo === 'REUNIAO').length}
            </p>
            <p className="text-xs text-gray-600 mt-1">Reuniões</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">
              {eventos.filter(e => e.tipo === 'PROVA').length}
            </p>
            <p className="text-xs text-gray-600 mt-1">Provas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {eventos.filter(e => e.tipo === 'EVENTO').length}
            </p>
            <p className="text-xs text-gray-600 mt-1">Eventos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarioView;