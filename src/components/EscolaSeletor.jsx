// src/components/EscolaSeletor.jsx
import React from 'react';
import { useEscola } from '../contexts/EscolaContext';
import { Building2, ChevronDown } from 'lucide-react';

const EscolaSeletor = () => {
  const { escolaAtiva, setEscolaAtiva, escolas, escolaAtual } = useEscola();

  if (escolas.length <= 1) return null; // Ocultar se só tem 1 escola

  return (
    <div className="relative">
      <select
        value={escolaAtiva || ''}
        onChange={(e) => setEscolaAtiva(e.target.value)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors appearance-none pr-10"
      >
        {escolas.map(escola => (
          <option key={escola.id} value={escola.id}>
            {escola.nome}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default EscolaSeletor;