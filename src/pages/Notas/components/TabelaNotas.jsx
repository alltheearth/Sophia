// src/pages/Notas/components/TabelaNotas.jsx

import React from 'react';
import { Eye, Edit, FileText, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

const TabelaNotas = ({ notas, onVerBoletim }) => {
  
  const getMediaColor = (media) => {
    if (media >= 8) return 'text-green-600 bg-green-50';
    if (media >= 7) return 'text-blue-600 bg-blue-50';
    if (media >= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getFrequenciaColor = (freq) => {
    if (freq >= 90) return 'text-green-600';
    if (freq >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Agrupar por aluno
  const alunosAgrupados = notas.reduce((acc, nota) => {
    const alunoId = nota.aluno.id;
    if (!acc[alunoId]) {
      acc[alunoId] = {
        aluno: nota.aluno,
        notas: [],
        mediaGeral: 0,
        frequenciaMedia: 0
      };
    }
    acc[alunoId].notas.push(nota);
    return acc;
  }, {});

  // Calcular médias
  Object.values(alunosAgrupados).forEach(grupo => {
    const medias = grupo.notas.map(n => n.media);
    grupo.mediaGeral = (medias.reduce((a, b) => a + b, 0) / medias.length).toFixed(1);
    
    const frequencias = grupo.notas.map(n => n.frequencia);
    grupo.frequenciaMedia = Math.round(frequencias.reduce((a, b) => a + b, 0) / frequencias.length);
  });

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aluno
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Turma
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Média Geral
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Frequência
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.values(alunosAgrupados).map((grupo) => (
              <tr key={grupo.aluno.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {grupo.aluno.foto ? (
                        <img src={grupo.aluno.foto} alt={grupo.aluno.nome} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        grupo.aluno.nome.split(' ').map(n => n[0]).slice(0, 2).join('')
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{grupo.aluno.nome}</p>
                      <p className="text-xs text-gray-500">Mat: {grupo.aluno.matricula}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-800">{grupo.notas[0].turma}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getMediaColor(grupo.mediaGeral)}`}>
                      {grupo.mediaGeral}
                      {grupo.mediaGeral >= 7 ? (
                        <TrendingUp className="w-3 h-3 ml-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 ml-1" />
                      )}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`text-sm font-bold ${getFrequenciaColor(grupo.frequenciaMedia)}`}>
                    {grupo.frequenciaMedia}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    grupo.mediaGeral >= 7 && grupo.frequenciaMedia >= 75
                      ? 'bg-green-100 text-green-800'
                      : grupo.mediaGeral >= 5
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {grupo.mediaGeral >= 7 && grupo.frequenciaMedia >= 75
                      ? 'Aprovado'
                      : grupo.mediaGeral >= 5
                        ? 'Recuperação'
                        : 'Reprovado'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onVerBoletim(grupo.aluno)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Ver Boletim"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar Notas"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {notas.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhuma nota encontrada para os filtros selecionados</p>
        </div>
      )}
    </div>
  );
};

export default TabelaNotas;