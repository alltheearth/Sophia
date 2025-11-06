// src/pages/Agenda/components/FiltrosAgenda.jsx

import React from 'react';
import { Filter } from 'lucide-react';

const FiltrosAgenda = ({ filtros, onFiltrosChange }) => {
  const handleChange = (field, value) => {
    onFiltrosChange({
      ...filtros,
      [field]: value
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-400" />
        <h3 className="font-medium text-gray-800">Filtros</h3>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {/* Tipo de Evento */}
        <select 
          value={filtros.tipo}
          onChange={(e) => handleChange('tipo', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        >
          <option value="TODOS">Todos os Tipos</option>
          <option value="REUNIAO">Reuniões</option>
          <option value="PROVA">Provas</option>
          <option value="EVENTO">Eventos</option>
          <option value="FERIADO">Feriados</option>
          <option value="ADMINISTRATIVO">Administrativo</option>
          <option value="CULTURAL">Cultural</option>
          <option value="ESPORTIVO">Esportivo</option>
        </select>

        {/* Turma */}
        <select 
          value={filtros.turma}
          onChange={(e) => handleChange('turma', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        >
          <option value="TODAS">Todas as Turmas</option>
          <option value="1º Ano A">1º Ano A</option>
          <option value="2º Ano A">2º Ano A</option>
          <option value="3º Ano B">3º Ano B</option>
          <option value="4º Ano C">4º Ano C</option>
          <option value="5º Ano A">5º Ano A</option>
          <option value="5º Ano B">5º Ano B</option>
          <option value="5º Ano C">5º Ano C</option>
        </select>

        {/* Status */}
        <select 
          value={filtros.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        >
          <option value="TODOS">Todos os Status</option>
          <option value="AGENDADO">Agendado</option>
          <option value="CONFIRMADO">Confirmado</option>
          <option value="CANCELADO">Cancelado</option>
          <option value="REALIZADO">Realizado</option>
        </select>
      </div>
    </div>
  );
};

export default FiltrosAgenda;