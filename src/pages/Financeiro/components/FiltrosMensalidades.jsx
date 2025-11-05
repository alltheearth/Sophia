// src/pages/Financeiro/components/FiltrosMensalidades.jsx

import React from 'react';
import { Search } from 'lucide-react';

const FiltrosMensalidades = ({
  filterStatus,
  onFilterStatusChange,
  filterTurma,
  onFilterTurmaChange,
  filterMes,
  onFilterMesChange,
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex flex-wrap gap-4">
        {/* Busca */}
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por aluno, responsável ou turma..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Filtro de Status */}
        <select 
          value={filterStatus}
          onChange={(e) => onFilterStatusChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="TODOS">Todos os Status</option>
          <option value="PAGO">Pago</option>
          <option value="PENDENTE">Pendente</option>
          <option value="ATRASADO">Atrasado</option>
          <option value="CANCELADO">Cancelado</option>
        </select>

        {/* Filtro de Turma */}
        <select 
          value={filterTurma}
          onChange={(e) => onFilterTurmaChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="TODAS">Todas as Turmas</option>
          <option value="1-ANO">1º Ano</option>
          <option value="2-ANO">2º Ano</option>
          <option value="3-ANO">3º Ano</option>
          <option value="4-ANO">4º Ano</option>
          <option value="5-ANO">5º Ano</option>
        </select>

        {/* Filtro de Mês */}
        <input
          type="month"
          value={filterMes}
          onChange={(e) => onFilterMesChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>
    </div>
  );
};

export default FiltrosMensalidades;