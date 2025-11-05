// src/pages/Financeiro/modals/GerarMensalidades.jsx

import React, { useState } from 'react';
import { X } from 'lucide-react';

const GerarMensalidadesModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    competencia: '2024-12',
    selecao: 'escola',
    turmaId: '',
    valorBase: '850.00',
    dataVencimento: '2024-12-10'
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar chamada à API
    console.log('Gerar mensalidades:', formData);
    alert('Mensalidades geradas com sucesso!');
    onClose();
  };

  const totalAlunos = 847;
  const valorTotal = totalAlunos * parseFloat(formData.valorBase);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Gerar Mensalidades em Lote</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Competência */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Competência *
            </label>
            <input
              type="month"
              value={formData.competencia}
              onChange={(e) => setFormData({ ...formData, competencia: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Seleção */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecionar *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="selecao" 
                  value="escola" 
                  checked={formData.selecao === 'escola'}
                  onChange={(e) => setFormData({ ...formData, selecao: e.target.value })}
                  className="mr-2" 
                />
                <span className="text-sm">Toda a escola</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="selecao" 
                  value="turma"
                  checked={formData.selecao === 'turma'}
                  onChange={(e) => setFormData({ ...formData, selecao: e.target.value })}
                  className="mr-2" 
                />
                <span className="text-sm">Por turma</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="selecao" 
                  value="individual"
                  checked={formData.selecao === 'individual'}
                  onChange={(e) => setFormData({ ...formData, selecao: e.target.value })}
                  className="mr-2" 
                />
                <span className="text-sm">Individual</span>
              </label>
            </div>
          </div>

          {/* Turma (se selecionado) */}
          {formData.selecao === 'turma' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecione a Turma *
              </label>
              <select
                value={formData.turmaId}
                onChange={(e) => setFormData({ ...formData, turmaId: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione...</option>
                <option value="1">1º Ano A</option>
                <option value="2">1º Ano B</option>
                <option value="3">2º Ano A</option>
                <option value="4">3º Ano B</option>
                <option value="5">5º Ano C</option>
              </select>
            </div>
          )}

          {/* Valor Base */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Base *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                R$
              </span>
              <input
                type="text"
                value={formData.valorBase}
                onChange={(e) => setFormData({ ...formData, valorBase: e.target.value })}
                required
                placeholder="850,00"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Descontos individuais podem ser aplicados posteriormente
            </p>
          </div>

          {/* Data de Vencimento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data de Vencimento *
            </label>
            <input
              type="date"
              value={formData.dataVencimento}
              onChange={(e) => setFormData({ ...formData, dataVencimento: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Resumo */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Resumo da Geração</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <p>• Total de alunos: <span className="font-medium">{totalAlunos}</span></p>
              <p>• Valor total: <span className="font-medium">{formatCurrency(valorTotal)}</span></p>
              <p>• Boletos serão gerados automaticamente via Asaas</p>
              <p>• Responsáveis receberão email com o boleto</p>
            </div>
          </div>

          {/* Configurações Adicionais */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-800 mb-3">Configurações Adicionais</h4>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">Enviar email automático com boleto</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">Gerar QR Code PIX</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Aplicar multa de 2% após vencimento</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Aplicar juros de 1% ao mês</span>
              </label>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Gerar Mensalidades
          </button>
        </div>
      </div>
    </div>
  );
};

export default GerarMensalidadesModal;