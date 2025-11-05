// src/pages/Professores/components/FiltrosProfessores.jsx

import React from 'react';
import { Search, Filter } from 'lucide-react';

const FiltrosProfessores = ({ filtros, onFiltrosChange }) => {
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
              placeholder="Buscar por nome, email ou disciplina..."
              value={filtros.searchTerm}
              onChange={(e) => handleChange('searchTerm', e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        
        {/* Status */}
        <select 
          value={filtros.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
        >
          <option value="TODOS">Todos os Status</option>
          <option value="ATIVO">Ativos</option>
          <option value="FERIAS">Em Férias</option>
          <option value="LICENCA">Em Licença</option>
          <option value="AFASTADO">Afastados</option>
        </select>

        {/* Disciplina */}
        <select 
          value={filtros.disciplina}
          onChange={(e) => handleChange('disciplina', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
        >
          <option value="TODAS">Todas as Disciplinas</option>
          <option value="Matemática">Matemática</option>
          <option value="Português">Português</option>
          <option value="História">História</option>
          <option value="Geografia">Geografia</option>
          <option value="Ciências">Ciências</option>
          <option value="Física">Física</option>
          <option value="Química">Química</option>
          <option value="Educação Física">Educação Física</option>
          <option value="Artes">Artes</option>
          <option value="Inglês">Inglês</option>
        </select>

        {/* Turno */}
        <select 
          value={filtros.turno}
          onChange={(e) => handleChange('turno', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
        >
          <option value="TODOS">Todos os Turnos</option>
          <option value="MATUTINO">Matutino</option>
          <option value="VESPERTINO">Vespertino</option>
          <option value="NOTURNO">Noturno</option>
          <option value="INTEGRAL">Integral</option>
        </select>
      </div>
    </div>
  );
};

export default FiltrosProfessores;