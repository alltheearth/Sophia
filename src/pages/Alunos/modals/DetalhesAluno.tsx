// src/pages/Alunos/modals/DetalhesAluno.jsx

import React, { useState } from 'react';
import { X, Edit, Phone, Mail, MapPin, Calendar, User, Users, Heart, FileText, BarChart3, DollarSign, BookOpen } from 'lucide-react';

const DetalhesAlunoModal = ({ aluno, onClose, onEditar }) => {
  const [activeTab, setActiveTab] = useState('dados'); // dados, responsaveis, notas, financeiro, historico

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Dados mockados de exemplo
  const notasExemplo = [
    { disciplina: 'Matemática', bimestre1: 8.5, bimestre2: 9.0, bimestre3: 7.5, media: 8.3 },
    { disciplina: 'Português', bimestre1: 9.0, bimestre2: 8.5, bimestre3: 9.5, media: 9.0 },
    { disciplina: 'Ciências', bimestre1: 7.0, bimestre2: 8.0, bimestre3: 8.5, media: 7.8 },
    { disciplina: 'História', bimestre1: 8.0, bimestre2: 8.5, bimestre3: 9.0, media: 8.5 }
  ];

  const mensalidadesExemplo = [
    { mes: '11/2024', valor: 850.00, status: 'PAGO', dataPagamento: '2024-11-08' },
    { mes: '10/2024', valor: 850.00, status: 'PAGO', dataPagamento: '2024-10-09' },
    { mes: '09/2024', valor: 850.00, status: 'PAGO', dataPagamento: '2024-09-10' }
  ];

  const historicoExemplo = [
    { data: '2024-11-01', tipo: 'MATRICULA', descricao: 'Aluno matriculado na turma 5º Ano A' },
    { data: '2024-10-15', tipo: 'NOTA', descricao: 'Notas do 3º bimestre lançadas' },
    { data: '2024-09-20', tipo: 'FREQUENCIA', descricao: '100% de presença no mês de setembro' }
  ];

  const tabs = [
    { id: 'dados', label: 'Dados Pessoais', icon: User },
    { id: 'responsaveis', label: 'Responsáveis', icon: Users },
    { id: 'notas', label: 'Notas', icon: BarChart3 },
    { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
    { id: 'historico', label: 'Histórico', icon: FileText }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-white/30">
                {aluno.foto ? (
                  <img src={aluno.foto} alt={aluno.nome} className="w-full h-full rounded-full object-cover" />
                ) : (
                  aluno.nome.split(' ').map(n => n[0]).slice(0, 2).join('')
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{aluno.nome}</h3>
                <div className="flex items-center gap-4 text-sm text-white/90">
                  <span>Mat: {aluno.matricula}</span>
                  <span>•</span>
                  <span>{calcularIdade(aluno.dataNascimento)} anos</span>
                  <span>•</span>
                  <span>{aluno.turma}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
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
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-white'
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
          {/* Tab: Dados Pessoais */}
          {activeTab === 'dados' && (
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Informações Pessoais
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Data de Nascimento:</span>
                    <p className="font-medium text-gray-800 mt-1">{formatDate(aluno.dataNascimento)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Idade:</span>
                    <p className="font-medium text-gray-800 mt-1">{calcularIdade(aluno.dataNascimento)} anos</p>
                  </div>
                  <div>
                    <span className="text-gray-600">CPF:</span>
                    <p className="font-medium text-gray-800 mt-1">{aluno.cpf || 'Não informado'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">RG:</span>
                    <p className="font-medium text-gray-800 mt-1">{aluno.rg || 'Não informado'}</p>
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Endereço
                </h4>
                <p className="text-sm text-gray-800">{aluno.endereco || 'Não informado'}</p>
              </div>

              {/* Informações Escolares */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Informações Escolares
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Matrícula:</span>
                    <p className="font-medium text-gray-800 mt-1">{aluno.matricula}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Turma:</span>
                    <p className="font-medium text-gray-800 mt-1">{aluno.turma}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Turno:</span>
                    <p className="font-medium text-gray-800 mt-1">{aluno.turno}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p className="font-medium text-gray-800 mt-1">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
                        aluno.status === 'ATIVO' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {aluno.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Responsáveis */}
          {activeTab === 'responsaveis' && (
            <div className="space-y-4">
              {aluno.responsaveis.map((responsavel, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {responsavel.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{responsavel.nome}</h4>
                        <p className="text-sm text-gray-600">{responsavel.parentesco}</p>
                      </div>
                    </div>
                    {responsavel.responsavelFinanceiro && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        Resp. Financeiro
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {responsavel.telefone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {responsavel.email}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Notas */}
          {activeTab === 'notas' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-900">Desempenho Geral</h4>
                    <p className="text-sm text-blue-700 mt-1">Média geral: 8.4</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-700">Frequência</p>
                    <p className="text-2xl font-bold text-blue-900">95%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disciplina</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">1º Bim</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">2º Bim</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">3º Bim</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Média</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {notasExemplo.map((nota, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{nota.disciplina}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-600">{nota.bimestre1}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-600">{nota.bimestre2}</td>
                        <td className="px-6 py-4 text-sm text-center text-gray-600">{nota.bimestre3}</td>
                        <td className="px-6 py-4 text-sm text-center">
                          <span className={`font-medium ${
                            nota.media >= 7 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {nota.media.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab: Financeiro */}
          {activeTab === 'financeiro' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700">Mensalidades Pagas</p>
                  <p className="text-2xl font-bold text-green-900 mt-1">3/3</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-700">Pendentes</p>
                  <p className="text-2xl font-bold text-yellow-900 mt-1">0</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700">Total Pago</p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">R$ 2.550</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Competência</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Pagamento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mensalidadesExemplo.map((mensalidade, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-gray-800">{mensalidade.mes}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          R$ {mensalidade.valor.toFixed(2).replace('.', ',')}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {mensalidade.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(mensalidade.dataPagamento)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab: Histórico */}
          {activeTab === 'historico' && (
            <div className="space-y-3">
              {historicoExemplo.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-800">{item.descricao}</p>
                      <span className="text-xs text-gray-500">{formatDate(item.data)}</span>
                    </div>
                    <span className="inline-flex px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {item.tipo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={onEditar}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Editar Aluno
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalhesAlunoModal;