// src/pages/Financeiro/tabs/Relatorios.jsx

import React, { useState } from 'react';
import { FileText, AlertCircle, DollarSign, Users, BarChart3, Calendar, TrendingUp, Download, Filter } from 'lucide-react';

const Relatorios = () => {
  const [showFiltros, setShowFiltros] = useState(false);
  const [filtros, setFiltros] = useState({
    dataInicio: '2024-01-01',
    dataFim: '2024-12-31',
    turma: 'TODAS',
    formato: 'PDF'
  });

  const relatorios = [
    {
      id: 1,
      titulo: 'Relatório de Recebimentos',
      descricao: 'Detalhamento completo de todos os pagamentos recebidos no período selecionado',
      icon: FileText,
      color: 'blue',
      categoria: 'Financeiro',
      campos: [
        'Aluno e responsável',
        'Data de pagamento',
        'Forma de pagamento',
        'Valor recebido',
        'Descontos aplicados',
        'Total por período'
      ]
    },
    {
      id: 2,
      titulo: 'Relatório de Inadimplência',
      descricao: 'Lista detalhada de alunos com pagamentos em atraso, dias de atraso e valor devido',
      icon: AlertCircle,
      color: 'red',
      categoria: 'Cobrança',
      campos: [
        'Lista de inadimplentes',
        'Dias de atraso',
        'Valor em aberto',
        'Histórico de contatos',
        'Status da negociação'
      ]
    },
    {
      id: 3,
      titulo: 'Fluxo de Caixa',
      descricao: 'Análise detalhada de entradas e saídas mensais com projeções futuras',
      icon: DollarSign,
      color: 'green',
      categoria: 'Financeiro',
      campos: [
        'Receitas mensais',
        'Despesas',
        'Saldo do período',
        'Gráficos de tendência',
        'Comparativo mensal'
      ]
    },
    {
      id: 4,
      titulo: 'Relatório por Turma',
      descricao: 'Análise financeira segmentada por turma, incluindo taxa de pagamento e inadimplência',
      icon: Users,
      color: 'purple',
      categoria: 'Análise',
      campos: [
        'Dados por turma',
        'Taxa de adimplência',
        'Receita por turma',
        'Comparativo entre turmas',
        'Alunos inadimplentes'
      ]
    },
    {
      id: 5,
      titulo: 'Análise Anual',
      descricao: 'Comparativo de desempenho financeiro anual com métricas e indicadores',
      icon: BarChart3,
      color: 'orange',
      categoria: 'Análise',
      campos: [
        'Receita anual',
        'Evolução mensal',
        'Taxa de inadimplência',
        'Comparativo com anos anteriores',
        'Métricas de performance'
      ]
    },
    {
      id: 6,
      titulo: 'Previsão de Recebimentos',
      descricao: 'Projeção de valores a receber nos próximos meses baseada em mensalidades geradas',
      icon: Calendar,
      color: 'teal',
      categoria: 'Planejamento',
      campos: [
        'Mensalidades a vencer',
        'Projeção de receita',
        'Vencimentos por período',
        'Taxa esperada de recebimento',
        'Calendário financeiro'
      ]
    },
    {
      id: 7,
      titulo: 'Descontos e Bolsas',
      descricao: 'Relatório de todos os descontos e bolsas concedidos no período',
      icon: TrendingUp,
      color: 'indigo',
      categoria: 'Financeiro',
      campos: [
        'Lista de beneficiários',
        'Tipo de desconto',
        'Valor do desconto',
        'Impacto na receita',
        'Total de descontos'
      ]
    },
    {
      id: 8,
      titulo: 'Formas de Pagamento',
      descricao: 'Análise das formas de pagamento utilizadas pelos responsáveis',
      icon: DollarSign,
      color: 'cyan',
      categoria: 'Análise',
      campos: [
        'Distribuição por forma',
        'PIX vs Boleto vs Cartão',
        'Tempo médio de pagamento',
        'Preferências por período',
        'Gráficos comparativos'
      ]
    }
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100',
      icon: 'bg-blue-500',
      text: 'text-blue-700',
      hover: 'hover:border-blue-300'
    },
    red: {
      bg: 'bg-red-100',
      icon: 'bg-red-500',
      text: 'text-red-700',
      hover: 'hover:border-red-300'
    },
    green: {
      bg: 'bg-green-100',
      icon: 'bg-green-500',
      text: 'text-green-700',
      hover: 'hover:border-green-300'
    },
    purple: {
      bg: 'bg-purple-100',
      icon: 'bg-purple-500',
      text: 'text-purple-700',
      hover: 'hover:border-purple-300'
    },
    orange: {
      bg: 'bg-orange-100',
      icon: 'bg-orange-500',
      text: 'text-orange-700',
      hover: 'hover:border-orange-300'
    },
    teal: {
      bg: 'bg-teal-100',
      icon: 'bg-teal-500',
      text: 'text-teal-700',
      hover: 'hover:border-teal-300'
    },
    indigo: {
      bg: 'bg-indigo-100',
      icon: 'bg-indigo-500',
      text: 'text-indigo-700',
      hover: 'hover:border-indigo-300'
    },
    cyan: {
      bg: 'bg-cyan-100',
      icon: 'bg-cyan-500',
      text: 'text-cyan-700',
      hover: 'hover:border-cyan-300'
    }
  };

  const handleGerarRelatorio = (relatorio) => {
    console.log('Gerar relatório:', relatorio.titulo, filtros);
    alert(`Gerando ${relatorio.titulo}...\nPeríodo: ${filtros.dataInicio} a ${filtros.dataFim}\nFormato: ${filtros.formato}`);
  };

  return (
    <div className="space-y-6">
      {/* Header com Filtros */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Relatórios Financeiros</h3>
            <p className="text-sm text-gray-600 mt-1">
              Selecione o relatório desejado e configure os filtros
            </p>
          </div>
          <button
            onClick={() => setShowFiltros(!showFiltros)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Filter className="w-4 h-4" />
            {showFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </button>
        </div>

        {/* Filtros Globais */}
        {showFiltros && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Início
                </label>
                <input
                  type="date"
                  value={filtros.dataInicio}
                  onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Fim
                </label>
                <input
                  type="date"
                  value={filtros.dataFim}
                  onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turma
                </label>
                <select
                  value={filtros.turma}
                  onChange={(e) => setFiltros({ ...filtros, turma: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TODAS">Todas as Turmas</option>
                  <option value="1-ANO">1º Ano</option>
                  <option value="2-ANO">2º Ano</option>
                  <option value="3-ANO">3º Ano</option>
                  <option value="4-ANO">4º Ano</option>
                  <option value="5-ANO">5º Ano</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato
                </label>
                <select
                  value={filtros.formato}
                  onChange={(e) => setFiltros({ ...filtros, formato: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PDF">PDF</option>
                  <option value="EXCEL">Excel</option>
                  <option value="CSV">CSV</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grid de Relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatorios.map((relatorio) => {
          const colors = colorClasses[relatorio.color];
          const Icon = relatorio.icon;

          return (
            <div
              key={relatorio.id}
              className={`bg-white rounded-xl shadow-sm p-6 border-2 border-transparent ${colors.hover} transition-all hover:shadow-md cursor-pointer`}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <div className={`w-10 h-10 ${colors.icon} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 mb-1">{relatorio.titulo}</h3>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                    {relatorio.categoria}
                  </span>
                </div>
              </div>

              {/* Descrição */}
              <p className="text-sm text-gray-600 mb-4">
                {relatorio.descricao}
              </p>

              {/* Campos incluídos */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Campos incluídos:</p>
                <ul className="space-y-1">
                  {relatorio.campos.slice(0, 3).map((campo, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      {campo}
                    </li>
                  ))}
                  {relatorio.campos.length > 3 && (
                    <li className="text-xs text-gray-500 italic">
                      + {relatorio.campos.length - 3} outros campos
                    </li>
                  )}
                </ul>
              </div>

              {/* Botão */}
              <button
                onClick={() => handleGerarRelatorio(relatorio)}
                className={`w-full px-4 py-2 ${colors.bg} ${colors.text} rounded-lg hover:opacity-80 transition-opacity text-sm font-medium flex items-center justify-center gap-2`}
              >
                <Download className="w-4 h-4" />
                Gerar Relatório
              </button>
            </div>
          );
        })}
      </div>

      {/* Relatórios Personalizados */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Relatórios Personalizados</h3>
            <p className="text-sm text-gray-600 mb-4">
              Precisa de um relatório específico? Configure campos, filtros e métricas personalizadas.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Criar Relatório Personalizado
            </button>
          </div>
        </div>
      </div>

      {/* Histórico de Relatórios Gerados */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Relatórios Gerados Recentemente</h3>
        <div className="space-y-3">
          {[
            { nome: 'Recebimentos - Outubro 2024', data: '2024-11-01', tamanho: '2.3 MB', formato: 'PDF' },
            { nome: 'Inadimplência - 3º Trimestre', data: '2024-10-15', tamanho: '1.8 MB', formato: 'Excel' },
            { nome: 'Fluxo de Caixa - Anual', data: '2024-10-01', tamanho: '4.1 MB', formato: 'PDF' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.nome}</p>
                  <p className="text-xs text-gray-500">
                    Gerado em {new Date(item.data).toLocaleDateString('pt-BR')} • {item.tamanho} • {item.formato}
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Baixar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Relatorios;