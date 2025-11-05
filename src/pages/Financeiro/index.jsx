// src/pages/Financeiro/index.jsx
import React, { useState } from 'react';
import { DollarSign, Download, Plus } from 'lucide-react';
import VisaoGeral from './tabs/VisaoGeral';
import Mensalidades from './tabs/Mensalidades';
import Inadimplencia from './tabs/Inadimplencia';
import Relatorios from './tabs/Relatorios';
import GerarMensalidadesModal from './modals/GerarMensalidades';

const Financeiro = () => {
  const [selectedTab, setSelectedTab] = useState('visao-geral');
  const [showGerarModal, setShowGerarModal] = useState(false);

  const tabs = [
    { id: 'visao-geral', label: 'Visão Geral', component: VisaoGeral },
    { id: 'mensalidades', label: 'Mensalidades', component: Mensalidades },
    { id: 'inadimplencia', label: 'Inadimplência', component: Inadimplencia },
    { id: 'relatorios', label: 'Relatórios', component: Relatorios }
  ];

  const ActiveTabComponent = tabs.find(t => t.id === selectedTab)?.component;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              Financeiro
            </h1>
            <p className="text-gray-600 mt-1">Gestão completa de mensalidades e pagamentos</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button 
              onClick={() => setShowGerarModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Gerar Mensalidades
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`pb-3 px-1 border-b-2 transition-colors font-medium ${
                selectedTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {ActiveTabComponent && <ActiveTabComponent />}

      {/* Modals */}
      {showGerarModal && (
        <GerarMensalidadesModal onClose={() => setShowGerarModal(false)} />
      )}
    </div>
  );
};

export default Financeiro;