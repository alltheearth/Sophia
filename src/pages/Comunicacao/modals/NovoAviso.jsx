// src/pages/Comunicacao/modals/NovoAviso.jsx

import React, { useState } from 'react';
import { X, Send, Calendar, Users, AlertCircle, Pin, Eye, Save } from 'lucide-react';

const NovoAvisoModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: 'INFORMATIVO',
    conteudo: '',
    destinatarios: [],
    prioridade: 'MEDIA',
    dataPublicacao: new Date().toISOString().split('T')[0],
    horaPublicacao: new Date().toTimeString().split(' ')[0].slice(0, 5),
    fixar: false,
    confirmarLeitura: true,
    enviarEmail: true,
    enviarSMS: false
  });

  const [step, setStep] = useState(1); // 1: Conteúdo, 2: Destinatários, 3: Configurações

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleDestinatario = (dest) => {
    if (formData.destinatarios.includes(dest)) {
      setFormData({
        ...formData,
        destinatarios: formData.destinatarios.filter(d => d !== dest)
      });
    } else {
      setFormData({
        ...formData,
        destinatarios: [...formData.destinatarios, dest]
      });
    }
  };

  const handleSalvarRascunho = () => {
    console.log('Salvando rascunho:', formData);
    alert('Rascunho salvo com sucesso!');
  };

  const handleAgendar = () => {
    console.log('Agendando aviso:', formData);
    alert(`Aviso agendado para ${formData.dataPublicacao} às ${formData.horaPublicacao}!`);
    onClose();
  };

  const handleEnviarAgora = () => {
    if (!formData.titulo || !formData.conteudo) {
      alert('Preencha o título e o conteúdo do aviso');
      return;
    }
    if (formData.destinatarios.length === 0) {
      alert('Selecione pelo menos um destinatário');
      return;
    }
    console.log('Enviando aviso:', formData);
    alert('Aviso enviado com sucesso!');
    onClose();
  };

  const destinatariosDisponiveis = [
    { id: 'todas', label: 'Todas as Turmas', count: 847 },
    { id: '5-ano-a', label: '5º Ano A', count: 28 },
    { id: '5-ano-b', label: '5º Ano B', count: 30 },
    { id: '4-ano-c', label: '4º Ano C', count: 25 },
    { id: '3-ano-a', label: '3º Ano A', count: 24 },
    { id: '2-ano-a', label: '2º Ano A', count: 22 },
    { id: 'professores', label: 'Professores', count: 52 },
    { id: 'coordenacao', label: 'Coordenação', count: 5 }
  ];

  const totalDestinatarios = formData.destinatarios.reduce((total, dest) => {
    const encontrado = destinatariosDisponiveis.find(d => d.id === dest);
    return total + (encontrado?.count || 0);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">Novo Aviso</h3>
              <p className="text-sm text-white/90">Crie e envie avisos para pais e responsáveis</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Steps */}
          <div className="flex items-center gap-4 mt-4">
            {[
              { num: 1, label: 'Conteúdo' },
              { num: 2, label: 'Destinatários' },
              { num: 3, label: 'Configurações' }
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                  step >= s.num ? 'bg-white text-pink-600' : 'bg-white/20 text-white'
                }`}>
                  {s.num}
                </div>
                <span className={`text-sm font-medium ${
                  step >= s.num ? 'text-white' : 'text-white/60'
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Conteúdo */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Aviso *
                </label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) => handleChange('titulo', e.target.value)}
                  placeholder="Ex: Reunião de Pais - 1º Bimestre"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Aviso *
                  </label>
                  <select
                    required
                    value={formData.tipo}
                    onChange={(e) => handleChange('tipo', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="INFORMATIVO">Informativo</option>
                    <option value="REUNIAO">Reunião</option>
                    <option value="EVENTO">Evento</option>
                    <option value="ADMINISTRATIVO">Administrativo</option>
                    <option value="FERIADO">Feriado</option>
                    <option value="URGENTE">Urgente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioridade *
                  </label>
                  <select
                    required
                    value={formData.prioridade}
                    onChange={(e) => handleChange('prioridade', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="BAIXA">Baixa</option>
                    <option value="MEDIA">Média</option>
                    <option value="ALTA">Alta</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conteúdo do Aviso *
                </label>
                <textarea
                  required
                  value={formData.conteudo}
                  onChange={(e) => handleChange('conteudo', e.target.value)}
                  rows={10}
                  placeholder="Digite aqui o conteúdo completo do aviso..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.conteudo.length} caracteres
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Dica de Redação</p>
                    <ul className="text-xs space-y-1">
                      <li>• Seja claro e objetivo na comunicação</li>
                      <li>• Inclua data, horário e local quando relevante</li>
                      <li>• Use uma linguagem acessível e respeitosa</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Destinatários */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-purple-900">Destinatários Selecionados</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      {formData.destinatarios.length === 0 
                        ? 'Nenhum destinatário selecionado' 
                        : `${totalDestinatarios} pessoa(s) receberão este aviso`}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">Selecione os Destinatários</h4>
                <div className="grid grid-cols-2 gap-3">
                  {destinatariosDisponiveis.map((dest) => (
                    <div
                      key={dest.id}
                      onClick={() => toggleDestinatario(dest.id)}
                      className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.destinatarios.includes(dest.id)
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          formData.destinatarios.includes(dest.id)
                            ? 'border-pink-500 bg-pink-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.destinatarios.includes(dest.id) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{dest.label}</p>
                          <p className="text-xs text-gray-500">{dest.count} pessoa(s)</p>
                        </div>
                      </div>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Configurações */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Agendar Publicação</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Publicação
                    </label>
                    <input
                      type="date"
                      value={formData.dataPublicacao}
                      onChange={(e) => handleChange('dataPublicacao', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horário
                    </label>
                    <input
                      type="time"
                      value={formData.horaPublicacao}
                      onChange={(e) => handleChange('horaPublicacao', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">Opções Adicionais</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={formData.fixar}
                      onChange={(e) => handleChange('fixar', e.target.checked)}
                      className="rounded"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Pin className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Fixar Aviso</p>
                        <p className="text-xs text-gray-500">Manter o aviso no topo da lista</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={formData.confirmarLeitura}
                      onChange={(e) => handleChange('confirmarLeitura', e.target.checked)}
                      className="rounded"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Eye className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Solicitar Confirmação de Leitura</p>
                        <p className="text-xs text-gray-500">Rastrear quem leu o aviso</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={formData.enviarEmail}
                      onChange={(e) => handleChange('enviarEmail', e.target.checked)}
                      className="rounded"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Send className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Enviar por Email</p>
                        <p className="text-xs text-gray-500">Notificar por email automaticamente</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={formData.enviarSMS}
                      onChange={(e) => handleChange('enviarSMS', e.target.checked)}
                      className="rounded"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Send className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Enviar por SMS</p>
                        <p className="text-xs text-gray-500">Notificar por mensagem de texto</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Preview */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-800 mb-3">Pré-visualização</h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-800 mb-1">{formData.titulo || 'Título do Aviso'}</h5>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {formData.conteudo || 'Conteúdo do aviso aparecerá aqui...'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formData.dataPublicacao}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {totalDestinatarios} destinatários
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white flex justify-between">
          <div>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Voltar
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSalvarRascunho}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              Salvar Rascunho
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                Próximo
              </button>
            ) : (
              <>
                <button
                  onClick={handleAgendar}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Agendar
                </button>
                <button
                  onClick={handleEnviarAgora}
                  className="flex items-center gap-2 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Enviar Agora
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovoAvisoModal;