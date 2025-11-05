// src/pages/Financeiro/tabs/Inadimplencia.jsx

import React, { useState } from 'react';
import { AlertCircle, Send, Download, Eye, Phone, Mail, MessageSquare, Filter } from 'lucide-react';

const Inadimplencia = () => {
  const [filtroAtraso, setFiltroAtraso] = useState('TODOS');
  const [selectedInadimplentes, setSelectedInadimplentes] = useState([]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Dados mockados
  const resumo = {
    totalInadimplentes: 105,
    valorTotal: 18420.00,
    diasMediaAtraso: 12,
    taxaInadimplencia: 12.4
  };

  const inadimplentes = [
    {
      id: 4,
      aluno: 'Lucas Gabriel Ferreira',
      turma: '2º Ano A',
      responsavel: 'Fernanda Ferreira',
      telefone: '(11) 98765-4321',
      email: 'fernanda.ferreira@email.com',
      competencias: ['10/2024'],
      valorTotal: 850.00,
      diasAtraso: 25,
      ultimoContato: '2024-10-20',
      tipoContato: 'WhatsApp',
      status: 'EM_NEGOCIACAO'
    },
    {
      id: 6,
      aluno: 'Rafael dos Santos Lima',
      turma: '5º Ano C',
      responsavel: 'Patricia Lima',
      telefone: '(11) 97654-3210',
      email: 'patricia.lima@email.com',
      competencias: ['09/2024', '10/2024'],
      valorTotal: 1700.00,
      diasAtraso: 55,
      ultimoContato: '2024-10-15',
      tipoContato: 'Email',
      status: 'SEM_RETORNO'
    },
    {
      id: 7,
      aluno: 'Mariana Costa Oliveira',
      turma: '3º Ano B',
      responsavel: 'Roberto Costa',
      telefone: '(11) 96543-2109',
      email: 'roberto.costa@email.com',
      competencias: ['10/2024'],
      valorTotal: 850.00,
      diasAtraso: 18,
      ultimoContato: '2024-11-01',
      tipoContato: 'Telefone',
      status: 'PROMESSA_PAGAMENTO'
    },
    {
      id: 8,
      aluno: 'Gabriel Henrique Souza',
      turma: '4º Ano A',
      responsavel: 'Ana Souza',
      telefone: '(11) 95432-1098',
      email: 'ana.souza@email.com',
      competencias: ['08/2024', '09/2024', '10/2024'],
      valorTotal: 2550.00,
      diasAtraso: 85,
      ultimoContato: '2024-09-25',
      tipoContato: 'WhatsApp',
      status: 'INADIMPLENTE_CRONICO'
    }
  ];

  const filteredInadimplentes = inadimplentes.filter(i => {
    if (filtroAtraso === 'TODOS') return true;
    if (filtroAtraso === '1-15') return i.diasAtraso <= 15;
    if (filtroAtraso === '16-30') return i.diasAtraso > 15 && i.diasAtraso <= 30;
    if (filtroAtraso === '31-60') return i.diasAtraso > 30 && i.diasAtraso <= 60;
    if (filtroAtraso === '60+') return i.diasAtraso > 60;
    return true;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedInadimplentes(filteredInadimplentes.map(i => i.id));
    } else {
      setSelectedInadimplentes([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedInadimplentes.includes(id)) {
      setSelectedInadimplentes(selectedInadimplentes.filter(i => i !== id));
    } else {
      setSelectedInadimplentes([...selectedInadimplentes, id]);
    }
  };

  const handleEnviarEmMassa = () => {
    if (selectedInadimplentes.length === 0) {
      alert('Selecione pelo menos um inadimplente');
      return;
    }
    alert(`Enviando cobranças para ${selectedInadimplentes.length} responsáveis...`);
  };

  const getStatusBadge = (status) => {
    const badges = {
      'EM_NEGOCIACAO': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Em Negociação' },
      'SEM_RETORNO': { bg: 'bg-red-100', text: 'text-red-800', label: 'Sem Retorno' },
      'PROMESSA_PAGAMENTO': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Promessa' },
      'INADIMPLENTE_CRONICO': { bg: 'bg-red-200', text: 'text-red-900', label: 'Inadimplente Crônico' }
    };
    
    const badge = badges[status] || badges.SEM_RETORNO;
    
    return (
      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  const getSeverityColor = (dias) => {
    if (dias <= 15) return 'text-yellow-600 bg-yellow-100';
    if (dias <= 30) return 'text-orange-600 bg-orange-100';
    if (dias <= 60) return 'text-red-600 bg-red-100';
    return 'text-red-800 bg-red-200';
  };

  return (
    <div className="space-y-6">
      {/* Resumo de Inadimplência */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Gestão de Inadimplência</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Total de Inadimplentes</p>
                <p className="text-2xl font-bold text-gray-800">{resumo.totalInadimplentes}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(resumo.valorTotal)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Média de Atraso</p>
                <p className="text-2xl font-bold text-gray-800">{resumo.diasMediaAtraso} dias</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Taxa de Inadimplência</p>
                <p className="text-2xl font-bold text-gray-800">{resumo.taxaInadimplencia}%</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleEnviarEmMassa}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Send className="w-4 h-4" />
                Enviar Cobranças em Massa ({selectedInadimplentes.length})
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                <Download className="w-4 h-4" />
                Exportar Lista
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                <MessageSquare className="w-4 h-4" />
                Enviar SMS em Massa
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2">
            <button
              onClick={() => setFiltroAtraso('TODOS')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroAtraso === 'TODOS'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todos ({inadimplentes.length})
            </button>
            <button
              onClick={() => setFiltroAtraso('1-15')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroAtraso === '1-15'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              1-15 dias
            </button>
            <button
              onClick={() => setFiltroAtraso('16-30')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroAtraso === '16-30'
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              16-30 dias
            </button>
            <button
              onClick={() => setFiltroAtraso('31-60')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroAtraso === '31-60'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              31-60 dias
            </button>
            <button
              onClick={() => setFiltroAtraso('60+')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroAtraso === '60+'
                  ? 'bg-red-200 text-red-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Acima de 60 dias
            </button>
          </div>
        </div>
      </div>

      {/* Tabela de Inadimplentes */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedInadimplentes.length === filteredInadimplentes.length && filteredInadimplentes.length > 0}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Aluno / Responsável
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Competências
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Valor Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Atraso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Último Contato
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInadimplentes.map((inadimplente) => (
                <tr key={inadimplente.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedInadimplentes.includes(inadimplente.id)}
                      onChange={() => handleSelectOne(inadimplente.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{inadimplente.aluno}</div>
                      <div className="text-xs text-gray-500">{inadimplente.responsavel}</div>
                      <div className="text-xs text-gray-500">{inadimplente.turma}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Phone className="w-3 h-3" />
                        {inadimplente.telefone}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                        <Mail className="w-3 h-3" />
                        {inadimplente.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {inadimplente.competencias.map((comp, idx) => (
                        <span key={idx} className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-red-600">
                      {formatCurrency(inadimplente.valorTotal)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(inadimplente.diasAtraso)}`}>
                      {inadimplente.diasAtraso} dias
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(inadimplente.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      {new Date(inadimplente.ultimoContato).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-xs text-gray-400">
                      via {inadimplente.tipoContato}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver Detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-orange-600 hover:text-orange-900 p-2 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Enviar Cobrança"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors"
                        title="Ligar"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-teal-600 hover:text-teal-900 p-2 hover:bg-teal-50 rounded-lg transition-colors"
                        title="WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inadimplencia;