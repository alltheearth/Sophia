// src/pages/Turmas/components/FiltrosTurmas.jsx

import React from 'react';
import { Search, Filter } from 'lucide-react';

const FiltrosTurmas = ({ filtros, onFiltrosChange }) => {
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
        {/* Busca */}
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por turma ou professor..."
              value={filtros.searchTerm}
              onChange={(e) => handleChange('searchTerm', e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
        
        {/* Série */}
        <select 
          value={filtros.serie}
          onChange={(e) => handleChange('serie', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
        >
          <option value="TODAS">Todas as Séries</option>
          <option value="1º Ano">1º Ano</option>
          <option value="2º Ano">2º Ano</option>
          <option value="3º Ano">3º Ano</option>
          <option value="4º Ano">4º Ano</option>
          <option value="5º Ano">5º Ano</option>
          <option value="6º Ano">6º Ano</option>
          <option value="7º Ano">7º Ano</option>
          <option value="8º Ano">8º Ano</option>
          <option value="9º Ano">9º Ano</option>
        </select>

        {/* Turno */}
        <select 
          value={filtros.turno}
          onChange={(e) => handleChange('turno', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
        >
          <option value="TODOS">Todos os Turnos</option>
          <option value="MATUTINO">Matutino</option>
          <option value="VESPERTINO">Vespertino</option>
          <option value="NOTURNO">Noturno</option>
          <option value="INTEGRAL">Integral</option>
        </select>

        {/* Ano Letivo */}
        <select 
          value={filtros.anoLetivo}
          onChange={(e) => handleChange('anoLetivo', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>
    </div>
  );
};

export default FiltrosTurmas;