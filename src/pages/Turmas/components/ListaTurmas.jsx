// src/pages/Turmas/components/ListaTurmas.jsx

import React from 'react';
import { Eye, Edit, Users, UserPlus, BookOpen, GraduationCap, TrendingUp, MapPin } from 'lucide-react';

const ListaTurmas = ({ turmas, totalTurmas, visualizacao, onVerDetalhes, onEditar, onAlocarAlunos }) => {
  
  const getTurnoColor = (turno) => {
    const colors = {
      'MATUTINO': 'bg-orange-100 text-orange-700',
      'VESPERTINO': 'bg-purple-100 text-purple-700',
      'NOTURNO': 'bg-indigo-100 text-indigo-700',
      'INTEGRAL': 'bg-teal-100 text-teal-700'
    };
    return colors[turno] || colors.MATUTINO;
  };

  const getCapacidadeColor = (atual, maxima) => {
    const percentual = (atual / maxima) * 100;
    if (percentual >= 95) return 'text-red-600';
    if (percentual >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (visualizacao === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {turmas.map((turma) => (
          <div
            key={turma.id}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-teal-300 transition-all cursor-pointer"
            onClick={() => onVerDetalhes(turma)}
          >
            {/* Header do Card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{turma.nome}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTurnoColor(turma.turno)}`}>
                    {turma.turno}
                  </span>
                  <span className="text-xs text-gray-500">Ano {turma.anoLetivo}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {turma.nome.split(' ')[0].slice(0, 1)}
              </div>
            </div>

            {/* Capacidade */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Alunos</span>
                <span className={`text-sm font-bold ${getCapacidadeColor(turma.totalAlunos, turma.capacidadeMaxima)}`}>
                  {turma.totalAlunos}/{turma.capacidadeMaxima}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    (turma.totalAlunos / turma.capacidadeMaxima) * 100 >= 95 
                      ? 'bg-red-500' 
                      : (turma.totalAlunos / turma.capacidadeMaxima) * 100 >= 80
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${(turma.totalAlunos / turma.capacidadeMaxima) * 100}%` }}
                />
              </div>
            </div>

            {/* Informações */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Sala {turma.sala}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{turma.professorTitular.nome}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{turma.disciplinas.length} disciplinas</span>
              </div>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-xs text-blue-700 mb-1">Média Geral</p>
                <p className="text-lg font-bold text-blue-900">{turma.mediaGeral}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-xs text-green-700 mb-1">Frequência</p>
                <p className="text-lg font-bold text-green-900">{turma.frequenciaMedia}%</p>
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onVerDetalhes(turma);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                Ver
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAlocarAlunos(turma);
                }}
                className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                title="Alocar Alunos"
              >
                <UserPlus className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditar(turma);
                }}
                className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                title="Editar"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Visualização em Lista
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Turma</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Série/Turno</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Professor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sala</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Alunos</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Média</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Frequência</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {turmas.map((turma) => (
            <tr key={turma.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                    {turma.nome.split(' ')[0].slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{turma.nome}</p>
                    <p className="text-xs text-gray-500">Ano {turma.anoLetivo}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-gray-800">{turma.serie}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTurnoColor(turma.turno)}`}>
                  {turma.turno}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-800">{turma.professorTitular.nome}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-800">{turma.sala}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <p className={`text-sm font-bold ${getCapacidadeColor(turma.totalAlunos, turma.capacidadeMaxima)}`}>
                    {turma.totalAlunos}/{turma.capacidadeMaxima}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className={`h-1.5 rounded-full ${
                        (turma.totalAlunos / turma.capacidadeMaxima) * 100 >= 95 
                          ? 'bg-red-500' 
                          : (turma.totalAlunos / turma.capacidadeMaxima) * 100 >= 80
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                      }`}
                      style={{ width: `${(turma.totalAlunos / turma.capacidadeMaxima) * 100}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className={`text-sm font-medium ${turma.mediaGeral >= 7 ? 'text-green-600' : 'text-red-600'}`}>
                  {turma.mediaGeral}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className="text-sm text-gray-800">{turma.frequenciaMedia}%</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onVerDetalhes(turma)}
                    className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                    title="Ver Detalhes"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onAlocarAlunos(turma)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Alocar Alunos"
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEditar(turma)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {turmas.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhuma turma encontrada</p>
        </div>
      )}
    </div>
  );
};

export default ListaTurmas;