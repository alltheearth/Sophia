// src/pages/Professores/components/ListaProfessores.jsx

import React, { useState } from 'react';
import { Eye, Edit, Grid, List, GraduationCap, Phone, Mail, Calendar, Clock, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const ListaProfessores = ({ professores, totalProfessores, onVerDetalhes, onEditar, onVerHorarios }) => {
  const [visualizacao, setVisualizacao] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(professores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const professoresAtuais = professores.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'ATIVO': 'bg-green-100 text-green-800',
      'FERIAS': 'bg-blue-100 text-blue-800',
      'LICENCA': 'bg-yellow-100 text-yellow-800',
      'AFASTADO': 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.ATIVO;
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

  const calcularTempoServico = (dataAdmissao) => {
    const admissao = new Date(dataAdmissao);
    const hoje = new Date();
    const anos = hoje.getFullYear() - admissao.getFullYear();
    const meses = hoje.getMonth() - admissao.getMonth();
    
    if (anos === 0) {
      return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    } else if (meses < 0) {
      return `${anos - 1} ${anos - 1 === 1 ? 'ano' : 'anos'}`;
    } else {
      return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    }
  };

  if (visualizacao === 'grid') {
    return (
      <div>
        {/* Toggle de Visualização */}
        <div className="bg-white rounded-t-xl shadow-sm p-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {professoresAtuais.length} de {professores.length} professores
            {totalProfessores !== professores.length && ` (${totalProfessores} no total)`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setVisualizacao('grid')}
              className={`p-2 rounded-lg transition-colors ${
                visualizacao === 'grid'
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setVisualizacao('list')}
              className={`p-2 rounded-lg transition-colors ${
                visualizacao === 'list'
                  ? 'bg-purple-100 text-purple-600'
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
            {professoresAtuais.map((professor) => (
              <div
                key={professor.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-purple-300 transition-all cursor-pointer"
                onClick={() => onVerDetalhes(professor)}
              >
                {/* Foto e Status */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {professor.foto ? (
                      <img src={professor.foto} alt={professor.nome} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      professor.nome.split(' ').map(n => n[0]).slice(0, 2).join('')
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(professor.status)}`}>
                    {professor.status}
                  </span>
                </div>

                {/* Informações */}
                <h3 className="font-medium text-gray-800 mb-1 truncate">{professor.nome}</h3>
                <p className="text-xs text-gray-500 mb-3">{professor.formacao}</p>

                {/* Disciplinas */}
                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-1">Disciplinas:</p>
                  <div className="flex flex-wrap gap-1">
                    {professor.disciplinas.slice(0, 2).map((disciplina, idx) => (
                      <span key={idx} className="inline-flex px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs">
                        {disciplina}
                      </span>
                    ))}
                    {professor.disciplinas.length > 2 && (
                      <span className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        +{professor.disciplinas.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Turmas:</span>
                    <span className="font-medium text-gray-800">{professor.turmas.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Carga:</span>
                    <span className="font-medium text-gray-800">{professor.cargaHoraria}h/sem</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Turno:</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTurnoColor(professor.turno)}`}>
                      {professor.turno}
                    </span>
                  </div>
                </div>

                {/* Contato */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                    <Phone className="w-3 h-3" />
                    {professor.telefone}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 truncate">
                    <Mail className="w-3 h-3" />
                    {professor.email}
                  </div>
                </div>

                {/* Ações */}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onVerDetalhes(professor);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onVerHorarios(professor);
                    }}
                    className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    title="Ver Horários"
                  >
                    <Clock className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditar(professor);
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
                          ? 'bg-purple-600 text-white'
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
          Mostrando {professoresAtuais.length} de {professores.length} professores
          {totalProfessores !== professores.length && ` (${totalProfessores} no total)`}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setVisualizacao('grid')}
            className={`p-2 rounded-lg transition-colors ${
              visualizacao === 'grid'
                ? 'bg-purple-100 text-purple-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setVisualizacao('list')}
            className={`p-2 rounded-lg transition-colors ${
              visualizacao === 'list'
                ? 'bg-purple-100 text-purple-600'
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Professor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disciplinas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Turmas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Carga/Turno</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contato</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {professoresAtuais.map((professor) => (
              <tr key={professor.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {professor.foto ? (
                        <img src={professor.foto} alt={professor.nome} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        professor.nome.split(' ').map(n => n[0]).slice(0, 2).join('')
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{professor.nome}</p>
                      <p className="text-xs text-gray-500">{calcularTempoServico(professor.dataAdmissao)} na escola</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {professor.disciplinas.map((disc, idx) => (
                      <span key={idx} className="inline-flex px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs">
                        {disc}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {professor.turmas.length} turmas
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-800">{professor.cargaHoraria}h/semana</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTurnoColor(professor.turno)}`}>
                    {professor.turno}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {professor.telefone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {professor.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(professor.status)}`}>
                    {professor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onVerDetalhes(professor)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Ver Detalhes"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onVerHorarios(professor)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver Horários"
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditar(professor)}
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
                        ? 'bg-purple-600 text-white'
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

export default ListaProfessores;    