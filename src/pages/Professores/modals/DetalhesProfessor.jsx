// src/pages/Professores/modals/DetalhesProfessor.jsx
Users
import React, { useState } from 'react';
import { X, Edit, Phone, Mail, MapPin, Calendar, GraduationCap, BookOpen, Clock, BarChart3, FileText, Award, Users } from 'lucide-react';

const DetalhesProfessorModal = ({ professor, onClose, onEditar }) => {
  const [activeTab, setActiveTab] = useState('dados');

  const calcularTempoServico = (dataAdmissao) => {
    const admissao = new Date(dataAdmissao);
    const hoje = new Date();
    const anos = hoje.getFullYear() - admissao.getFullYear();
    const meses = hoje.getMonth() - admissao.getMonth();
    
    if (anos === 0) {
      return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    } else if (meses < 0) {
      return `${anos - 1} ${anos - 1 === 1 ? 'ano' : 'anos'}`;
    }
    return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  };

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

  const formatCurrency = (value) => {
    if (!value) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Dados mockados de exemplo
  const desempenhoExemplo = {
    mediaGeralTurmas: 8.2,
    frequenciaMedia: 96.5,
    totalAulasMinistradas: 284,
    totalFaltas: 3,
    avaliacaoAlunos: 4.7
  };

  const turmasDetalhes = [
    { nome: '5º Ano A', disciplina: 'Matemática', alunos: 28, mediaGeral: 8.5, frequencia: 97 },
    { nome: '5º Ano B', disciplina: 'Matemática', alunos: 30, mediaGeral: 7.8, frequencia: 95 },
    { nome: '4º Ano C', disciplina: 'Física', alunos: 25, mediaGeral: 8.3, frequencia: 98 }
  ];

  const historicoExemplo = [
    { data: '2024-11-01', tipo: 'AULA', descricao: 'Aula ministrada - 5º Ano A (Matemática)' },
    { data: '2024-10-25', tipo: 'NOTA', descricao: 'Notas do 3º bimestre lançadas' },
    { data: '2024-10-15', tipo: 'REUNIAO', descricao: 'Reunião pedagógica - Planejamento 4º bimestre' },
    { data: '2024-09-20', tipo: 'AVALIACAO', descricao: 'Avaliação de desempenho realizada' }
  ];

  const certificacoesExemplo = [
    { titulo: 'Mestrado em Educação Matemática', instituicao: 'USP', ano: 2019 },
    { titulo: 'Especialização em Didática', instituicao: 'UNICAMP', ano: 2017 },
    { titulo: 'Licenciatura em Matemática', instituicao: 'UNESP', ano: 2015 }
  ];

  const tabs = [
    { id: 'dados', label: 'Dados Pessoais', icon: GraduationCap },
    { id: 'academico', label: 'Acadêmico', icon: BookOpen },
    { id: 'turmas', label: 'Turmas', icon: Users },
    { id: 'desempenho', label: 'Desempenho', icon: BarChart3 },
    { id: 'historico', label: 'Histórico', icon: FileText }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'ATIVO': 'bg-green-100 text-green-800',
      'FERIAS': 'bg-blue-100 text-blue-800',
      'LICENCA': 'bg-yellow-100 text-yellow-800',
      'AFASTADO': 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.ATIVO;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-white/30">
                {professor.foto ? (
                  <img src={professor.foto} alt={professor.nome} className="w-full h-full rounded-full object-cover" />
                ) : (
                  professor.nome.split(' ').map(n => n[0]).slice(0, 2).join('')
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{professor.nome}</h3>
                <div className="flex items-center gap-4 text-sm text-white/90">
                  <span>{professor.formacao}</span>
                  <span>•</span>
                  <span>{calcularTempoServico(professor.dataAdmissao)} na escola</span>
                  <span>•</span>
                  <span>{professor.cargaHoraria}h/semana</span>
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
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600 bg-white'
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
              {/* Informações Pessoais */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  Informações Pessoais
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Data de Nascimento:</span>
                    <p className="font-medium text-gray-800 mt-1">{formatDate(professor.dataNascimento)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Idade:</span>
                    <p className="font-medium text-gray-800 mt-1">{calcularIdade(professor.dataNascimento)} anos</p>
                  </div>
                  <div>
                    <span className="text-gray-600">CPF:</span>
                    <p className="font-medium text-gray-800 mt-1">{professor.cpf}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">RG:</span>
                    <p className="font-medium text-gray-800 mt-1">{professor.rg || 'Não informado'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <p className="font-medium text-gray-800 mt-1 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {professor.email}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Telefone:</span>
                    <p className="font-medium text-gray-800 mt-1 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {professor.telefone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Endereço
                </h4>
                <p className="text-sm text-gray-800">{professor.endereco || 'Não informado'}</p>
              </div>

              {/* Informações Profissionais */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  Informações Profissionais
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Data de Admissão:</span>
                    <p className="font-medium text-gray-800 mt-1">{formatDate(professor.dataAdmissao)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Tempo de Serviço:</span>
                    <p className="font-medium text-gray-800 mt-1">{calcularTempoServico(professor.dataAdmissao)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p className="font-medium text-gray-800 mt-1">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs ${getStatusColor(professor.status)}`}>
                        {professor.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Carga Horária:</span>
                    <p className="font-medium text-gray-800 mt-1">{professor.cargaHoraria}h/semana</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Turno:</span>
                    <p className="font-medium text-gray-800 mt-1">{professor.turno}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Salário:</span>
                    <p className="font-medium text-gray-800 mt-1">{formatCurrency(professor.salario)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Acadêmico */}
          {activeTab === 'academico' && (
            <div className="space-y-6">
              {/* Formação */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Formação Acadêmica
                </h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Graduação:</span>
                    <p className="font-medium text-gray-800">{professor.formacao}</p>
                  </div>
                  {professor.especializacao && (
                    <div>
                      <span className="text-sm text-gray-600">Pós-Graduação/Especialização:</span>
                      <p className="font-medium text-gray-800">{professor.especializacao}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Certificações */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4">Certificações e Cursos</h4>
                <div className="space-y-3">
                  {certificacoesExemplo.map((cert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                      <Award className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{cert.titulo}</p>
                        <p className="text-sm text-gray-600">{cert.instituicao} • {cert.ano}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disciplinas */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4">Disciplinas Lecionadas</h4>
                <div className="flex flex-wrap gap-2">
                  {professor.disciplinas.map((disciplina, index) => (
                    <span key={index} className="inline-flex px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                      {disciplina}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Turmas */}
          {activeTab === 'turmas' && (
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-purple-900">Total de Turmas</h4>
                    <p className="text-sm text-purple-700 mt-1">{professor.turmas.length} turmas ativas</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-purple-700">Total de Alunos</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {turmasDetalhes.reduce((acc, t) => acc + t.alunos, 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Turma</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disciplina</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Alunos</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Média Geral</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Frequência</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {turmasDetalhes.map((turma, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{turma.nome}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <span className="inline-flex px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                            {turma.disciplina}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-gray-800">{turma.alunos}</td>
                        <td className="px-6 py-4 text-sm text-center">
                          <span className={`font-medium ${turma.mediaGeral >= 7 ? 'text-green-600' : 'text-red-600'}`}>
                            {turma.mediaGeral.toFixed(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-gray-800">{turma.frequencia}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab: Desempenho */}
          {activeTab === 'desempenho' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700">Média Geral das Turmas</p>
                  <p className="text-3xl font-bold text-blue-900 mt-2">{desempenhoExemplo.mediaGeralTurmas}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700">Frequência Média</p>
                  <p className="text-3xl font-bold text-green-900 mt-2">{desempenhoExemplo.frequenciaMedia}%</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm text-purple-700">Avaliação dos Alunos</p>
                  <p className="text-3xl font-bold text-purple-900 mt-2">
                    {desempenhoExemplo.avaliacaoAlunos} <span className="text-lg">/ 5.0</span>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4">Atividades</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-600">Total de Aulas Ministradas:</span>
                    <span className="font-bold text-gray-800">{desempenhoExemplo.totalAulasMinistradas}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-600">Total de Faltas:</span>
                    <span className="font-bold text-gray-800">{desempenhoExemplo.totalFaltas}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">📊 Análise de Desempenho</h4>
                <p className="text-sm text-yellow-800">
                  Professor com excelente desempenho. Média das turmas acima da média da escola (7.5). 
                  Alta frequência e boa avaliação dos alunos. Continue com o ótimo trabalho!
                </p>
              </div>
            </div>
          )}

          {/* Tab: Histórico */}
          {activeTab === 'historico' && (
            <div className="space-y-3">
              {historicoExemplo.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-800">{item.descricao}</p>
                      <span className="text-xs text-gray-500">{formatDate(item.data)}</span>
                    </div>
                    <span className="inline-flex px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
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
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Editar Professor
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalhesProfessorModal;