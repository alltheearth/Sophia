// src/pages/Agenda/modals/CadastroEvento.jsx

import React, { useState } from 'react';
import { X, Calendar, Save, AlertCircle } from 'lucide-react';

const CadastroEventoModal = ({ evento, onClose }) => {
  const [formData, setFormData] = useState({
    titulo: evento?.titulo || '',
    tipo: evento?.tipo || 'EVENTO',
    data: evento?.data || new Date().toISOString().split('T')[0],
    horaInicio: evento?.horaInicio || '08:00',
    horaFim: evento?.horaFim || '10:00',
    local: evento?.local || '',
    descricao: evento?.descricao || '',
    turmas: evento?.turmas || [],
    responsavel: evento?.responsavel || '',
    participantes: evento?.participantes || 0,
    status: evento?.status || 'AGENDADO',
    notificar: true,
    repetir: false,
    frequenciaRepeticao: 'SEMANAL'
  });

  const turmasDisponiveis = [
    '1º Ano A', '1º Ano B',
    '2º Ano A', '2º Ano B',
    '3º Ano A', '3º Ano B',
    '4º Ano A', '4º Ano C',
    '5º Ano A', '5º Ano B', '5º Ano C'
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTurmaToggle = (turma) => {
    const turmas = formData.turmas.includes(turma)
      ? formData.turmas.filter(t => t !== turma)
      : [...formData.turmas, turma];
    setFormData({ ...formData, turmas });
  };

  const selecionarTodasTurmas = () => {
    setFormData({ ...formData, turmas: ['TODAS'] });
  };

  const limparTurmas = () => {
    setFormData({ ...formData, turmas: [] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Salvando evento:', formData);
    alert(evento ? 'Evento atualizado com sucesso!' : 'Evento cadastrado com sucesso!');
    onClose();
  };

  const getTipoColor = (tipo) => {
    const colors = {
      'REUNIAO': 'border-blue-500 bg-blue-50',
      'PROVA': 'border-red-500 bg-red-50',
      'EVENTO': 'border-green-500 bg-green-50',
      'FERIADO': 'border-gray-500 bg-gray-50',
      'ADMINISTRATIVO': 'border-orange-500 bg-orange-50',
      'CULTURAL': 'border-purple-500 bg-purple-50',
      'ESPORTIVO': 'border-teal-500 bg-teal-50'
    };
    return colors[tipo] || '';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              <h3 className="text-xl font-bold">
                {evento ? 'Editar Evento' : 'Novo Evento'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Informações Básicas */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Informações Básicas</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Evento *
                </label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) => handleChange('titulo', e.target.value)}
                  placeholder="Ex: Reunião de Pais - 1º Ano"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Evento *
                </label>
                <select
                  required
                  value={formData.tipo}
                  onChange={(e) => handleChange('tipo', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="REUNIAO">Reunião</option>
                  <option value="PROVA">Prova</option>
                  <option value="EVENTO">Evento</option>
                  <option value="FERIADO">Feriado</option>
                  <option value="ADMINISTRATIVO">Administrativo</option>
                  <option value="CULTURAL">Cultural</option>
                  <option value="ESPORTIVO">Esportivo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="AGENDADO">Agendado</option>
                  <option value="CONFIRMADO">Confirmado</option>
                  <option value="CANCELADO">Cancelado</option>
                  <option value="REALIZADO">Realizado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data e Horário */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Data e Horário</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  required
                  value={formData.data}
                  onChange={(e) => handleChange('data', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora Início *
                </label>
                <input
                  type="time"
                  required
                  value={formData.horaInicio}
                  onChange={(e) => handleChange('horaInicio', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora Fim *
                </label>
                <input
                  type="time"
                  required
                  value={formData.horaFim}
                  onChange={(e) => handleChange('horaFim', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Local e Responsável */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local *
              </label>
              <input
                type="text"
                required
                value={formData.local}
                onChange={(e) => handleChange('local', e.target.value)}
                placeholder="Ex: Auditório Principal"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responsável *
              </label>
              <input
                type="text"
                required
                value={formData.responsavel}
                onChange={(e) => handleChange('responsavel', e.target.value)}
                placeholder="Nome do responsável"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              rows={4}
              placeholder="Descreva os detalhes do evento..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Turmas */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Turmas Envolvidas
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selecionarTodasTurmas}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Selecionar Todas
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={limparTurmas}
                  className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                >
                  Limpar
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {turmasDisponiveis.map((turma) => (
                <label
                  key={turma}
                  className={`flex items-center gap-2 px-3 py-2 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.turmas.includes(turma) || formData.turmas.includes('TODAS')
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.turmas.includes(turma) || formData.turmas.includes('TODAS')}
                    onChange={() => handleTurmaToggle(turma)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">{turma}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Configurações Adicionais */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Configurações Adicionais</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.notificar}
                  onChange={(e) => handleChange('notificar', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Notificar participantes por email</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.repetir}
                  onChange={(e) => handleChange('repetir', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Repetir evento</span>
              </label>
              {formData.repetir && (
                <div className="ml-6">
                  <select
                    value={formData.frequenciaRepeticao}
                    onChange={(e) => handleChange('frequenciaRepeticao', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="DIARIO">Diariamente</option>
                    <option value="SEMANAL">Semanalmente</option>
                    <option value="QUINZENAL">Quinzenalmente</option>
                    <option value="MENSAL">Mensalmente</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className={`border-2 rounded-lg p-4 ${getTipoColor(formData.tipo)}`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-gray-600" />
              <h4 className="font-medium text-gray-800">Preview do Evento</h4>
            </div>
            <p className="text-sm text-gray-700">
              <strong>{formData.titulo || 'Título do Evento'}</strong> será agendado para{' '}
              <strong>{new Date(formData.data).toLocaleDateString('pt-BR')}</strong> das{' '}
              <strong>{formData.horaInicio}</strong> às <strong>{formData.horaFim}</strong> no{' '}
              <strong>{formData.local || 'local a definir'}</strong>.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            {evento ? 'Atualizar Evento' : 'Criar Evento'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CadastroEventoModal; 