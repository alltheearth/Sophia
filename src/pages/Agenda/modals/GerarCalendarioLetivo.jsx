// src/pages/Agenda/modals/GerarCalendarioLetivo.jsx

import React, { useState } from 'react';
import { X, Calendar, Save, AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';

const GerarCalendarioLetivoModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    anoLetivo: 2025,
    dataInicio: '2025-02-01',
    dataFim: '2025-12-20',
    diasLetivos: 200,
    incluirSabados: false
  });

  const [periodos, setPeriodos] = useState([
    { id: 1, nome: '1º Bimestre', inicio: '2025-02-01', fim: '2025-04-30', dias: 60 },
    { id: 2, nome: '2º Bimestre', inicio: '2025-05-01', fim: '2025-07-15', dias: 55 },
    { id: 3, nome: '3º Bimestre', inicio: '2025-08-01', fim: '2025-09-30', dias: 45 },
    { id: 4, nome: '4º Bimestre', inicio: '2025-10-01', fim: '2025-12-20', dias: 60 }
  ]);

  const [feriados, setFeriados] = useState([
    { id: 1, nome: 'Carnaval', data: '2025-03-04', tipo: 'NACIONAL' },
    { id: 2, nome: 'Sexta-feira Santa', data: '2025-04-18', tipo: 'NACIONAL' },
    { id: 3, nome: 'Tiradentes', data: '2025-04-21', tipo: 'NACIONAL' },
    { id: 4, nome: 'Dia do Trabalho', data: '2025-05-01', tipo: 'NACIONAL' },
    { id: 5, nome: 'Corpus Christi', data: '2025-06-19', tipo: 'NACIONAL' },
    { id: 6, nome: 'Independência', data: '2025-09-07', tipo: 'NACIONAL' },
    { id: 7, nome: 'N. Sra. Aparecida', data: '2025-10-12', tipo: 'NACIONAL' },
    { id: 8, nome: 'Finados', data: '2025-11-02', tipo: 'NACIONAL' },
    { id: 9, nome: 'Proclamação da República', data: '2025-11-15', tipo: 'NACIONAL' },
    { id: 10, nome: 'Consciência Negra', data: '2025-11-20', tipo: 'NACIONAL' },
    { id: 11, nome: 'Natal', data: '2025-12-25', tipo: 'NACIONAL' }
  ]);

  const [recessos, setRecessos] = useState([
    { id: 1, nome: 'Férias de Julho', inicio: '2025-07-16', fim: '2025-07-31' }
  ]);

  const [novoFeriado, setNovoFeriado] = useState({ nome: '', data: '', tipo: 'MUNICIPAL' });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const adicionarFeriado = () => {
    if (novoFeriado.nome && novoFeriado.data) {
      setFeriados([...feriados, { id: Date.now(), ...novoFeriado }]);
      setNovoFeriado({ nome: '', data: '', tipo: 'MUNICIPAL' });
    }
  };

  const removerFeriado = (id) => {
    setFeriados(feriados.filter(f => f.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const calendario = {
      ...formData,
      periodos,
      feriados,
      recessos
    };

    console.log('Gerando calendário letivo:', calendario);
    alert(`Calendário Letivo ${formData.anoLetivo} gerado com sucesso!\n\n` +
          `• ${formData.diasLetivos} dias letivos\n` +
          `• ${periodos.length} bimestres\n` +
          `• ${feriados.length} feriados\n` +
          `• ${recessos.length} períodos de recesso`);
    onClose();
  };

  const calcularDiasLetivos = () => {
    // Cálculo simplificado - em produção seria mais complexo
    const inicio = new Date(formData.dataInicio);
    const fim = new Date(formData.dataFim);
    const dias = Math.ceil((fim - inicio) / (1000 * 60 * 60 * 24));
    const diasUteis = Math.floor(dias * 0.7); // Aproximação
    const diasComFeriados = diasUteis - feriados.length;
    return diasComFeriados;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              <div>
                <h3 className="text-xl font-bold">Gerar Calendário Letivo</h3>
                <p className="text-sm text-white/90">Configure o ano letivo e períodos</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Configurações Gerais */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-4">Configurações Gerais</h4>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ano Letivo *
                </label>
                <input
                  type="number"
                  required
                  value={formData.anoLetivo}
                  onChange={(e) => handleChange('anoLetivo', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Início *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dataInicio}
                  onChange={(e) => handleChange('dataInicio', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Fim *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dataFim}
                  onChange={(e) => handleChange('dataFim', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dias Letivos *
                </label>
                <input
                  type="number"
                  required
                  value={formData.diasLetivos}
                  onChange={(e) => handleChange('diasLetivos', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.incluirSabados}
                  onChange={(e) => handleChange('incluirSabados', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Incluir sábados como dias letivos</span>
              </label>
            </div>
          </div>

          {/* Períodos/Bimestres */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Períodos Letivos (Bimestres)</h4>
            <div className="space-y-3">
              {periodos.map((periodo, index) => (
                <div key={periodo.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Período</label>
                      <input
                        type="text"
                        value={periodo.nome}
                        readOnly
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Data Início</label>
                      <input
                        type="date"
                        value={periodo.inicio}
                        onChange={(e) => {
                          const newPeriodos = [...periodos];
                          newPeriodos[index].inicio = e.target.value;
                          setPeriodos(newPeriodos);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Data Fim</label>
                      <input
                        type="date"
                        value={periodo.fim}
                        onChange={(e) => {
                          const newPeriodos = [...periodos];
                          newPeriodos[index].fim = e.target.value;
                          setPeriodos(newPeriodos);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Dias Letivos</label>
                      <input
                        type="number"
                        value={periodo.dias}
                        onChange={(e) => {
                          const newPeriodos = [...periodos];
                          newPeriodos[index].dias = parseInt(e.target.value);
                          setPeriodos(newPeriodos);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feriados */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Feriados</h4>
            
            {/* Adicionar Feriado */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Nome do feriado"
                    value={novoFeriado.nome}
                    onChange={(e) => setNovoFeriado({ ...novoFeriado, nome: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={novoFeriado.data}
                    onChange={(e) => setNovoFeriado({ ...novoFeriado, data: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={adicionarFeriado}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de Feriados */}
            <div className="max-h-60 overflow-y-auto space-y-2">
              {feriados.map((feriado) => (
                <div key={feriado.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 flex-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{feriado.nome}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(feriado.data).toLocaleDateString('pt-BR')} - {feriado.tipo}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removerFeriado(feriado.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recessos */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Recessos Escolares</h4>
            <div className="space-y-2">
              {recessos.map((recesso) => (
                <div key={recesso.id} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{recesso.nome}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(recesso.inicio).toLocaleDateString('pt-BR')} até{' '}
                        {new Date(recesso.fim).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
            <h4 className="font-medium text-green-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Resumo do Calendário Letivo
            </h4>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-900">{formData.diasLetivos}</p>
                <p className="text-xs text-green-700 mt-1">Dias Letivos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">{periodos.length}</p>
                <p className="text-xs text-blue-700 mt-1">Bimestres</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-900">{feriados.length}</p>
                <p className="text-xs text-red-700 mt-1">Feriados</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-900">{recessos.length}</p>
                <p className="text-xs text-purple-700 mt-1">Recessos</p>
              </div>
            </div>
          </div>

          {/* Alerta */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-yellow-900 font-medium mb-1">⚠️ Atenção</h4>
                <p className="text-yellow-800 text-sm">
                  Ao gerar o calendário letivo, todos os eventos existentes relacionados ao ano letivo {formData.anoLetivo} serão mantidos. 
                  Os feriados e recessos configurados serão automaticamente adicionados à agenda.
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Gerar Calendário Letivo
          </button>
        </div>
      </div>
    </div>
  );
};

export default GerarCalendarioLetivoModal;