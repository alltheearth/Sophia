// src/pages/Comunicacao/components/Notificacoes.jsx

import React, { useState } from 'react';
import { Bell, Check, Trash2, Eye, Calendar, MessageSquare, DollarSign, AlertCircle, BookOpen, Users, Filter } from 'lucide-react';

const Notificacoes = () => {
  const [filtroTipo, setFiltroTipo] = useState('TODAS');
  const [filtroLida, setFiltroLida] = useState('TODAS');

  // Notificações mockadas
  const notificacoes = [
    {
      id: 1,
      tipo: 'MENSALIDADE',
      titulo: 'Mensalidade Paga',
      mensagem: 'A mensalidade de Ana Carolina Silva foi paga via PIX',
      data: '2024-11-06 10:30',
      lida: false,
      icon: DollarSign,
      color: 'green'
    },
    {
      id: 2,
      tipo: 'NOTA',
      titulo: 'Notas Lançadas',
      mensagem: 'Prof. João Santos lançou as notas do 3º bimestre de Matemática',
      data: '2024-11-06 09:15',
      lida: false,
      icon: BookOpen,
      color: 'purple'
    },
    {
      id: 3,
      tipo: 'MENSAGEM',
      titulo: 'Nova Mensagem',
      mensagem: 'Maria Silva enviou uma mensagem sobre reunião de pais',
      data: '2024-11-06 08:45',
      lida: false,
      icon: MessageSquare,
      color: 'blue'
    },
    {
      id: 4,
      tipo: 'FREQUENCIA',
      titulo: 'Frequência Baixa',
      mensagem: 'Pedro Henrique Santos teve 3 faltas esta semana',
      data: '2024-11-05 16:20',
      lida: true,
      icon: AlertCircle,
      color: 'red'
    },
    {
      id: 5,
      tipo: 'EVENTO',
      titulo: 'Lembrete de Evento',
      mensagem: 'Reunião de pais do 5º Ano A amanhã às 19h',
      data: '2024-11-05 14:00',
      lida: true,
      icon: Calendar,
      color: 'orange'
    },
    {
      id: 6,
      tipo: 'MATRICULA',
      titulo: 'Nova Matrícula',
      mensagem: 'Rafael dos Santos Lima foi matriculado no 5º Ano B',
      data: '2024-11-05 11:30',
      lida: true,
      icon: Users,
      color: 'teal'
    },
    {
      id: 7,
      tipo: 'MENSALIDADE',
      titulo: 'Mensalidade em Atraso',
      mensagem: 'Lucas Gabriel Ferreira está com 15 dias de atraso',
      data: '2024-11-05 08:00',
      lida: true,
      icon: DollarSign,
      color: 'red'
    },
    {
      id: 8,
      tipo: 'NOTA',
      titulo: 'Boletim Disponível',
      mensagem: 'Boletim do 3º bimestre já está disponível',
      data: '2024-11-04 15:45',
      lida: true,
      icon: BookOpen,
      color: 'blue'
    }
  ];

  const handleMarcarComoLida = (id) => {
    console.log('Marcar como lida:', id);
  };

  const handleMarcarTodasComoLidas = () => {
    console.log('Marcar todas como lidas');
    alert('Todas as notificações foram marcadas como lidas!');
  };

  const handleExcluir = (id) => {
    console.log('Excluir notificação:', id);
  };

  const handleVisualizar = (notificacao) => {
    console.log('Visualizar:', notificacao);
    handleMarcarComoLida(notificacao.id);
  };

  const notificacoesFiltradas = notificacoes.filter(notif => {
    const matchTipo = filtroTipo === 'TODAS' || notif.tipo === filtroTipo;
    const matchLida = filtroLida === 'TODAS' || 
      (filtroLida === 'LIDAS' && notif.lida) || 
      (filtroLida === 'NAO_LIDAS' && !notif.lida);
    return matchTipo && matchLida;
  });

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-700',
      purple: 'bg-purple-100 text-purple-700',
      blue: 'bg-blue-100 text-blue-700',
      red: 'bg-red-100 text-red-700',
      orange: 'bg-orange-100 text-orange-700',
      teal: 'bg-teal-100 text-teal-700'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header com Estatísticas */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Bell className="w-6 h-6 text-orange-600" />
              Central de Notificações
            </h3>
            <p className="text-sm text-gray-600">
              Você tem <span className="font-bold text-orange-600">{naoLidas}</span> notificações não lidas
            </p>
          </div>
          {naoLidas > 0 && (
            <button
              onClick={handleMarcarTodasComoLidas}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Check className="w-4 h-4" />
              Marcar Todas como Lidas
            </button>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="font-medium text-gray-800">Filtros</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Tipo */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Tipo</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-sm"
            >
              <option value="TODAS">Todas</option>
              <option value="MENSAGEM">Mensagens</option>
              <option value="MENSALIDADE">Financeiro</option>
              <option value="NOTA">Notas</option>
              <option value="FREQUENCIA">Frequência</option>
              <option value="EVENTO">Eventos</option>
              <option value="MATRICULA">Matrículas</option>
            </select>
          </div>

          {/* Status de Leitura */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Status</label>
            <select
              value={filtroLida}
              onChange={(e) => setFiltroLida(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-sm"
            >
              <option value="TODAS">Todas</option>
              <option value="NAO_LIDAS">Não Lidas</option>
              <option value="LIDAS">Lidas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Notificações */}
      <div className="space-y-3">
        {notificacoesFiltradas.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhuma notificação</h3>
            <p className="text-gray-600">Você não tem notificações para os filtros selecionados.</p>
          </div>
        ) : (
          notificacoesFiltradas.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className={`bg-white rounded-lg shadow-sm p-4 border-l-4 transition-all hover:shadow-md ${
                  !notif.lida 
                    ? 'border-orange-500 bg-orange-50/30' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Ícone */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(notif.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-800">{notif.titulo}</h4>
                          {!notif.lida && (
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{notif.mensagem}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {notif.data}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!notif.lida && (
                          <button
                            onClick={() => handleMarcarComoLida(notif.id)}
                            className="flex items-center gap-1 px-3 py-1 text-xs bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
                          >
                            <Check className="w-3 h-3" />
                            Marcar como lida
                          </button>
                        )}
                        <button
                          onClick={() => handleVisualizar(notif)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Visualizar"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleExcluir(notif.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Paginação (se necessário) */}
      {notificacoesFiltradas.length > 10 && (
        <div className="flex justify-center">
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            Carregar mais notificações
          </button>
        </div>
      )}
    </div>
  );
};

export default Notificacoes;