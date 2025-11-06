// src/pages/Notas/modals/Boletim.jsx

import React, { useState } from 'react';
import { X, Download, Printer, Mail, FileText, TrendingUp, TrendingDown, Award, AlertCircle } from 'lucide-react';

const BoletimModal = ({ aluno, onClose }) => {
  const [periodo, setPeriodo] = useState('COMPLETO');

  // Dados mockados do boletim
  const boletim = {
    disciplinas: [
      {
        nome: 'Matemática',
        professor: 'João Santos',
        bim1: 8.5,
        bim2: 9.0,
        bim3: 7.5,
        bim4: 8.0,
        media: 8.3,
        faltas: 2,
        totalAulas: 80
      },
      {
        nome: 'Português',
        professor: 'Ana Costa',
        bim1: 9.0,
        bim2: 8.5,
        bim3: 9.5,
        bim4: 9.0,
        media: 9.0,
        faltas: 0,
        totalAulas: 80
      },
      {
        nome: 'Ciências',
        professor: 'Carlos Lima',
        bim1: 7.0,
        bim2: 8.0,
        bim3: 8.5,
        bim4: 8.0,
        media: 7.9,
        faltas: 3,
        totalAulas: 60
      },
      {
        nome: 'História',
        professor: 'Paula Rocha',
        bim1: 8.0,
        bim2: 8.5,
        bim3: 9.0,
        bim4: 8.5,
        media: 8.5,
        faltas: 1,
        totalAulas: 60
      },
      {
        nome: 'Geografia',
        professor: 'Roberto Alves',
        bim1: 7.5,
        bim2: 8.0,
        bim3: 8.0,
        bim4: 7.5,
        media: 7.8,
        faltas: 2,
        totalAulas: 60
      },
      {
        nome: 'Educação Física',
        professor: 'Roberto Lima',
        bim1: 9.5,
        bim2: 9.0,
        bim3: 9.5,
        bim4: 9.0,
        media: 9.3,
        faltas: 0,
        totalAulas: 40
      }
    ],
    comportamento: {
      disciplina: 'Bom',
      participacao: 'Excelente',
      relacionamento: 'Muito Bom',
      observacoes: 'Aluno exemplar, sempre participa das aulas e ajuda os colegas. Demonstra grande interesse pelo aprendizado.'
    }
  };

  const calcularMediaGeral = () => {
    const soma = boletim.disciplinas.reduce((acc, disc) => acc + disc.media, 0);
    return (soma / boletim.disciplinas.length).toFixed(1);
  };

  const calcularFrequenciaGeral = () => {
    const totalAulas = boletim.disciplinas.reduce((acc, disc) => acc + disc.totalAulas, 0);
    const totalFaltas = boletim.disciplinas.reduce((acc, disc) => acc + disc.faltas, 0);
    return (((totalAulas - totalFaltas) / totalAulas) * 100).toFixed(1);
  };

  const getMediaColor = (media) => {
    if (media >= 8) return 'text-green-600 bg-green-50';
    if (media >= 7) return 'text-blue-600 bg-blue-50';
    if (media >= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const mediaGeral = calcularMediaGeral();
  const frequenciaGeral = calcularFrequenciaGeral();
  const situacao = mediaGeral >= 7 && frequenciaGeral >= 75 ? 'APROVADO' : mediaGeral >= 5 ? 'RECUPERAÇÃO' : 'REPROVADO';

  const handleDownload = () => {
    console.log('Baixar boletim PDF');
    alert('Gerando PDF do boletim...');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    console.log('Enviar por email');
    alert('Enviando boletim por email para os responsáveis...');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600 text-white print:bg-white print:text-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white/30">
                {aluno.foto ? (
                  <img src={aluno.foto} alt={aluno.nome} className="w-full h-full rounded-full object-cover" />
                ) : (
                  aluno.nome.split(' ').map(n => n[0]).slice(0, 2).join('')
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Boletim Escolar</h3>
                <p className="text-sm text-white/90">{aluno.nome} - Mat: {aluno.matricula}</p>
                <p className="text-xs text-white/80">Ano Letivo 2025 - 5º Ano A</p>
              </div>
            </div>
            <div className="flex gap-2 print:hidden">
              <button
                onClick={handleEmail}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
                title="Enviar por Email"
              >
                <Mail className="w-5 h-5" />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
                title="Imprimir"
              >
                <Printer className="w-5 h-5" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
                title="Download PDF"
              >
                <Download className="w-5 h-5" />
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

        {/* Resumo Geral */}
        <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-200 print:bg-white">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-indigo-200 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Média Geral</p>
              <p className={`text-3xl font-bold ${getMediaColor(mediaGeral)} inline-flex items-center gap-2 px-3 py-1 rounded-lg`}>
                {mediaGeral}
                {mediaGeral >= 7 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border-2 border-green-200 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Frequência Geral</p>
              <p className={`text-3xl font-bold ${frequenciaGeral >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                {frequenciaGeral}%
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border-2 border-purple-200 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Situação</p>
              <p className={`text-2xl font-bold ${
                situacao === 'APROVADO' ? 'text-green-600' :
                situacao === 'RECUPERAÇÃO' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {situacao}
              </p>
            </div>
          </div>
        </div>

        {/* Filtro de Período */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between print:hidden">
          <h4 className="font-medium text-gray-800">Notas por Disciplina</h4>
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="COMPLETO">Ano Completo</option>
            <option value="1">1º Bimestre</option>
            <option value="2">2º Bimestre</option>
            <option value="3">3º Bimestre</option>
            <option value="4">4º Bimestre</option>
          </select>
        </div>

        {/* Tabela de Notas */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disciplina</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Professor</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">1º Bim</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">2º Bim</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">3º Bim</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">4º Bim</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Média</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Faltas</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Freq.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {boletim.disciplinas.map((disc, index) => {
                  const frequencia = (((disc.totalAulas - disc.faltas) / disc.totalAulas) * 100).toFixed(0);
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-indigo-500" />
                          <span className="text-sm font-medium text-gray-800">{disc.nome}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{disc.professor}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-2 py-1 rounded text-sm font-medium ${getMediaColor(disc.bim1)}`}>
                          {disc.bim1}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-2 py-1 rounded text-sm font-medium ${getMediaColor(disc.bim2)}`}>
                          {disc.bim2}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-2 py-1 rounded text-sm font-medium ${getMediaColor(disc.bim3)}`}>
                          {disc.bim3}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-2 py-1 rounded text-sm font-medium ${getMediaColor(disc.bim4)}`}>
                          {disc.bim4}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${getMediaColor(disc.media)}`}>
                          {disc.media}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm text-gray-800">{disc.faltas}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-sm font-medium ${
                          frequencia >= 75 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {frequencia}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-indigo-50">
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-right text-sm font-bold text-gray-800">
                    MÉDIA GERAL
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${getMediaColor(mediaGeral)}`}>
                      {mediaGeral}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-gray-800">
                    {boletim.disciplinas.reduce((acc, disc) => acc + disc.faltas, 0)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-sm font-bold ${
                      frequenciaGeral >= 75 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {frequenciaGeral}%
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Comportamento e Observações */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                Comportamento
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Disciplina:</span>
                  <span className="font-medium text-gray-800">{boletim.comportamento.disciplina}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Participação:</span>
                  <span className="font-medium text-gray-800">{boletim.comportamento.participacao}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Relacionamento:</span>
                  <span className="font-medium text-gray-800">{boletim.comportamento.relacionamento}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-indigo-600" />
                Observações
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {boletim.comportamento.observacoes}
              </p>
            </div>
          </div>

          {/* Legenda */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">📊 Legenda de Notas</h4>
            <div className="grid grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 border-2 border-green-500 rounded"></div>
                <span className="text-gray-700">8.0 - 10.0: Excelente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 border-2 border-blue-500 rounded"></div>
                <span className="text-gray-700">7.0 - 7.9: Bom</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-100 border-2 border-yellow-500 rounded"></div>
                <span className="text-gray-700">5.0 - 6.9: Regular</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-100 border-2 border-red-500 rounded"></div>
                <span className="text-gray-700">0.0 - 4.9: Insuficiente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white flex justify-between print:hidden">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Fechar
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleEmail}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Enviar por Email
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoletimModal;