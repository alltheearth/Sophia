// src/pages/Turmas/modals/AlocarAlunos.jsx

import React, { useState } from 'react';
import { X, Search, Users, ArrowRight, ArrowLeft, Check, AlertCircle } from 'lucide-react';

const AlocarAlunosModal = ({ turma, onClose }) => {
  const [searchDisponivel, setSearchDisponivel] = useState('');
  const [searchAlocados, setSearchAlocados] = useState('');
  const [selectedDisponivel, setSelectedDisponivel] = useState([]);
  const [selectedAlocados, setSelectedAlocados] = useState([]);

  // Alunos disponíveis mockados
  const [alunosDisponiveis, setAlunosDisponiveis] = useState([
    { id: 6, nome: 'Rafael dos Santos Lima', matricula: '2024006', serie: '5º Ano', foto: null },
    { id: 7, nome: 'Mariana Costa Oliveira', matricula: '2024007', serie: '5º Ano', foto: null },
    { id: 8, nome: 'Gabriel Henrique Souza', matricula: '2024008', serie: '5º Ano', foto: null },
    { id: 9, nome: 'Isabella Ferreira Rocha', matricula: '2024009', serie: '5º Ano', foto: null },
    { id: 10, nome: 'Matheus Oliveira Silva', matricula: '2024010', serie: '5º Ano', foto: null }
  ]);

  // Alunos já alocados
  const [alunosAlocados, setAlunosAlocados] = useState([
    { id: 1, nome: 'Ana Carolina Silva', matricula: '2024001', serie: '5º Ano', foto: null },
    { id: 2, nome: 'Pedro Henrique Santos', matricula: '2024002', serie: '5º Ano', foto: null },
    { id: 3, nome: 'Juliana Oliveira Costa', matricula: '2024003', serie: '5º Ano', foto: null }
  ]);

  const vagasDisponiveis = turma.capacidadeMaxima - alunosAlocados.length;
  const percentualOcupacao = ((alunosAlocados.length / turma.capacidadeMaxima) * 100).toFixed(0);

  // Filtrar alunos
  const alunosDisponiveisFiltrados = alunosDisponiveis.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchDisponivel.toLowerCase()) ||
    aluno.matricula.includes(searchDisponivel)
  );

  const alunosAlocadosFiltrados = alunosAlocados.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchAlocados.toLowerCase()) ||
    aluno.matricula.includes(searchAlocados)
  );

  // Selecionar/Desselecionar
  const toggleSelectDisponivel = (id) => {
    if (selectedDisponivel.includes(id)) {
      setSelectedDisponivel(selectedDisponivel.filter(i => i !== id));
    } else {
      setSelectedDisponivel([...selectedDisponivel, id]);
    }
  };

  const toggleSelectAlocados = (id) => {
    if (selectedAlocados.includes(id)) {
      setSelectedAlocados(selectedAlocados.filter(i => i !== id));
    } else {
      setSelectedAlocados([...selectedAlocados, id]);
    }
  };

  // Alocar alunos selecionados
  const handleAlocar = () => {
    if (selectedDisponivel.length === 0) return;
    
    if (alunosAlocados.length + selectedDisponivel.length > turma.capacidadeMaxima) {
      alert('Capacidade máxima da turma atingida!');
      return;
    }

    const alunosParaAlocar = alunosDisponiveis.filter(a => selectedDisponivel.includes(a.id));
    setAlunosAlocados([...alunosAlocados, ...alunosParaAlocar]);
    setAlunosDisponiveis(alunosDisponiveis.filter(a => !selectedDisponivel.includes(a.id)));
    setSelectedDisponivel([]);
  };

  // Remover alunos selecionados
  const handleRemover = () => {
    if (selectedAlocados.length === 0) return;

    const alunosParaRemover = alunosAlocados.filter(a => selectedAlocados.includes(a.id));
    setAlunosDisponiveis([...alunosDisponiveis, ...alunosParaRemover]);
    setAlunosAlocados(alunosAlocados.filter(a => !selectedAlocados.includes(a.id)));
    setSelectedAlocados([]);
  };

  const handleSalvar = () => {
    console.log('Salvando alocações:', alunosAlocados);
    alert(`${alunosAlocados.length} alunos alocados na turma ${turma.nome}`);
    onClose();
  };

  const getIniciais = (nome) => {
    return nome.split(' ').map(n => n[0]).slice(0, 2).join('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">Alocar Alunos</h3>
              <p className="text-sm text-white/90">
                {turma.nome} - {turma.serie} ({turma.turno})
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status da Turma */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">Ocupação da Turma</p>
              <p className="text-2xl font-bold text-gray-800">
                {alunosAlocados.length}/{turma.capacidadeMaxima}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Vagas Disponíveis</p>
              <p className={`text-2xl font-bold ${
                vagasDisponiveis <= 2 ? 'text-red-600' : 
                vagasDisponiveis <= 5 ? 'text-yellow-600' : 
                'text-green-600'
              }`}>
                {vagasDisponiveis}
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all ${
                percentualOcupacao >= 95 ? 'bg-red-500' :
                percentualOcupacao >= 80 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${percentualOcupacao}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">{percentualOcupacao}% ocupado</p>
        </div>

        {/* Container Principal */}
        <div className="flex-1 overflow-hidden flex">
          {/* Alunos Disponíveis */}
          <div className="flex-1 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600" />
                Alunos Disponíveis ({alunosDisponiveis.length})
              </h4>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou matrícula..."
                  value={searchDisponivel}
                  onChange={(e) => setSearchDisponivel(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {alunosDisponiveisFiltrados.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Nenhum aluno disponível</p>
                </div>
              ) : (
                alunosDisponiveisFiltrados.map((aluno) => (
                  <div
                    key={aluno.id}
                    onClick={() => toggleSelectDisponivel(aluno.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedDisponivel.includes(aluno.id)
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                      selectedDisponivel.includes(aluno.id)
                        ? 'bg-teal-500'
                        : 'bg-gradient-to-br from-blue-400 to-purple-500'
                    }`}>
                      {selectedDisponivel.includes(aluno.id) ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        getIniciais(aluno.nome)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{aluno.nome}</p>
                      <p className="text-xs text-gray-500">Mat: {aluno.matricula}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="w-24 flex flex-col items-center justify-center gap-4 bg-gray-50">
            <button
              onClick={handleAlocar}
              disabled={selectedDisponivel.length === 0 || vagasDisponiveis === 0}
              className="flex items-center justify-center w-12 h-12 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Alocar Selecionados"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleRemover}
              disabled={selectedAlocados.length === 0}
              className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Remover Selecionados"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Alunos Alocados */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-600" />
                Alunos Alocados ({alunosAlocados.length})
              </h4>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou matrícula..."
                  value={searchAlocados}
                  onChange={(e) => setSearchAlocados(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {alunosAlocadosFiltrados.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Nenhum aluno alocado</p>
                </div>
              ) : (
                alunosAlocadosFiltrados.map((aluno) => (
                  <div
                    key={aluno.id}
                    onClick={() => toggleSelectAlocados(aluno.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAlocados.includes(aluno.id)
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                      selectedAlocados.includes(aluno.id)
                        ? 'bg-red-500'
                        : 'bg-gradient-to-br from-teal-400 to-cyan-500'
                    }`}>
                      {selectedAlocados.includes(aluno.id) ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        getIniciais(aluno.nome)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{aluno.nome}</p>
                      <p className="text-xs text-gray-500">Mat: {aluno.matricula}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div className="p-4 bg-blue-50 border-t border-blue-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Como usar:</p>
              <ul className="space-y-1 text-xs">
                <li>• Clique nos alunos para selecioná-los (múltipla seleção)</li>
                <li>• Use as setas no centro para alocar ou remover</li>
                <li>• A capacidade máxima da turma é de {turma.capacidadeMaxima} alunos</li>
                <li>• Clique em "Confirmar Alocação" para salvar as alterações</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {selectedDisponivel.length > 0 && (
              <span className="text-teal-600 font-medium">
                {selectedDisponivel.length} aluno(s) selecionado(s) para alocar
              </span>
            )}
            {selectedAlocados.length > 0 && (
              <span className="text-red-600 font-medium">
                {selectedAlocados.length} aluno(s) selecionado(s) para remover
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSalvar}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Confirmar Alocação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlocarAlunosModal;