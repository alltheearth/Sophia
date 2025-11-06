// src/pages/Turmas/modals/DetalhesTurma.jsx

import React, { useState } from 'react';
import { X, Edit, Users, BookOpen, BarChart3, Clock, FileText, MapPin, GraduationCap, TrendingUp, Calendar, Download, UserPlus } from 'lucide-react';

const DetalhesTurmaModal = ({ turma, onClose, onEditar, onAlocarAlunos }) => {
  const [activeTab, setActiveTab] = useState('geral');

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Dados mockados de alunos
  const alunosMockados = [
    { id: 1, nome: 'Ana Carolina Silva', matricula: '2024001', media: 8.5, frequencia: 97 },
    { id: 2, nome: 'Pedro Henrique Santos', matricula: '2024002', media: 7.8, frequencia: 95 },
    { id: 3, nome: 'Juliana Oliveira Costa', matricula: '2024003', media: 9.0, frequencia: 98 },
    { id: 4, nome: 'Lucas Gabriel Ferreira', matricula: '2024004', media: 7.5, frequencia: 93 },
    { id: 5, nome: 'Beatriz Almeida Rocha', matricula: '2024005', media: 8.2, frequencia: 96 }
  ];

  // Horários mockados
  const horariosMockados = {
    'SEG': [
      { hora: '07:00', disciplina: 'Matemática', professor: 'João Santos' },
      { hora: '08:00', disciplina: 'Matemática', professor: 'João Santos' },
      { hora: '10:00', disciplina: 'Português', professor: 'Ana Costa' },
      { hora: '11:00', disciplina: 'Português', professor: 'Ana Costa' }
    ],
    'TER': [
      { hora: '07:00', disciplina: 'Ciências', professor: 'Carlos Lima' },
      { hora: '08:00', disciplina: 'Ciências', professor: 'Carlos Lima' },
      { hora: '10:00', disciplina: 'História', professor: 'Paula Rocha' }
    ],
    'QUA': [
      { hora: '07:00', disciplina: 'Matemática', professor: 'João Santos' },
      { hora: '08:00', disciplina: 'Geografia', professor: 'Roberto Alves' },
      { hora: '10:00', disciplina: 'Português', professor: 'Ana Costa' }
    ],
    'QUI': [
      { hora: '07:00', disciplina: 'Ciências', professor: 'Carlos Lima' },
      { hora: '08:00', disciplina: 'Matemática', professor: 'João Santos' },
      { hora: '10:00', disciplina: 'Ed. Física', professor: 'Roberto Lima' }
    ],
    'SEX': [
      { hora: '07:00', disciplina: 'História', professor: 'Paula Rocha' },
      { hora: '08:00', disciplina: 'Geografia', professor: 'Roberto Alves' },
      { hora: '10:00', disciplina: 'Artes', professor: 'Lucia Santos' }
    ]
  };

  const historicoMockado = [
    { data: '2024-11-01', tipo: 'NOTA', descricao: 'Notas do 3º bimestre lançadas' },
    { data: '2024-10-25', tipo: 'ALUNO', descricao: 'Novo aluno matriculado - Rafael dos Santos' },
    { data: '2024-10-15', tipo: 'REUNIAO', descricao: 'Reunião de pais realizada' },
    { data: '2024-09-20', tipo: 'EVENTO', descricao: 'Feira de ciências da turma' }
  ];

  const tabs = [
    { id: 'geral', label: 'Informações Gerais', icon: Users },
    { id: 'alunos', label: 'Alunos', icon: GraduationCap },
    { id: 'disciplinas', label: 'Disciplinas', icon: BookOpen },
    { id: 'desempenho', label: 'Desempenho', icon: BarChart3 },
    { id: 'horarios', label: 'Horários', icon: Clock }
  ];

  const getTurnoColor = (turno) => {
    const colors = {
      'MATUTINO': 'bg-orange-100 text-orange-700',
      'VESPERTINO': 'bg-purple-100 text-purple-700',
      'NOTURNO': 'bg-indigo-100 text-indigo-700',
      'INTEGRAL': 'bg-teal-100 text-teal-700'
    };
    return colors[turno] || colors.MATUTINO;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-2xl border-4 border-white/30">
                {turma.nome.split(' ')[0].slice(0, 1)}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{turma.nome}</h3>
                <div className="flex items-center gap-3 text-sm text-white/90">
                  <span>{turma.serie}</span>
                  <span>•</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getTurnoColor(turma.turno)} bg-white/20`}>
                    {turma.turno}
                  </span>
                  <span>•</span>
                  <span>{turma.totalAlunos}/{turma.capacidadeMaxima} alunos</span>
                  <span>•</span>
                  <span>Sala {turma.sala}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onAlocarAlunos}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Alocar Alunos
              </button>
              <button
                onClick={onEditar}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
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

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-teal-600 text-teal-600 bg-white'
                      : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Tab: Informações Gerais */}
          {activeTab === 'geral' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Informações Básicas */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-teal-600" />
                    Informações Básicas
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Série:</span>
                      <span className="font-medium text-gray-800">{turma.serie}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Turno:</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTurnoColor(turma.turno)}`}>
                        {turma.turno}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ano Letivo:</span>
                      <span className="font-medium text-gray-800">{turma.anoLetivo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sala:</span>
                      <span className="font-medium text-gray-800">{turma.sala}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacidade:</span>
                      <span className="font-medium text-gray-800">
                        {turma.totalAlunos}/{turma.capacidadeMaxima}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Responsáveis */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-teal-600" />
                    Responsáveis
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Coordenador:</p>
                      <p className="font-medium text-gray-800">{turma.coordenador.nome}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Professor Titular:</p>
                      <p className="font-medium text-gray-800">{turma.professorTitular.nome}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disciplinas Overview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4">Disciplinas ({turma.disciplinas.length})</h4>
                <div className="grid grid-cols-2 gap-3">
                  {turma.disciplinas.map((disc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{disc.nome}</p>
                        <p className="text-xs text-gray-600">{disc.professor}</p>
                      </div>
                      <BookOpen className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Alunos */}
          {activeTab === 'alunos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">Lista de Alunos</h4>
                  <p className="text-sm text-gray-600">
                    {turma.totalAlunos} alunos matriculados • {turma.capacidadeMaxima - turma.totalAlunos} vagas disponíveis
                  </p>
                </div>
                <button
                  onClick={onAlocarAlunos}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  <UserPlus className="w-4 h-4" />
                  Alocar Alunos
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aluno</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Matrícula</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Média</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Frequência</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {alunosMockados.map((aluno) => (
                      <tr key={aluno.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              {aluno.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </div>
                            <span className="text-sm font-medium text-gray-800">{aluno.nome}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{aluno.matricula}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`text-sm font-medium ${aluno.media >= 7 ? 'text-green-600' : 'text-red-600'}`}>
                            {aluno.media}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-800">{aluno.frequencia}%</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-red-600 hover:text-red-800 text-sm">Remover</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab: Disciplinas */}
          {activeTab === 'disciplinas' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">Disciplinas e Professores</h4>
                <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm">
                  <BookOpen className="w-4 h-4" />
                  Adicionar Disciplina
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {turma.disciplinas.map((disc, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-teal-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">{disc.nome}</h5>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            {disc.professor}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Desempenho */}
          {activeTab === 'desempenho' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700">Média Geral</p>
                  <p className="text-3xl font-bold text-blue-900 mt-2">{turma.mediaGeral}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    <TrendingUp className="w-3 h-3 inline" /> +0.3 vs bimestre anterior
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700">Frequência Média</p>
                  <p className="text-3xl font-bold text-green-900 mt-2">{turma.frequenciaMedia}%</p>
                  <p className="text-xs text-green-600 mt-1">Acima da meta (95%)</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm text-purple-700">Taxa de Aprovação</p>
                  <p className="text-3xl font-bold text-purple-900 mt-2">92%</p>
                  <p className="text-xs text-purple-600 mt-1">Baseado no último ano</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4">Desempenho por Disciplina</h4>
                <div className="space-y-3">
                  {turma.disciplinas.map((disc, index) => {
                    const media = (Math.random() * 3 + 7).toFixed(1);
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-32 text-sm text-gray-700">{disc.nome}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div 
                            className={`h-6 rounded-full flex items-center justify-end pr-3 ${
                              media >= 8 ? 'bg-green-500' : media >= 7 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(media / 10) * 100}%` }}
                          >
                            <span className="text-white text-xs font-medium">{media}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Horários */}
          {activeTab === 'horarios' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">Grade de Horários Semanal</h4>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <Download className="w-4 h-4" />
                  Exportar PDF
                </button>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {Object.entries(horariosMockados).map(([dia, aulas]) => (
                  <div key={dia} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-teal-500 text-white px-3 py-2 text-center font-medium text-sm">
                      {dia}
                    </div>
                    <div className="p-2 space-y-2">
                      {aulas.map((aula, index) => (
                        <div key={index} className="bg-gray-50 rounded p-2 text-xs">
                          <p className="font-medium text-gray-800">{aula.hora}</p>
                          <p className="text-teal-600 font-medium mt-1">{aula.disciplina}</p>
                          <p className="text-gray-600 text-xs">{aula.professor}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors"
          >
            Fechar
          </button>
          <div className="flex gap-3">
            <button
              onClick={onAlocarAlunos}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Alocar Alunos
            </button>
            <button
              onClick={onEditar}
              className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Editar Turma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesTurmaModal;