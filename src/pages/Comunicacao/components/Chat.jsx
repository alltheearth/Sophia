// src/pages/Comunicacao/components/Chat.jsx

import React, { useState } from 'react';
import { Search, Send, Paperclip, Smile, Check, CheckCheck, Clock, Image as ImageIcon } from 'lucide-react';

const Chat = () => {
  const [conversaSelecionada, setConversaSelecionada] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Conversas mockadas
  const conversas = [
    {
      id: 1,
      responsavel: 'Maria Silva',
      aluno: 'Ana Carolina Silva',
      turma: '5º Ano A',
      foto: null,
      ultimaMensagem: 'Obrigada pela atenção! 😊',
      horario: '10:30',
      naoLidas: 2,
      online: true
    },
    {
      id: 2,
      responsavel: 'João Santos',
      aluno: 'Pedro Henrique Santos',
      turma: '3º Ano B',
      foto: null,
      ultimaMensagem: 'Quando será a próxima reunião?',
      horario: '09:45',
      naoLidas: 0,
      online: false
    },
    {
      id: 3,
      responsavel: 'Carlos Costa',
      aluno: 'Juliana Oliveira Costa',
      turma: '1º Ano C',
      foto: null,
      ultimaMensagem: 'A Juliana está com febre hoje',
      horario: '08:15',
      naoLidas: 1,
      online: true
    },
    {
      id: 4,
      responsavel: 'Fernanda Ferreira',
      aluno: 'Lucas Gabriel Ferreira',
      turma: '2º Ano A',
      foto: null,
      ultimaMensagem: 'Foto: IMG_2024.jpg',
      horario: 'Ontem',
      naoLidas: 0,
      online: false
    }
  ];

  // Mensagens mockadas
  const mensagensChat = [
    {
      id: 1,
      remetente: 'responsavel',
      texto: 'Bom dia! Gostaria de saber como a Ana está indo nas aulas de matemática.',
      horario: '09:00',
      lida: true,
      entregue: true
    },
    {
      id: 2,
      remetente: 'escola',
      texto: 'Bom dia, Maria! A Ana está indo muito bem! Ela participou bastante das últimas aulas e tirou 9.0 na última prova. 😊',
      horario: '09:15',
      lida: true,
      entregue: true
    },
    {
      id: 3,
      remetente: 'responsavel',
      texto: 'Que ótimo! Ela está muito animada mesmo. Obrigada pelo retorno!',
      horario: '10:25',
      lida: true,
      entregue: true
    },
    {
      id: 4,
      remetente: 'responsavel',
      texto: 'Obrigada pela atenção! 😊',
      horario: '10:30',
      lida: false,
      entregue: true
    }
  ];

  const handleEnviarMensagem = () => {
    if (mensagem.trim()) {
      console.log('Enviando mensagem:', mensagem);
      setMensagem('');
    }
  };

  const conversasFiltradas = conversas.filter(conv =>
    conv.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.aluno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.turma.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIniciais = (nome) => {
    return nome.split(' ').map(n => n[0]).slice(0, 2).join('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[calc(100vh-400px)] flex">
      {/* Lista de Conversas */}
      <div className="w-96 border-r border-gray-200 flex flex-col">
        {/* Busca */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar conversa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto">
          {conversasFiltradas.map((conversa) => (
            <div
              key={conversa.id}
              onClick={() => setConversaSelecionada(conversa)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                conversaSelecionada?.id === conversa.id ? 'bg-pink-50 border-l-4 border-l-pink-600' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {conversa.foto ? (
                      <img src={conversa.foto} alt={conversa.responsavel} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      getIniciais(conversa.responsavel)
                    )}
                  </div>
                  {conversa.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-800 truncate">{conversa.responsavel}</h4>
                    <span className="text-xs text-gray-500 ml-2">{conversa.horario}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{conversa.aluno} - {conversa.turma}</p>
                  <p className="text-sm text-gray-600 truncate">{conversa.ultimaMensagem}</p>
                </div>
                {conversa.naoLidas > 0 && (
                  <div className="bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                    {conversa.naoLidas}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área de Chat */}
      {conversaSelecionada ? (
        <div className="flex-1 flex flex-col">
          {/* Header da Conversa */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {getIniciais(conversaSelecionada.responsavel)}
                </div>
                {conversaSelecionada.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{conversaSelecionada.responsavel}</h3>
                <p className="text-sm text-gray-600">{conversaSelecionada.aluno} - {conversaSelecionada.turma}</p>
              </div>
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {mensagensChat.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.remetente === 'escola' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md ${msg.remetente === 'escola' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      msg.remetente === 'escola'
                        ? 'bg-pink-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{msg.texto}</p>
                    <div className="flex items-center gap-1 mt-1 justify-end">
                      <span className={`text-xs ${msg.remetente === 'escola' ? 'text-pink-100' : 'text-gray-500'}`}>
                        {msg.horario}
                      </span>
                      {msg.remetente === 'escola' && (
                        <>
                          {msg.lida ? (
                            <CheckCheck className="w-3 h-3 text-pink-100" />
                          ) : msg.entregue ? (
                            <CheckCheck className="w-3 h-3 text-pink-200" />
                          ) : (
                            <Check className="w-3 h-3 text-pink-200" />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input de Mensagem */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEnviarMensagem()}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <button
                onClick={handleEnviarMensagem}
                disabled={!mensagem.trim()}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Selecione uma conversa</h3>
            <p className="text-gray-600">Escolha um responsável para iniciar ou continuar a conversa</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;