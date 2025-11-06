// src/pages/Notas/components/FiltrosNotas.jsx

import React from 'react';
import { Search, Filter } from 'lucide-react';

const FiltrosNotas = ({ filtros, onFiltrosChange }) => {
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
        {/* Turma */}
        <select 
          value={filtros.turma}
          onChange={(e) => handleChange('turma', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="">Todas as Turmas</option>
          <option value="5º Ano A">5º Ano A</option>
          <option value="5º Ano B">5º Ano B</option>
          <option value="4º Ano C">4º Ano C</option>
          <option value="3º Ano A">3º Ano A</option>
          <option value="2º Ano A">2º Ano A</option>
        </select>

        {/* Disciplina */}
        <select 
          value={filtros.disciplina}
          onChange={(e) => handleChange('disciplina', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="">Todas as Disciplinas</option>
          <option value="Matemática">Matemática</option>
          <option value="Português">Português</option>
          <option value="Ciências">Ciências</option>
          <option value="História">História</option>
          <option value="Geografia">Geografia</option>
          <option value="Física">Física</option>
          <option value="Educação Física">Educação Física</option>
          <option value="Artes">Artes</option>
        </select>

        {/* Período */}
        <select 
          value={filtros.periodo}
          onChange={(e) => handleChange('periodo', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="1º Bimestre">1º Bimestre</option>
          <option value="2º Bimestre">2º Bimestre</option>
          <option value="3º Bimestre">3º Bimestre</option>
          <option value="4º Bimestre">4º Bimestre</option>
        </select>

        {/* Ano Letivo */}
        <select 
          value={filtros.anoLetivo}
          onChange={(e) => handleChange('anoLetivo', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>
    </div>
  );
};

export default FiltrosNotas;