// src/pages/Notas/modals/LancarNotas.jsx

import React, { useState } from 'react';
import { X, Save, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

const LancarNotasModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    turma: '',
    disciplina: '',
    periodo: '3º Bimestre',
    tipoAvaliacao: 'PROVA'
  });

  // Alunos mockados
  const [alunos, setAlunos] = useState([
    { id: 1, nome: 'Ana Carolina Silva', matricula: '2024001', nota: '', observacao: '' },
    { id: 2, nome: 'Pedro Henrique Santos', matricula: '2024002', nota: '', observacao: '' },
    { id: 3, nome: 'Juliana Oliveira Costa', matricula: '2024003', nota: '', observacao: '' },
    { id: 4, nome: 'Lucas Gabriel Ferreira', matricula: '2024004', nota: '', observacao: '' },
    { id: 5, nome: 'Beatriz Almeida Rocha', matricula: '2024005', nota: '', observacao: '' }
  ]);

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNotaChange = (id, value) => {
    // Validar nota entre 0 e 10
    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 10)) {
      setAlunos(alunos.map(aluno => 
        aluno.id === id ? { ...aluno, nota: value } : aluno
      ));
    }
  };

  const handleObservacaoChange = (id, value) => {
    setAlunos(alunos.map(aluno => 
      aluno.id === id ? { ...aluno, observacao: value } : aluno
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar se há pelo menos uma nota lançada
    const notasLancadas = alunos.filter(a => a.nota !== '');
    if (notasLancadas.length === 0) {
      alert('É necessário lançar pelo menos uma nota!');
      return;
    }

    console.log('Lançando notas:', { ...formData, alunos: notasLancadas });
    alert(`${notasLancadas.length} notas lançadas com sucesso!`);
    onClose();
  };

  const aplicarNotaGeral = () => {
    const nota = prompt('Digite a nota a ser aplicada para todos os alunos (0-10):');
    if (nota !== null && nota !== '' && parseFloat(nota) >= 0 && parseFloat(nota) <= 10) {
      setAlunos(alunos.map(aluno => ({ ...aluno, nota })));
    }
  };

  const limparNotas = () => {
    if (confirm('Deseja limpar todas as notas lançadas?')) {
      setAlunos(alunos.map(aluno => ({ ...aluno, nota: '', observacao: '' })));
    }
  };

  const getNotaColor = (nota) => {
    if (nota === '') return 'border-gray-300';
    const n = parseFloat(nota);
    if (n >= 8) return 'border-green-500 bg-green-50';
    if (n >= 7) return 'border-blue-500 bg-blue-50';
    if (n >= 5) return 'border-yellow-500 bg-yellow-50';
    return 'border-red-500 bg-red-50';
  };

  const calcularMedia = () => {
    const notasValidas = alunos.filter(a => a.nota !== '').map(a => parseFloat(a.nota));
    if (notasValidas.length === 0) return 0;
    return (notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length).toFixed(1);
  };

  const notasLancadasCount = alunos.filter(a => a.nota !== '').length;
  const mediaGeral = calcularMedia();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">Lançar Notas</h3>
              <p className="text-sm text-white/90">Registre as notas das avaliações</p>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  Período *
                </label>
                <select
                  required
                  value={formData.periodo}
                  onChange={(e) => handleFormChange('periodo', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="1º Bimestre">1º Bimestre</option>
                  <option value="2º Bimestre">2º Bimestre</option>
                  <option value="3º Bimestre">3º Bimestre</option>
                  <option value="4º Bimestre">4º Bimestre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Avaliação *
                </label>
                <select
                  required
                  value={formData.tipoAvaliacao}
                  onChange={(e) => handleFormChange('tipoAvaliacao', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="PROVA">Prova</option>
                  <option value="TRABALHO">Trabalho</option>
                  <option value="SEMINARIO">Seminário</option>
                  <option value="PARTICIPACAO">Participação</option>
                  <option value="ATIVIDADE">Atividade</option>
                </select>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="p-6 bg-indigo-50 border-b border-indigo-200">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
                <p className="text-sm text-gray-600">Notas Lançadas</p>
                <p className="text-2xl font-bold text-indigo-600 mt-1">
                  {notasLancadasCount}/{alunos.length}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                <p className="text-sm text-gray-600">Média da Turma</p>
                <p className="text-2xl font-bold text-blue-600 mt-1 flex items-center gap-2">
                  {mediaGeral}
                  <TrendingUp className="w-5 h-5" />
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                <p className="text-sm text-gray-600">Aproveitamento</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {mediaGeral >= 7 ? 'Bom' : mediaGeral >= 5 ? 'Regular' : 'Baixo'}
                </p>
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="p-6 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4" />
              <span>Notas devem estar entre 0 e 10</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={aplicarNotaGeral}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                Aplicar Nota Geral
              </button>
              <button
                type="button"
                onClick={limparNotas}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
              >
                Limpar Notas
              </button>
            </div>
          </div>

          {/* Tabela de Alunos */}
          <div className="p-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aluno</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Matrícula</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Nota (0-10)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Observação</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {alunos.map((aluno, index) => (
                    <tr key={aluno.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {aluno.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                          </div>
                          <span className="text-sm font-medium text-gray-800">{aluno.nome}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{aluno.matricula}</td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={aluno.nota}
                          onChange={(e) => handleNotaChange(aluno.id, e.target.value)}
                          placeholder="0.0"
                          className={`w-20 px-3 py-2 text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold ${getNotaColor(aluno.nota)}`}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={aluno.observacao}
                          onChange={(e) => handleObservacaoChange(aluno.id, e.target.value)}
                          placeholder="Observação opcional..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        {aluno.nota !== '' ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full mx-auto"></div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {notasLancadasCount > 0 ? (
              <span className="text-indigo-600 font-medium">
                {notasLancadasCount} de {alunos.length} notas lançadas
              </span>
            ) : (
              <span>Nenhuma nota lançada ainda</span>
            )}
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
              disabled={notasLancadasCount === 0}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              Salvar Notas ({notasLancadasCount})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LancarNotasModal;