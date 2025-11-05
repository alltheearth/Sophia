// src/pages/Professores/modals/HorariosProfessor.jsx

import React, { useState } from 'react';
import { X, Download, Edit, Save, Clock, Calendar } from 'lucide-react';

const HorariosProfessorModal = ({ professor, onClose }) => {
  const [modoEdicao, setModoEdicao] = useState(false);
  
  // Horários mockados - virão da API
  const [horarios, setHorarios] = useState({
    'SEG-07:00': { turma: '5º Ano A', disciplina: 'Matemática', sala: '101' },
    'SEG-08:00': { turma: '5º Ano A', disciplina: 'Matemática', sala: '101' },
    'SEG-10:00': { turma: '5º Ano B', disciplina: 'Matemática', sala: '102' },
    'SEG-11:00': { turma: '5º Ano B', disciplina: 'Matemática', sala: '102' },
    
    'TER-07:00': { turma: '4º Ano C', disciplina: 'Física', sala: '103' },
    'TER-08:00': { turma: '4º Ano C', disciplina: 'Física', sala: '103' },
    'TER-10:00': { turma: '5º Ano A', disciplina: 'Matemática', sala: '101' },
    
    'QUA-07:00': { turma: '5º Ano B', disciplina: 'Matemática', sala: '102' },
    'QUA-08:00': { turma: '5º Ano B', disciplina: 'Matemática', sala: '102' },
    'QUA-10:00': { turma: '5º Ano A', disciplina: 'Matemática', sala: '101' },
    'QUA-11:00': { turma: '5º Ano A', disciplina: 'Matemática', sala: '101' },
    
    'QUI-07:00': { turma: '4º Ano C', disciplina: 'Física', sala: '103' },
    'QUI-08:00': { turma: '4º Ano C', disciplina: 'Física', sala: '103' },
    'QUI-10:00': { turma: '5º Ano B', disciplina: 'Matemática', sala: '102' },
    
    'SEX-07:00': { turma: '5º Ano A', disciplina: 'Matemática', sala: '101' },
    'SEX-08:00': { turma: '5º Ano A', disciplina: 'Matemática', sala: '101' },
    'SEX-10:00': { turma: '4º Ano C', disciplina: 'Física', sala: '103' },
    'SEX-11:00': { turma: '4º Ano C', disciplina: 'Física', sala: '103' }
  });

  const diasSemana = [
    { id: 'SEG', label: 'Segunda', color: 'bg-blue-100 text-blue-800' },
    { id: 'TER', label: 'Terça', color: 'bg-green-100 text-green-800' },
    { id: 'QUA', label: 'Quarta', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'QUI', label: 'Quinta', color: 'bg-orange-100 text-orange-800' },
    { id: 'SEX', label: 'Sexta', color: 'bg-purple-100 text-purple-800' }
  ];

  const horariosAulas = [
    '07:00', '08:00', '09:00', '10:00', '11:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSalvarHorarios = () => {
    console.log('Salvando horários:', horarios);
    alert('Horários salvos com sucesso!');
    setModoEdicao(false);
  };

  const handleExportarPDF = () => {
    console.log('Exportando PDF');
    alert('Gerando PDF com os horários...');
  };

  const getTurmaColor = (turma) => {
    const colors = {
      '5º Ano A': 'bg-blue-500',
      '5º Ano B': 'bg-green-500',
      '4º Ano C': 'bg-purple-500'
    };
    return colors[turma] || 'bg-gray-500';
  };

  // Calcular total de aulas por dia
  const calcularAulasPorDia = (dia) => {
    return horariosAulas.filter(hora => horarios[`${dia}-${hora}`]).length;
  };

  // Calcular total de aulas na semana
  const totalAulasSemana = Object.keys(horarios).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6" />
                <h3 className="text-2xl font-bold">Horários de Aula</h3>
              </div>
              <p className="text-white/90">{professor.nome}</p>
              <p className="text-sm text-white/80 mt-1">
                {professor.disciplinas.join(', ')} • {professor.cargaHoraria}h/semana
              </p>
            </div>
            <div className="flex gap-2">
              {!modoEdicao ? (
                <>
                  <button
                    onClick={handleExportarPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Exportar PDF
                  </button>
                  <button
                    onClick={() => setModoEdicao(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSalvarHorarios}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-white/90 transition-colors font-medium"
                >
                  <Save className="w-4 h-4" />
                  Salvar Alterações
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Resumo */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white rounded-lg p-4 text-center border-2 border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Total de Aulas</p>
              <p className="text-3xl font-bold text-purple-600">{totalAulasSemana}</p>
              <p className="text-xs text-gray-500 mt-1">por semana</p>
            </div>
            {diasSemana.map((dia) => (
              <div key={dia.id} className={`rounded-lg p-4 text-center ${dia.color}`}>
                <p className="text-sm font-medium mb-1">{dia.label}</p>
                <p className="text-2xl font-bold">{calcularAulasPorDia(dia.id)}</p>
                <p className="text-xs mt-1">aulas</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grade de Horários */}
        <div className="flex-1 overflow-auto p-6">
          <div className="min-w-max">
            <div className="grid grid-cols-6 gap-2">
              {/* Header - Horários */}
              <div className="bg-gray-100 rounded-lg p-3 font-medium text-gray-700 flex items-center justify-center">
                <Clock className="w-4 h-4 mr-2" />
                Horário
              </div>
              
              {/* Header - Dias da Semana */}
              {diasSemana.map((dia) => (
                <div key={dia.id} className={`rounded-lg p-3 text-center font-medium ${dia.color}`}>
                  {dia.label}
                </div>
              ))}

              {/* Grid de Aulas */}
              {horariosAulas.map((hora) => (
                <React.Fragment key={hora}>
                  {/* Horário */}
                  <div className="bg-gray-50 rounded-lg p-3 font-medium text-gray-700 flex items-center justify-center border border-gray-200">
                    {hora}
                  </div>
                  
                  {/* Células de cada dia */}
                  {diasSemana.map((dia) => {
                    const key = `${dia.id}-${hora}`;
                    const aula = horarios[key];
                    
                    return (
                      <div
                        key={key}
                        className={`rounded-lg p-3 border-2 transition-all ${
                          aula 
                            ? 'bg-white border-gray-300 hover:shadow-md cursor-pointer' 
                            : modoEdicao
                              ? 'bg-gray-50 border-dashed border-gray-300 hover:bg-gray-100 cursor-pointer'
                              : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        {aula ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${getTurmaColor(aula.turma)}`}></div>
                              <span className="text-xs font-bold text-gray-800 truncate">
                                {aula.turma}
                              </span>
                            </div>
                            <div className="text-xs text-gray-700 font-medium truncate">
                              {aula.disciplina}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                              Sala {aula.sala}
                            </div>
                          </div>
                        ) : modoEdicao ? (
                          <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                            <span>+ Adicionar</span>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Legenda */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h4 className="font-medium text-gray-700">Legenda:</h4>
              <div className="flex items-center gap-4">
                {professor.turmas.slice(0, 3).map((turma, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${getTurmaColor(turma)}`}></div>
                    <span className="text-sm text-gray-700">{turma}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {modoEdicao && (
              <button
                onClick={() => setModoEdicao(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors text-sm"
              >
                Cancelar Edição
              </button>
            )}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="p-6 border-t border-gray-200 bg-blue-50">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Informações sobre o Horário</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Carga horária total: {professor.cargaHoraria} horas semanais</li>
                <li>• Total de aulas cadastradas: {totalAulasSemana} aulas</li>
                <li>• Intervalo para almoço: 12:00 às 13:00</li>
                <li>• Cada aula tem duração de 50 minutos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorariosProfessorModal;