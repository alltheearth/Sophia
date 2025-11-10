import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Send, Paperclip, Image, Video, File, 
  MoreVertical, Search, Users, Bell, CheckCheck, 
  Clock, AlertCircle, User, Crown, Shield, X, 
  Phone, Video as VideoIcon, Info, Smile, Download,
  Eye, EyeOff, Archive, Flag, Pin, Edit, Trash2,
  ArrowLeft, Plus, Check, UserPlus
} from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

const SistemaComunicacaoCompleto = () => {
  // Estados principais
  const [usuario, setUsuario] = useState(null);
  const [canais, setCanais] = useState([]);
  const [canalSelecionado, setCanalSelecionado] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [mensagemTexto, setMensagemTexto] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);
  
  // Estados de UI
  const [busca, setBusca] = useState('');
  const [mostrarInfo, setMostrarInfo] = useState(false);
  const [mostrarNovoCanalModal, setMostrarNovoCanalModal] = useState(false);
  const [mostrarAdicionarParticipantesModal, setMostrarAdicionarParticipantesModal] = useState(false);
  
  const mensagensEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Simular usuário logado
  useEffect(() => {
    const userMock = {
      id: '1',
      nome: 'João Silva',
      role: 'COORDENADOR',
      foto: null
    };
    setUsuario(userMock);
    carregarCanais();
  }, []);

  // Auto-scroll para última mensagem
  useEffect(() => {
    mensagensEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  const carregarCanais = async () => {
    try {
      // Simular dados
      const canaisMock = [
        {
          id: '1',
          tipo: 'INDIVIDUAL',
          nome: '',
          participantes: [
            { nome: 'Maria Santos', role: 'RESPONSAVEL', foto: null },
            { nome: 'João Silva', role: 'COORDENADOR', foto: null }
          ],
          mensagens_nao_lidas: 3,
          ultima_mensagem: {
            conteudo: 'Bom dia! Gostaria de saber sobre as notas.',
            enviada_em: '2025-11-10T10:30:00'
          },
          fixado: false
        },
        {
          id: '2',
          tipo: 'GRUPO_TURMA',
          nome: '5º Ano A - Comunicados',
          participantes: [
            { nome: 'Prof. Carlos', role: 'PROFESSOR', foto: null },
            { nome: '28 responsáveis', role: 'RESPONSAVEL', foto: null }
          ],
          mensagens_nao_lidas: 0,
          ultima_mensagem: {
            conteudo: 'Reunião amanhã às 19h',
            enviada_em: '2025-11-09T15:00:00'
          },
          fixado: true
        },
        {
          id: '3',
          tipo: 'INDIVIDUAL',
          nome: '',
          participantes: [
            { nome: 'Ana Oliveira', role: 'RESPONSAVEL', foto: null },
            { nome: 'João Silva', role: 'COORDENADOR', foto: null }
          ],
          mensagens_nao_lidas: 1,
          ultima_mensagem: {
            conteudo: 'Sobre a entrega do trabalho...',
            enviada_em: '2025-11-10T09:15:00'
          },
          fixado: false
        }
      ];
      
      setCanais(canaisMock);
    } catch (error) {
      console.error('Erro ao carregar canais:', error);
    }
  };

  const carregarMensagens = async (canalId) => {
    try {
      // Simular mensagens
      const mensagensMock = [
        {
          id: '1',
          remetente: { nome: 'Maria Santos', role: 'RESPONSAVEL', foto: null },
          conteudo: 'Bom dia! Gostaria de saber como está o desempenho do meu filho nas últimas semanas.',
          enviada_em: '2025-11-10T10:00:00',
          lida: true,
          editada: false,
          anexos: []
        },
        {
          id: '2',
          remetente: { nome: 'João Silva', role: 'COORDENADOR', foto: null },
          conteudo: 'Bom dia, Maria! O Pedro está indo muito bem. Melhorou bastante em matemática. Vou pedir ao professor para enviar um relatório detalhado.',
          enviada_em: '2025-11-10T10:15:00',
          lida: true,
          editada: false,
          anexos: []
        },
        {
          id: '3',
          remetente: { nome: 'Maria Santos', role: 'RESPONSAVEL', foto: null },
          conteudo: 'Que ótimo! Muito obrigada pelo retorno. Ele está realmente dedicado aos estudos.',
          enviada_em: '2025-11-10T10:30:00',
          lida: false,
          editada: false,
          anexos: []
        }
      ];
      
      setMensagens(mensagensMock);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  };

  const handleSelecionarCanal = (canal) => {
    setCanalSelecionado(canal);
    carregarMensagens(canal.id);
    setMostrarInfo(false);
  };

  const handleEnviarMensagem = async () => {
    if (!mensagemTexto.trim()) return;
    
    const novaMensagem = {
      id: Date.now().toString(),
      remetente: { nome: usuario.nome, role: usuario.role, foto: usuario.foto },
      conteudo: mensagemTexto,
      enviada_em: new Date().toISOString(),
      lida: false,
      editada: false,
      anexos: []
    };
    
    setMensagens([...mensagens, novaMensagem]);
    setMensagemTexto('');
  };

  const getNomeCanal = (canal) => {
    if (canal.tipo === 'INDIVIDUAL') {
      const outro = canal.participantes.find(p => p.nome !== usuario.nome);
      return outro?.nome || 'Usuário';
    }
    return canal.nome;
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      'GESTOR': 'bg-purple-100 text-purple-700',
      'COORDENADOR': 'bg-blue-100 text-blue-700',
      'PROFESSOR': 'bg-green-100 text-green-700',
      'RESPONSAVEL': 'bg-orange-100 text-orange-700',
      'ALUNO': 'bg-pink-100 text-pink-700'
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  const formatarHora = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);
    
    if (data.toDateString() === hoje.toDateString()) {
      return formatarHora(dataISO);
    } else if (data.toDateString() === ontem.toDateString()) {
      return 'Ontem';
    } else {
      return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
  };

  const canaisFiltrados = canais.filter(canal => 
    getNomeCanal(canal).toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Lista de Canais */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              Comunicação
            </h1>
            <div className="flex gap-2">
              <button 
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
                onClick={() => setMostrarNovoCanalModal(true)}
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors relative">
                <Bell className="w-5 h-5 text-white" />
                {notificacoes.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {notificacoes.length}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Busca */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar conversas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/90 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>

        {/* Lista de Canais */}
        <div className="flex-1 overflow-y-auto">
          {canaisFiltrados.map((canal) => (
            <div
              key={canal.id}
              onClick={() => handleSelecionarCanal(canal)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${
                canalSelecionado?.id === canal.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {canal.tipo === 'INDIVIDUAL' ? (
                      <User className="w-6 h-6" />
                    ) : (
                      <Users className="w-6 h-6" />
                    )}
                  </div>
                  {canal.mensagens_nao_lidas > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {canal.mensagens_nao_lidas}
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 truncate flex items-center gap-2">
                      {canal.fixado && <Pin className="w-4 h-4 text-blue-600" />}
                      {getNomeCanal(canal)}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {formatarData(canal.ultima_mensagem.enviada_em)}
                    </span>
                  </div>
                  
                  {canal.tipo === 'GRUPO_TURMA' && (
                    <div className="flex items-center gap-1 mb-1">
                      <Users className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {canal.participantes.length} participantes
                      </span>
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-600 truncate">
                    {canal.ultima_mensagem.conteudo}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {canaisFiltrados.length === 0 && (
            <div className="p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhuma conversa encontrada</p>
            </div>
          )}
        </div>
      </div>

      {/* Área Principal - Mensagens */}
      {canalSelecionado ? (
        <div className="flex-1 flex flex-col">
          {/* Header do Canal */}
          <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setCanalSelecionado(null)}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {canalSelecionado.tipo === 'INDIVIDUAL' ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Users className="w-5 h-5" />
                )}
              </div>
              
              <div>
                <h2 className="font-bold text-gray-800">{getNomeCanal(canalSelecionado)}</h2>
                {canalSelecionado.tipo === 'GRUPO_TURMA' && (
                  <p className="text-sm text-gray-500">
                    {canalSelecionado.participantes.length} participantes
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <VideoIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMostrarInfo(!mostrarInfo)}
              >
                <Info className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
            {mensagens.map((msg) => {
              const ehMinha = msg.remetente.nome === usuario.nome;
              
              return (
                <div key={msg.id} className={`flex gap-3 ${ehMinha ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  {!ehMinha && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {msg.remetente.nome.charAt(0)}
                    </div>
                  )}

                  {/* Mensagem */}
                  <div className={`max-w-lg ${ehMinha ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    {!ehMinha && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-700">{msg.remetente.nome}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(msg.remetente.role)}`}>
                          {msg.remetente.role}
                        </span>
                      </div>
                    )}
                    
                    <div className={`px-4 py-3 rounded-2xl ${
                      ehMinha 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.conteudo}</p>
                      
                      {msg.anexos && msg.anexos.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {msg.anexos.map((anexo, idx) => (
                            <div key={idx} className={`flex items-center gap-2 p-2 rounded ${
                              ehMinha ? 'bg-blue-700' : 'bg-gray-50'
                            }`}>
                              <File className="w-4 h-4" />
                              <span className="text-xs flex-1 truncate">{anexo.nome_arquivo}</span>
                              <Download className="w-4 h-4 cursor-pointer" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex items-center gap-1 text-xs text-gray-500 ${ehMinha ? 'flex-row-reverse' : ''}`}>
                      <span>{formatarHora(msg.enviada_em)}</span>
                      {ehMinha && (
                        <>
                          {msg.lida ? (
                            <CheckCheck className="w-3 h-3 text-blue-600" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                        </>
                      )}
                      {msg.editada && <span className="text-xs italic">(editada)</span>}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={mensagensEndRef} />
          </div>

          {/* Input de Mensagem */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-end gap-3">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
              />
              
              <div className="flex gap-2">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Image className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Smile className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex-1 relative">
                <textarea
                  value={mensagemTexto}
                  onChange={(e) => setMensagemTexto(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleEnviarMensagem();
                    }
                  }}
                  placeholder="Digite sua mensagem..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={1}
                />
              </div>

              <button
                onClick={handleEnviarMensagem}
                disabled={!mensagemTexto.trim()}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500 text-center">
              Pressione Enter para enviar, Shift+Enter para nova linha
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageSquare className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Selecione uma conversa
            </h3>
            <p className="text-gray-500">
              Escolha um canal para começar a conversar
            </p>
          </div>
        </div>
      )}

      {/* Painel de Informações (Sidebar Direita) */}
      {mostrarInfo && canalSelecionado && (
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800">Informações</h3>
              <button 
                onClick={() => setMostrarInfo(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Participantes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Participantes ({canalSelecionado.participantes.length})
                </h4>
                {usuario.role !== 'RESPONSAVEL' && (
                  <button 
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => setMostrarAdicionarParticipantesModal(true)}
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="space-y-2">
                {canalSelecionado.participantes.map((participante, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {participante.nome.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{participante.nome}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(participante.role)}`}>
                        {participante.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arquivos Compartilhados */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <File className="w-4 h-4" />
                Arquivos (0)
              </h4>
              <p className="text-sm text-gray-500">Nenhum arquivo compartilhado</p>
            </div>

            {/* Ações */}
            {usuario.role in ['GESTOR', 'COORDENADOR'] && (
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  Assumir Conversa
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Archive className="w-4 h-4" />
                  Arquivar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SistemaComunicacaoCompleto;