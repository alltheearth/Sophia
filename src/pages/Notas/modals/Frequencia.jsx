// src/pages/Notas/modals/Frequencia.jsx

import React, { useState } from 'react';
import { X, Save, Calendar, Check, AlertCircle, Users } from 'lucide-react';

const FrequenciaModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    turma: '',
    disciplina: '',
    data: new Date().toISOString().split('T')[0],
    periodo: '1º Horário'
  });

  // Alunos mockados com estado de presença
  const [alunos, setAlunos] = useState([
    { id: 1, nome: 'Ana Carolina Silva', matricula: '2024001', presente: true },
    { id: 2, nome: 'Pedro Henrique Santos', matricula: '2024002', presente: true },
    { id: 3, nome: 'Juliana Oliveira Costa', matricula: '2024003', presente: true },
    { id: 4, nome: 'Lucas Gabriel Ferreira', matricula: '2024004', presente: false },
    { id: 5, nome: 'Beatriz Almeida Rocha', matricula: '2024005', presente: true },
    { id: 6, nome: 'Rafael dos Santos Lima', matricula: '2024006', presente: true },
    { id: 7, nome: 'Mariana Costa Oliveira', matricula: '2024007', presente: true },
    { id: 8, nome: 'Gabriel Henrique Souza', matricula: '2024008', presente: false }
  ]);

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const togglePresenca = (id) => {
    setAlunos(alunos.map(aluno => 
      aluno.id === id ? { ...aluno, presente: !aluno.presente } : aluno
    ));
  };

  const marcarTodosPresentes = () => {
    setAlunos(alunos.map(aluno => ({ ...aluno, presente: true })));
  };

  const marcarTodosFaltantes = () => {
    if (confirm('Deseja marcar TODOS os alunos como faltantes?')) {
      setAlunos(alunos.map(aluno => ({ ...aluno, presente: false })));
    }
  };

  const inverterPresenca = () => {
    setAlunos(alunos.map(aluno => ({ ...aluno, presente: !aluno.presente })));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const presencas = {
      ...formData,
      presentes: alunos.filter(a => a.presente).map(a => a.id),
      ausentes: alunos.filter(a => !a.presente).map(a => a.id)
    };

    console.log('Registrando frequência:', presencas);
    alert(`Frequência registrada!\n${presentes} presentes | ${ausentes} ausentes`);
    onClose();
  };

  const presentes = alunos.filter(a => a.presente).length;
  const ausentes = alunos.filter(a => !a.presente).length;
  const percentualPresenca = ((presentes / alunos.length) * 100).toFixed(0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Registrar Frequência</h3>
                <p className="text-sm text-white/90">Marque presença dos alunos</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          {/* Filtros */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turma *
                </label>
                <select
                  required
                  value={formData.turma}
                  onChange={(e) => handleFormChange('turma', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione...</option>
                  <option value="5º Ano A">5º Ano A</option>
                  <option value="5º Ano B">5º Ano B</option>
                  <option value="4º Ano C">4º Ano C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disciplina *
                </label>
                <select
                  required
                  value={formData.disciplina}
                  onChange={(e) => handleFormChange('disciplina', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione...</option>
                  <option value="Matemática">Matemática</option>
                  <option value="Português">Português</option>
                  <option value="Ciências">Ciências</option>
                  <option value="História">História</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  required
                  value={formData.data}
                  onChange={(e) => handleFormChange('data', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Período *
                </label>
                <select
                  required
                  value={formData.periodo}
                  onChange={(e) => handleFormChange('periodo', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1º Horário">1º Horário (07:00)</option>
                  <option value="2º Horário">2º Horário (08:00)</option>
                  <option value="3º Horário">3º Horário (09:00)</option>
                  <option value="4º Horário">4º Horário (10:00)</option>
                  <option value="5º Horário">5º Horário (11:00)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="p-6 bg-blue-50 border-b border-blue-200">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total de Alunos</p>
                    <p className="text-2xl font-bold text-gray-800">{alunos.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                <div className="flex items-center gap-3">
                  <Check className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Presentes</p>
                    <p className="text-2xl font-bold text-green-600">{presentes}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-red-200">
                <div className="flex items-center gap-3">
                  <X className="w-8 h-8 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Ausentes</p>
                    <p className="text-2xl font-bold text-red-600">{ausentes}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Percentual</p>
                    <p className="text-2xl font-bold text-purple-600">{percentualPresenca}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <AlertCircle className="w-4 h-4" />
                <span>Clique no card do aluno para alterar presença</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={marcarTodosPresentes}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                >
                  ✓ Todos Presentes
                </button>
                <button
                  type="button"
                  onClick={inverterPresenca}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  ⇄ Inverter
                </button>
                <button
                  type="button"
                  onClick={marcarTodosFaltantes}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  ✕ Todos Ausentes
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Alunos */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alunos.map((aluno, index) => (
                <div
                  key={aluno.id}
                  onClick={() => togglePresenca(aluno.id)}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    aluno.presente
                      ? 'bg-green-50 border-green-500 hover:bg-green-100'
                      : 'bg-red-50 border-red-500 hover:bg-red-100'
                  }`}
                >
                  {/* Número */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    aluno.presente ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {index + 1}
                  </div>

                  {/* Avatar e Nome */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        aluno.presente
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                          : 'bg-gradient-to-br from-red-400 to-rose-500'
                      }`}>
                        {aluno.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{aluno.nome}</p>
                        <p className="text-xs text-gray-500">Mat: {aluno.matricula}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    aluno.presente
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}>
                    {aluno.presente ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <X className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerta de Baixa Frequência */}
          {percentualPresenca < 75 && (
            <div className="mx-6 mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-900 font-medium mb-1">⚠️ Atenção: Frequência Abaixo do Esperado</h4>
                  <p className="text-red-800 text-sm">
                    A frequência atual está em {percentualPresenca}%. A frequência mínima recomendada é de 75%.
                    Verifique se todos os alunos foram marcados corretamente.
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-600">Presença: </span>
            <span className={`font-bold ${
              percentualPresenca >= 90 ? 'text-green-600' :
              percentualPresenca >= 75 ? 'text-blue-600' :
              percentualPresenca >= 60 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {presentes}/{alunos.length} alunos ({percentualPresenca}%)
            </span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Salvar Frequência
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequenciaModal; 