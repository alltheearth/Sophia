// src/pages/Comunicacao/modals/EnviarMensagem.jsx

import React, { useState } from 'react';
import { X, Send, Search, User, Paperclip, Smile } from 'lucide-react';

const EnviarMensagemModal = ({ onClose }) => {
  const [destinatario, setDestinatario] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Responsáveis disponíveis mockados
  const responsaveis = [
    {
      id: 1,
      nome: 'Maria Silva',
      aluno: 'Ana Carolina Silva',
      turma: '5º Ano A',
      foto: null,
      online: true
    },
    {
      id: 2,
      nome: 'João Santos',
      aluno: 'Pedro Henrique Santos',
      turma: '3º Ano B',
      foto: null,
      online: false
    },
    {
      id: 3,
      nome: 'Carlos Costa',
      aluno: 'Juliana Oliveira Costa',
      turma: '1º Ano C',
      foto: null,
      online: true
    },
    {
      id: 4,
      nome: 'Fernanda Ferreira',
      aluno: 'Lucas Gabriel Ferreira',
      turma: '2º Ano A',
      foto: null,
      online: false
    },
    {
      id: 5,
      nome: 'Roberto Rocha',
      aluno: 'Beatriz Almeida Rocha',
      turma: '4º Ano B',
      foto: null,
      online: true
    },
    {
      id: 6,
      nome: 'Patricia Lima',
      aluno: 'Rafael dos Santos Lima',
      turma: '5º Ano C',
      foto: null,
      online: false
    }
  ];

  const responsaveisFiltrados = responsaveis.filter(resp =>
    resp.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resp.aluno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resp.turma.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnviar = () => {
    if (!destinatario) {
      alert('Selecione um destinatário');
      return;
    }
    if (!mensagem.trim()) {
      alert('Digite uma mensagem');
      return;
    }
    console.log('Enviando mensagem para:', destinatario, 'Mensagem:', mensagem);
    alert(`Mensagem enviada para ${destinatario.nome}!`);
    onClose();
  };

  const getIniciais = (nome) => {
    return nome.split(' ').map(n => n[0]).slice(0, 2).join('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">Nova Mensagem</h3>
              <p className="text-sm text-white/90">Envie uma mensagem direta para um responsável</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Lista de Responsáveis */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar responsável..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {responsaveisFiltrados.length === 0 ? (
                <div className="text-center py-12">
                  <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Nenhum responsável encontrado</p>
                </div>
              ) : (
                responsaveisFiltrados.map((resp) => (
                  <div
                    key={resp.id}
                    onClick={() => setDestinatario(resp)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      destinatario?.id === resp.id
                        ? 'bg-blue-50 border-l-4 border-l-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {resp.foto ? (
                            <img src={resp.foto} alt={resp.nome} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            getIniciais(resp.nome)
                          )}
                        </div>
                        {resp.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 text-sm truncate">{resp.nome}</h4>
                        <p className="text-xs text-gray-500 truncate">{resp.aluno}</p>
                        <p className="text-xs text-gray-400">{resp.turma}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Área de Composição */}
          <div className="flex-1 flex flex-col">
            {destinatario ? (
              <>
                {/* Header do Destinatário */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {getIniciais(destinatario.nome)}
                      </div>
                      {destinatario.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{destinatario.nome}</h3>
                      <p className="text-sm text-gray-600">{destinatario.aluno} - {destinatario.turma}</p>
                    </div>
                  </div>
                </div>

                {/* Área de Mensagem */}
                <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-800">
                        💡 <strong>Dica:</strong> Seja claro e objetivo na sua mensagem. 
                        Evite enviar informações sensíveis por este canal.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensagem *
                      </label>
                      <textarea
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        rows={12}
                        placeholder="Digite sua mensagem aqui..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">{mensagem.length} caracteres</p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Anexar arquivo"
                          >
                            <Paperclip className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Emoji"
                          >
                            <Smile className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mensagens Rápidas */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensagens Rápidas
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          'Bom dia! Como posso ajudar?',
                          'Obrigado pelo contato.',
                          'Estarei à disposição.',
                          'Aguardo seu retorno.',
                          'Favor confirmar o recebimento.',
                          'Estou à disposição para esclarecer dúvidas.'
                        ].map((msg, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setMensagem(msg)}
                            className="text-left px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-sm text-gray-700 transition-colors"
                          >
                            {msg}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 bg-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="copiarEmail" className="rounded" />
                    <label htmlFor="copiarEmail" className="text-sm text-gray-700 cursor-pointer">
                      Enviar cópia por email
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={onClose}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleEnviar}
                      disabled={!mensagem.trim()}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Enviar Mensagem
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Selecione um Destinatário</h3>
                  <p className="text-gray-600">Escolha um responsável na lista ao lado para começar</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnviarMensagemModal;