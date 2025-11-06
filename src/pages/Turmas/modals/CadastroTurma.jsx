// src/pages/Turmas/modals/CadastroTurma.jsx

import React, { useState } from 'react';
import { X, Users } from 'lucide-react';

const CadastroTurmaModal = ({ turma, onClose }) => {
  const [formData, setFormData] = useState({
    nome: turma?.nome || '',
    serie: turma?.serie || '',
    turno: turma?.turno || 'MATUTINO',
    anoLetivo: turma?.anoLetivo || 2025,
    capacidadeMaxima: turma?.capacidadeMaxima || 30,
    sala: turma?.sala || '',
    coordenadorId: turma?.coordenador?.id || '',
    professorTitularId: turma?.professorTitular?.id || ''
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Salvando turma:', formData);
    alert(turma ? 'Turma atualizada com sucesso!' : 'Turma cadastrada com sucesso!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6" />
              <h3 className="text-xl font-bold">
                {turma ? 'Editar Turma' : 'Nova Turma'}
              </h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informações Básicas */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Informações Básicas</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Turma *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  placeholder="Ex: 5º Ano A"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Série *
                </label>
                <select
                  required
                  value={formData.serie}
                  onChange={(e) => handleChange('serie', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Selecione...</option>
                  <option value="1º Ano">1º Ano</option>
                  <option value="2º Ano">2º Ano</option>
                  <option value="3º Ano">3º Ano</option>
                  <option value="4º Ano">4º Ano</option>
                  <option value="5º Ano">5º Ano</option>
                  <option value="6º Ano">6º Ano</option>
                  <option value="7º Ano">7º Ano</option>
                  <option value="8º Ano">8º Ano</option>
                  <option value="9º Ano">9º Ano</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turno *
                </label>
                <select
                  required
                  value={formData.turno}
                  onChange={(e) => handleChange('turno', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="MATUTINO">Matutino</option>
                  <option value="VESPERTINO">Vespertino</option>
                  <option value="NOTURNO">Noturno</option>
                  <option value="INTEGRAL">Integral</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ano Letivo *
                </label>
                <select
                  required
                  value={formData.anoLetivo}
                  onChange={(e) => handleChange('anoLetivo', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacidade Máxima *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.capacidadeMaxima}
                  onChange={(e) => handleChange('capacidadeMaxima', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sala *
                </label>
                <input
                  type="text"
                  required
                  value={formData.sala}
                  onChange={(e) => handleChange('sala', e.target.value)}
                  placeholder="Ex: 101"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Responsáveis */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Responsáveis</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coordenador *
                </label>
                <select
                  required
                  value={formData.coordenadorId}
                  onChange={(e) => handleChange('coordenadorId', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Selecione...</option>
                  <option value="1">Maria Silva</option>
                  <option value="2">Pedro Oliveira</option>
                  <option value="3">Ana Costa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professor Titular
                </label>
                <select
                  value={formData.professorTitularId}
                  onChange={(e) => handleChange('professorTitularId', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Selecione...</option>
                  <option value="1">João Santos</option>
                  <option value="2">Ana Costa</option>
                  <option value="3">Carlos Lima</option>
                  <option value="4">Paula Rocha</option>
                </select>
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <h4 className="font-medium text-teal-900 mb-2">ℹ️ Informações</h4>
            <ul className="text-sm text-teal-800 space-y-1">
              <li>• Após criar a turma, você poderá alocar alunos e professores</li>
              <li>• As disciplinas podem ser configuradas posteriormente</li>
              <li>• A capacidade máxima pode ser alterada a qualquer momento</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              {turma ? 'Atualizar Turma' : 'Criar Turma'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroTurmaModal;