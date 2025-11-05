// src/pages/Financeiro/components/TabelaMensalidades.jsx

import React, { useState } from 'react';
import { Eye, Send, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

const TabelaMensalidades = ({ 
  mensalidades, 
  totalMensalidades,
  onViewDetalhes, 
  onEnviarCobranca, 
  onBaixarBoleto 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Paginação
  const totalPages = Math.ceil(mensalidades.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMensalidades = mensalidades.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aluno / Responsável
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Turma
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Competência
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vencimento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMensalidades.map((mensalidade) => (
              <tr key={mensalidade.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{mensalidade.aluno}</div>
                    <div className="text-xs text-gray-500">{mensalidade.responsavel}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{mensalidade.turma}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{mensalidade.competencia}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    {mensalidade.desconto > 0 && (
                      <div className="text-xs text-gray-500 line-through">
                        {formatCurrency(mensalidade.valor)}
                      </div>
                    )}
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(mensalidade.valorFinal)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(mensalidade.vencimento)}</div>
                  {mensalidade.diasAtraso && (
                    <div className="text-xs text-red-600 font-medium">
                      {mensalidade.diasAtraso} dias de atraso
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={mensalidade.status} />
                  {mensalidade.formaPagamento && (
                    <div className="text-xs text-gray-500 mt-1">
                      via {mensalidade.formaPagamento}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => onViewDetalhes(mensalidade)}
                      className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver Detalhes"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {mensalidade.status !== 'PAGO' && (
                      <>
                        <button 
                          onClick={() => onEnviarCobranca(mensalidade.id)}
                          className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors"
                          title="Enviar Cobrança"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => onBaixarBoleto(mensalidade.id)}
                          className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                          title="Baixar Boleto"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{startIndex + 1}</span> a{' '}
            <span className="font-medium">{Math.min(endIndex, mensalidades.length)}</span> de{' '}
            <span className="font-medium">{mensalidades.length}</span> resultados
            {totalMensalidades !== mensalidades.length && (
              <span className="text-gray-500"> (filtrado de {totalMensalidades} total)</span>
            )}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNumber = i + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => goToPage(pageNumber)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-white'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabelaMensalidades;