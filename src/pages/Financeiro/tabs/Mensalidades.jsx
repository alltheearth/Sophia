// src/pages/Financeiro/tabs/Mensalidades.jsx

import React, { useState } from 'react';
import FiltrosMensalidades from '../components/FiltrosMensalidades';
import TabelaMensalidades from '../components/TabelaMensalidades';
import DetalhesMensalidadeModal from '../modals/DetalhesMensalidade';

const Mensalidades = () => {
  const [filterStatus, setFilterStatus] = useState('TODOS');
  const [filterTurma, setFilterTurma] = useState('TODAS');
  const [filterMes, setFilterMes] = useState('2024-11');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMensalidade, setSelectedMensalidade] = useState(null);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);

  // Dados mockados - virão da API
  const mensalidades = [
    {
      id: 1,
      aluno: 'Ana Carolina Silva',
      turma: '5º Ano A',
      responsavel: 'Maria Silva',
      competencia: '11/2024',
      valor: 850.00,
      desconto: 0,
      valorFinal: 850.00,
      vencimento: '2024-11-10',
      status: 'PAGO',
      dataPagamento: '2024-11-08',
      formaPagamento: 'PIX',
      asaasId: 'pay_123456'
    },
    {
      id: 2,
      aluno: 'Pedro Henrique Santos',
      turma: '3º Ano B',
      responsavel: 'João Santos',
      competencia: '11/2024',
      valor: 850.00,
      desconto: 85.00,
      valorFinal: 765.00,
      vencimento: '2024-11-10',
      status: 'PAGO',
      dataPagamento: '2024-11-09',
      formaPagamento: 'BOLETO',
      asaasId: 'pay_123457'
    },
    {
      id: 3,
      aluno: 'Juliana Oliveira Costa',
      turma: '1º Ano C',
      responsavel: 'Carlos Costa',
      competencia: '11/2024',
      valor: 850.00,
      desconto: 0,
      valorFinal: 850.00,
      vencimento: '2024-11-10',
      status: 'PENDENTE',
      dataPagamento: null,
      formaPagamento: null,
      asaasId: 'pay_123458'
    },
    {
      id: 4,
      aluno: 'Lucas Gabriel Ferreira',
      turma: '2º Ano A',
      responsavel: 'Fernanda Ferreira',
      competencia: '11/2024',
      valor: 850.00,
      desconto: 0,
      valorFinal: 850.00,
      vencimento: '2024-10-10',
      status: 'ATRASADO',
      dataPagamento: null,
      formaPagamento: null,
      diasAtraso: 25,
      asaasId: 'pay_123459'
    },
    {
      id: 5,
      aluno: 'Beatriz Almeida Rocha',
      turma: '4º Ano B',
      responsavel: 'Roberto Rocha',
      competencia: '11/2024',
      valor: 850.00,
      desconto: 42.50,
      valorFinal: 807.50,
      vencimento: '2024-11-10',
      status: 'PENDENTE',
      dataPagamento: null,
      formaPagamento: null,
      asaasId: 'pay_123460'
    },
    {
      id: 6,
      aluno: 'Rafael dos Santos Lima',
      turma: '5º Ano C',
      responsavel: 'Patricia Lima',
      competencia: '11/2024',
      valor: 850.00,
      desconto: 0,
      valorFinal: 850.00,
      vencimento: '2024-09-10',
      status: 'ATRASADO',
      dataPagamento: null,
      formaPagamento: null,
      diasAtraso: 55,
      asaasId: 'pay_123461'
    }
  ];

  // Filtrar mensalidades
  const filteredMensalidades = mensalidades.filter(m => {
    const matchStatus = filterStatus === 'TODOS' || m.status === filterStatus;
    const matchSearch = searchTerm === '' || 
      m.aluno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.turma.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchStatus && matchSearch;
  });

  const handleViewDetalhes = (mensalidade) => {
    setSelectedMensalidade(mensalidade);
    setShowDetalhesModal(true);
  };

  const handleEnviarCobranca = (mensalidadeId) => {
    // Implementar envio de cobrança via API
    console.log('Enviar cobrança:', mensalidadeId);
    alert('Cobrança enviada com sucesso!');
  };

  const handleBaixarBoleto = (mensalidadeId) => {
    // Implementar download de boleto
    console.log('Baixar boleto:', mensalidadeId);
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <FiltrosMensalidades
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        filterTurma={filterTurma}
        onFilterTurmaChange={setFilterTurma}
        filterMes={filterMes}
        onFilterMesChange={setFilterMes}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Tabela */}
      <TabelaMensalidades
        mensalidades={filteredMensalidades}
        totalMensalidades={mensalidades.length}
        onViewDetalhes={handleViewDetalhes}
        onEnviarCobranca={handleEnviarCobranca}
        onBaixarBoleto={handleBaixarBoleto}
      />

      {/* Modal de Detalhes */}
      {showDetalhesModal && selectedMensalidade && (
        <DetalhesMensalidadeModal
          mensalidade={selectedMensalidade}
          onClose={() => setShowDetalhesModal(false)}
        />
      )}
    </div>
  );
};

export default Mensalidades;