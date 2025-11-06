// src/pages/Comunicacao/index.jsx

import React, { useState } from 'react';
import { MessageSquare, Plus, Download, Bell, Image, Mail, Users } from 'lucide-react';
import Chat from './components/Chat';
import Avisos from './components/Avisos';
import Galeria from './components/Galeria';
import Notificacoes from './components/Notificacoes';
import NovoAvisoModal from './modals/NovoAviso';
import EnviarMensagemModal from './modals/EnviarMensagem';
import UploadMidiaModal from './modals/UploadMidia';

const Comunicacao = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [showNovoAvisoModal, setShowNovoAvisoModal] = useState(false);
  const [showEnviarMensagemModal, setShowEnviarMensagemModal] = useState(false);
  const [showUploadMidiaModal, setShowUploadMidiaModal] = useState(false);

  // Estatísticas mockadas
  const estatisticas = {
    mensagensNaoLidas: 12,
    avisosAtivos: 5,
    fotosCompartilhadas: 48,
    notificacoesPendentes: 8
  };

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageSquare, component: Chat },
    { id: 'avisos', label: 'Avisos', icon: Mail, component: Avisos },
    { id: 'galeria', label: 'Galeria', icon: Image, component: Galeria },
    { id: 'notificacoes', label: 'Notificações', icon: Bell, component: Notificacoes }
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;

  const handleNovaAcao = () => {
    switch(activeTab) {
      case 'chat':
        setShowEnviarMensagemModal(true);
        break;
      case 'avisos':
        setShowNovoAvisoModal(true);
        break;
      case 'galeria':
        setShowUploadMidiaModal(true);
        break;
      default:
        break;
    }
  };

  const getActionLabel = () => {
    switch(activeTab) {
      case 'chat':
        return 'Nova Mensagem';
      case 'avisos':
        return 'Novo Aviso';
      case 'galeria':
        return 'Upload Mídia';
      default:
        return 'Nova Ação';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              Comunicação
            </h1>
            <p className="text-gray-600 mt-1">Central de comunicação com pais e responsáveis</p>
          </div>
          <div className="flex gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Relatório
            </button>
            {activeTab !== 'notificacoes' && (
              <button 
                onClick={handleNovaAcao}
                className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                {getActionLabel()}
              </button>
            )}
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Mensagens Não Lidas</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.mensagensNaoLidas}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avisos Ativos</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.avisosAtivos}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fotos Compartilhadas</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.fotosCompartilhadas}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Image className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Notificações Pendentes</p>
                <p className="text-2xl font-bold text-gray-800">{estatisticas.notificacoesPendentes}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-6">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 px-1 border-b-2 transition-colors font-medium ${
                  activeTab === tab.id
                    ? 'border-pink-600 text-pink-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                {tab.id === 'chat' && estatisticas.mensagensNaoLidas > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {estatisticas.mensagensNaoLidas}
                  </span>
                )}
                {tab.id === 'notificacoes' && estatisticas.notificacoesPendentes > 0 && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {estatisticas.notificacoesPendentes}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {ActiveComponent && <ActiveComponent />}

      {/* Modais */}
      {showNovoAvisoModal && (
        <NovoAvisoModal
          onClose={() => setShowNovoAvisoModal(false)}
        />
      )}

      {showEnviarMensagemModal && (
        <EnviarMensagemModal
          onClose={() => setShowEnviarMensagemModal(false)}
        />
      )}

      {showUploadMidiaModal && (
        <UploadMidiaModal
          onClose={() => setShowUploadMidiaModal(false)}
        />
      )}
    </div>
  );
};

export default Comunicacao;