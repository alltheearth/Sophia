// src/pages/Financeiro/modals/DetalhesMensalidade.jsx

import React, { useState } from 'react';
import { X, Barcode, CreditCard, Eye, Download, Send, FileText, CheckCircle, Clock } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const DetalhesMensalidadeModal = ({ mensalidade, onClose }) => {
  const [pixCopied, setPixCopied] = useState(false);

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

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020126580014br.gov.bcb.pix...');
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  const handleVisualizarBoleto = () => {
    // Implementar abertura do boleto em nova aba
    window.open(`/boletos/${mensalidade.asaasId}`, '_blank');
  };

  const handleBaixarPDF = () => {
    // Implementar download do PDF
    console.log('Baixar PDF:', mensalidade.id);
  };

  const handleEnviarEmail = () => {
    // Implementar envio por email
    console.log('Enviar email:', mensalidade.id);
    alert('Email enviado com sucesso!');
  };

  const handleRegistrarPagamento = () => {
    // Implementar registro manual de pagamento
    console.log('Registrar pagamento:', mensalidade.id);
    alert('Pagamento registrado com sucesso!');
    onClose();
  };

  const handleCancelarCobranca = () => {
    if (confirm('Tem certeza que deseja cancelar esta cobrança?')) {
      console.log('Cancelar cobrança:', mensalidade.id);
      alert('Cobrança cancelada!');
      onClose();
    }
  };

  // Histórico mockado
  const historico = [
    ...(mensalidade.status === 'PAGO' ? [{
      tipo: 'pagamento',
      mensagem: 'Pagamento confirmado',
      data: mensalidade.dataPagamento,
      hora: '14:32'
    }] : []),
    {
      tipo: 'envio',
      mensagem: 'Boleto enviado por email',
      data: '2024-11-01',
      hora: '08:15'
    },
    {
      tipo: 'geracao',
      mensagem: 'Mensalidade gerada',
      data: '2024-11-01',
      hora: '08:00'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Detalhes da Mensalidade</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Informações do Aluno */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">Informações do Aluno</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Aluno:</span>
                <p className="font-medium text-gray-800">{mensalidade.aluno}</p>
              </div>
              <div>
                <span className="text-gray-600">Turma:</span>
                <p className="font-medium text-gray-800">{mensalidade.turma}</p>
              </div>
              <div>
                <span className="text-gray-600">Responsável Financeiro:</span>
                <p className="font-medium text-gray-800">{mensalidade.responsavel}</p>
              </div>
              <div>
                <span className="text-gray-600">Competência:</span>
                <p className="font-medium text-gray-800">{mensalidade.competencia}</p>
              </div>
            </div>
          </div>

          {/* Detalhes Financeiros */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">Detalhes Financeiros</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Valor da Mensalidade:</span>
                <span className="font-medium text-gray-800">{formatCurrency(mensalidade.valor)}</span>
              </div>
              {mensalidade.desconto > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Desconto:</span>
                  <span className="font-medium text-green-600">- {formatCurrency(mensalidade.desconto)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
                <span className="font-medium text-gray-800">Valor Final:</span>
                <span className="font-bold text-gray-800 text-lg">{formatCurrency(mensalidade.valorFinal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Data de Vencimento:</span>
                <span className="font-medium text-gray-800">{formatDate(mensalidade.vencimento)}</span>
              </div>
              {mensalidade.dataPagamento && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Data de Pagamento:</span>
                  <span className="font-medium text-green-600">{formatDate(mensalidade.dataPagamento)}</span>
                </div>
              )}
              {mensalidade.diasAtraso && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Dias de Atraso:</span>
                  <span className="font-medium text-red-600">{mensalidade.diasAtraso} dias</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Status:</span>
                <StatusBadge status={mensalidade.status} />
              </div>
            </div>
          </div>

          {/* Opções de Pagamento - Apenas se não estiver pago */}
          {mensalidade.status !== 'PAGO' && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Formas de Pagamento</h4>
              
              {/* Boleto Bancário */}
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Barcode className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800 mb-1">Boleto Bancário</h5>
                    <p className="text-sm text-gray-600 mb-3">
                      Pague em qualquer banco, casa lotérica ou internet banking
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={handleVisualizarBoleto}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        Visualizar Boleto
                      </button>
                      <button 
                        onClick={handleBaixarPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        Baixar PDF
                      </button>
                      <button 
                        onClick={handleEnviarEmail}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                      >
                        <Send className="w-4 h-4" />
                        Enviar por Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* PIX */}
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800 mb-1">PIX</h5>
                    <p className="text-sm text-gray-600 mb-3">
                      Pagamento instantâneo via QR Code ou Pix Copia e Cola
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-40 h-40 bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center p-2">
                          <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                            <div className="text-center text-xs text-gray-500">
                              <div className="text-2xl mb-1">📱</div>
                              QR Code PIX
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value="00020126580014br.gov.bcb.pix0136..."
                          readOnly
                          className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                        />
                        <button 
                          onClick={handleCopyPix}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            pixCopied 
                              ? 'bg-green-600 text-white' 
                              : 'bg-teal-600 text-white hover:bg-teal-700'
                          }`}
                        >
                          {pixCopied ? 'Copiado!' : 'Copiar'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cartão de Crédito */}
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800 mb-1">Cartão de Crédito</h5>
                    <p className="text-sm text-gray-600 mb-3">
                      Pague em até 12x com cartão de crédito
                    </p>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 text-sm font-medium">
                      Pagar com Cartão
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Se já pago, mostrar comprovante */}
          {mensalidade.status === 'PAGO' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h5 className="font-medium text-green-800">Pagamento Confirmado</h5>
                  <p className="text-sm text-green-700">
                    Pago em {formatDate(mensalidade.dataPagamento)} via {mensalidade.formaPagamento}
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-green-300 rounded-lg hover:bg-green-50 text-sm font-medium text-green-700">
                <FileText className="w-4 h-4" />
                Baixar Comprovante
              </button>
            </div>
          )}

          {/* Histórico de Ações */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-800 mb-3">Histórico</h4>
            <div className="space-y-3">
              {historico.map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    item.tipo === 'pagamento' ? 'bg-green-500' :
                    item.tipo === 'envio' ? 'bg-blue-500' :
                    'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-800">{item.mensagem}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-500">
                        {formatDate(item.data)} às {item.hora}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between sticky bottom-0 bg-white">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Fechar
          </button>
          {mensalidade.status !== 'PAGO' && (
            <div className="flex gap-2">
              <button 
                onClick={handleCancelarCobranca}
                className="px-6 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                Cancelar Cobrança
              </button>
              <button 
                onClick={handleRegistrarPagamento}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Registrar Pagamento Manual
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalhesMensalidadeModal;