// src/pages/Financeiro/tabs/VisaoGeral.jsx

import React from 'react';
import ResumoCard from '../components/ResumoCard';
import HistoricoChart from '../components/HistoricoChart';
import { TrendingUp, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const VisaoGeral = () => {
  // Dados mockados - virão da API
  const resumoFinanceiro = {
    receitaMensal: {
      valor: 145780.00,
      meta: 160000.00,
      percentual: 91.1,
      variacao: 8.3
    },
    mensalidadesPagas: {
      quantidade: 742,
      total: 847,
      percentual: 87.6,
      valor: 127360.00
    },
    emAtraso: {
      quantidade: 105,
      valor: 18420.00,
      diasMediaAtraso: 12
    },
    pendentes: {
      quantidade: 45,
      valor: 38250.00
    }
  };

  const historicoRecebimentos = [
    { mes: 'Outubro', valor: 134520.00, mensalidades: 798 },
    { mes: 'Setembro', valor: 138240.00, mensalidades: 815 },
    { mes: 'Agosto', valor: 142100.00, mensalidades: 831 },
    { mes: 'Julho', valor: 139870.00, mensalidades: 823 },
    { mes: 'Junho', valor: 141560.00, mensalidades: 828 },
    { mes: 'Maio', valor: 143200.00, mensalidades: 838 }
  ];

  const cards = [
    {
      title: 'Receita do Mês',
      value: resumoFinanceiro.receitaMensal.valor,
      meta: resumoFinanceiro.receitaMensal.meta,
      percentual: resumoFinanceiro.receitaMensal.percentual,
      variacao: resumoFinanceiro.receitaMensal.variacao,
      icon: TrendingUp,
      color: 'green',
      showProgress: true
    },
    {
      title: 'Pagas',
      value: `${resumoFinanceiro.mensalidadesPagas.quantidade}/${resumoFinanceiro.mensalidadesPagas.total}`,
      subtitle: resumoFinanceiro.mensalidadesPagas.valor,
      percentual: resumoFinanceiro.mensalidadesPagas.percentual,
      icon: CheckCircle,
      color: 'blue',
      showProgress: true
    },
    {
      title: 'Em Atraso',
      value: resumoFinanceiro.emAtraso.quantidade,
      subtitle: resumoFinanceiro.emAtraso.valor,
      extraInfo: `${resumoFinanceiro.emAtraso.diasMediaAtraso}d média`,
      icon: AlertCircle,
      color: 'red'
    },
    {
      title: 'Pendentes',
      value: resumoFinanceiro.pendentes.quantidade,
      subtitle: resumoFinanceiro.pendentes.valor,
      extraInfo: 'Vencimento em até 10 dias',
      icon: Clock,
      color: 'yellow'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <ResumoCard key={index} {...card} />
        ))}
      </div>

      {/* Gráfico de Histórico */}
      <HistoricoChart data={historicoRecebimentos} />
    </div>
  );
};

export default VisaoGeral;