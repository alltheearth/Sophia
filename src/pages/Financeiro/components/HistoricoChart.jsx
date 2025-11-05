// src/pages/Financeiro/components/HistoricoChart.jsx

import React, { useState } from 'react';

const HistoricoChart = ({ data }) => {
  const [periodo, setPeriodo] = useState('6');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const maxValor = Math.max(...data.map(h => h.valor));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">Histórico de Recebimentos</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setPeriodo('6')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              periodo === '6' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            6 meses
          </button>
          <button 
            onClick={() => setPeriodo('12')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              periodo === '12' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            12 meses
          </button>
          <button 
            onClick={() => setPeriodo('ano')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              periodo === 'ano' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Ano
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = (item.valor / maxValor) * 100;
          
          return (
            <div key={index} className="flex items-center gap-4">
              <div className="w-20 text-sm text-gray-600 font-medium">
                {item.mes}
              </div>
              <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden group cursor-pointer">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-500 hover:from-blue-600 hover:to-blue-700"
                  style={{ width: `${percentage}%` }}
                >
                  <span className="text-white text-xs font-medium">
                    {item.mensalidades}
                  </span>
                </div>
                {/* Tooltip on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full">
                  <span className="text-white text-xs font-medium">
                    {item.mensalidades} mensalidades
                  </span>
                </div>
              </div>
              <div className="w-32 text-right text-sm font-medium text-gray-800">
                {formatCurrency(item.valor)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Recebimentos mensais</span>
        </div>
        <div>
          Média: <span className="font-medium text-gray-800">
            {formatCurrency(data.reduce((acc, curr) => acc + curr.valor, 0) / data.length)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HistoricoChart;