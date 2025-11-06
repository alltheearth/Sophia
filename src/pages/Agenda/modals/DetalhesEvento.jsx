// src/pages/Agenda/modals/DetalhesEvento.jsx

import React from 'react';
import { X, Edit, Calendar, Clock, MapPin, Users, Mail, Trash2, CheckCircle, AlertCircle, Download, Share2 } from 'lucide-react';

const DetalhesEventoModal = ({ evento, onClose, onEditar }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTipoColor = (tipo) => {
    const colors = {
      'REUNIAO': 'bg-blue-100 text-blue-800 border-blue-300',
      'PROVA': 'bg-red-100 text-red-800 border-red-300',
      'EVENTO': 'bg-green-100 text-green-800 border-green-300',
      'FERIADO': 'bg-gray-100 text-gray-800 border-gray-300',
      'ADMINISTRATIVO': 'bg-orange-100 text-orange-800 border-orange-300',
      'CULTURAL': 'bg-purple-100 text-purple-800 border-purple-300',
      'ESPORTIVO': 'bg-teal-100 text-teal-800 border-teal-300'
    };
    return colors[tipo] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'AGENDADO': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Agendado' },
      'CONFIRMADO': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Confirmado' },
      'CANCELADO': { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle, label: 'Cancelado' },
      'REALIZADO': { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle, label: 'Realizado' }
    };
    const badge = badges[status] || badges.AGENDADO;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="w-4 h-4" />
        {badge.label}
      </span>
    );
  };

  const handleCancelar = () => {
    if (confirm('Tem certeza que deseja cancelar este evento?')) {
      console.log('Cancelando evento:', evento.id);
      alert('Evento cancelado com sucesso!');
      onClose();
    }
  };

  const handleExcluir = () => {
    if (confirm('Tem certeza que deseja EXCLUIR este evento? Esta ação não pode ser desfeita.')) {
      console.log('Excluindo evento:', evento.id);
      alert('Evento excluído com sucesso!');
      onClose();
    }
  };

  const handleNotificar = () => {
    console.log('Enviando notificações para:', evento.participantes);
    alert(`Notificações enviadas para ${evento.participantes} participantes!`);
  };

  const handleCompartilhar = () => {
    console.log('Compartilhando evento');
    alert('Link do evento copiado para a área de transferência!');
  };

  const handleExportar = () => {
    console.log('Exportando evento');
    alert('Exportando evento para o calendário...');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border-2 ${getTipoColor(evento.tipo)} bg-white/90`}>
                  {evento.tipo}
                </span>
                {getStatusBadge(evento.status)}
              </div>
              <h3 className="text-2xl font-bold mb-1">{evento.titulo}</h3>
              <p className="text-white/90 text-sm">{formatDate(evento.data)}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onEditar}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
                title="Editar"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Informações Principais */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                Data e Horário
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-medium text-gray-800">{formatDate(evento.data)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horário:</span>
                  <span className="font-medium text-gray-800">
                    {evento.horaInicio} - {evento.horaFim}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duração:</span>
                  <span className="font-medium text-gray-800">2 horas</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                Local e Responsável
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Local:</span>
                  <span className="font-medium text-gray-800">{evento.local}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Responsável:</span>
                  <span className="font-medium text-gray-800">{evento.responsavel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Participantes:</span>
                  <span className="font-medium text-gray-800">{evento.participantes} pessoas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">Descrição</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {evento.descricao}
            </p>
          </div>

          {/* Turmas Envolvidas */}
          {evento.turmas && evento.turmas.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                Turmas Envolvidas
              </h4>
              <div className="flex flex-wrap gap-2">
                {evento.turmas.map((turma, index) => (
                  <span
                    key={index}
                    className="inline-flex px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium"
                  >
                    {turma}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ações Rápidas */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-gray-800 mb-3">Ações Rápidas</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleNotificar}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Notificar Participantes
              </button>
              <button
                onClick={handleCompartilhar}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Compartilhar
              </button>
              <button
                onClick={handleExportar}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                Exportar para Calendário
              </button>
              {evento.status !== 'CANCELADO' && (
                <button
                  onClick={handleCancelar}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <AlertCircle className="w-4 h-4" />
                  Cancelar Evento
                </button>
              )}
            </div>
          </div>

          {/* Linha do Tempo */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">Linha do Tempo</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Evento Criado</p>
                  <p className="text-xs text-gray-500">01/11/2024 às 10:30 por Maria Silva</p>
                </div>
              </div>
              {evento.status === 'CONFIRMADO' && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Evento Confirmado</p>
                    <p className="text-xs text-gray-500">05/11/2024 às 14:20 por Coordenação</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Notificações Enviadas</p>
                  <p className="text-xs text-gray-500">06/11/2024 às 09:00 para {evento.participantes} participantes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white flex justify-between">
          <button
            onClick={handleExcluir}
            className="flex items-center gap-2 px-6 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Excluir Evento
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={onEditar}
              className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Editar Evento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesEventoModal;