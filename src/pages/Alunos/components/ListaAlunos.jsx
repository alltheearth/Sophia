// src/pages/Alunos/components/ListaAlunos.jsx

import React, { useState } from 'react';
import { Eye, Edit, Grid, List, User, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

const ListaAlunos = ({ alunos, totalAlunos, onVerDetalhes, onEditar }) => {
  const [visualizacao, setVisualizacao] = useState('grid'); // 'grid' ou 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(alunos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const alunosAtuais = alunos.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'ATIVO': 'bg-green-100 text-green-800',
      'INATIVO': 'bg-gray-100 text-gray-800',
      'TRANSFERIDO': 'bg-yellow-100 text-yellow-800',
      'CONCLUIDO': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || colors.INATIVO;
  };

  const getTurnoColor = (turno) => {
    const colors = {
      'MATUTINO': 'bg-orange-100 text-orange-700',
      'VESPERTINO': 'bg-purple-100 text-purple-700',
      'NOTURNO': 'bg-indigo-100 text-indigo-700',
      'INTEGRAL': 'bg-teal-100 text-teal-700'
    };
    return colors[turno] || colors.MATUTINO;
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

  if (visualizacao === 'grid') {
    return (
      <div>
        {/* Toggle de Visualização */}
        <div className="bg-white rounded-t-xl shadow-sm p-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {alunosAtuais.length} de {alunos.length} alunos
            {totalAlunos !== alunos.length && ` (${totalAlunos} no total)`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setVisualizacao('grid')}
              className={`p-2 rounded-lg transition-colors ${
                visualizacao === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setVisualizacao('list')}
              className={`p-2 rounded-lg transition-colors ${
                visualizacao === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="bg-white rounded-b-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {alunosAtuais.map((aluno) => (
              <div
                key={aluno.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                onClick={() => onVerDetalhes(aluno)}
              >
                {/* Foto e Status */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {aluno.foto ? (
                      <img src={aluno.foto} alt={aluno.nome} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      aluno.nome.split(' ').map(n => n[0]).slice(0, 2).join('')
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(aluno.status)}`}>
                    {aluno.status}
                  </span>
                </div>

                {/* Informações */}
                <h3 className="font-medium text-gray-800 mb-1 truncate">{aluno.nome}</h3>
                <p className="text-xs text-gray-500 mb-3">Mat: {aluno.matricula}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Turma:</span>
                    <span className="font-medium text-gray-800">{aluno.turma}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Idade:</span>
                    <span className="font-medium text-gray-800">{calcularIdade(aluno.dataNascimento)} anos</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Turno:</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTurnoColor(aluno.turno)}`}>
                      {aluno.turno}
                    </span>
                  </div>
                </div>

                {/* Responsável */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Responsável:</p>
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {aluno.responsaveis[0]?.nome || 'Não informado'}
                  </p>
                </div>

                {/* Ações */}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onVerDetalhes(aluno);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditar(aluno);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Página {currentPage} de {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === pageNumber
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Visualização em Lista
  return (
    <div>
      {/* Toggle de Visualização */}
      <div className="bg-white rounded-t-xl shadow-sm p-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando {alunosAtuais.length} de {alunos.length} alunos
          {totalAlunos !== alunos.length && ` (${totalAlunos} no total)`}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setVisualizacao('grid')}
            className={`p-2 rounded-lg transition-colors ${
              visualizacao === 'grid'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setVisualizacao('list')}
            className={`p-2 rounded-lg transition-colors ${
              visualizacao === 'list'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-b-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aluno</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Matrícula</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Turma</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Turno</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsável</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contato</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {alunosAtuais.map((aluno) => (
              <tr key={aluno.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {aluno.foto ? (
                        <img src={aluno.foto} alt={aluno.nome} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        aluno.nome.split(' ').map(n => n[0]).slice(0, 2).join('')
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{aluno.nome}</p>
                      <p className="text-xs text-gray-500">{calcularIdade(aluno.dataNascimento)} anos</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{aluno.matricula}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{aluno.turma}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTurnoColor(aluno.turno)}`}>
                    {aluno.turno}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {aluno.responsaveis[0]?.nome || 'Não informado'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {aluno.responsaveis[0]?.telefone || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(aluno.status)}`}>
                    {aluno.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onVerDetalhes(aluno)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver Detalhes"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditar(aluno)}
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

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNumber = i + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-white'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaAlunos;