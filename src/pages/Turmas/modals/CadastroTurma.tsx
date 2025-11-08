// src/pages/Turmas/modals/CadastroTurma.tsx

import React, { useState, useEffect } from 'react';
import { X, Users, Loader2 } from 'lucide-react';
import { type Turma } from '../../../services/turmasApi';
import { turmasApi } from '../../../services/turmasApi';
import { useAuth } from '../../../hooks/useAuth';

interface CadastroTurmaModalProps {
  turma: Turma | null;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

const CadastroTurmaModal: React.FC<CadastroTurmaModalProps> = ({ 
  turma, 
  onClose,
  onSave 
}) => {
  const { escola } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [coordenadores, setCoordenadores] = useState<any[]>([]);
  const [professores, setProfessores] = useState<any[]>([]);
  const [anosLetivos, setAnosLetivos] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    nome: turma?.nome || '',
    serie: turma?.serie || '',
    turno: turma?.turno || 'MATUTINO',
    anoLetivo: turma?.anoLetivo || turma?.ano_letivo || 2025,
    capacidadeMaxima: turma?.capacidadeMaxima || turma?.capacidade_maxima || 30,
    sala: turma?.sala || '',
    coordenadorId: turma?.coordenador?.id || '',
    professorTitularId: turma?.professorTitular?.id || ''
  });

  // Carregar dados necessários ao montar
  useEffect(() => {
    carregarDados();
  }, [escola]);

  const carregarDados = async () => {
    if (!escola?.id) return;

    try {
      setLoadingData(true);
      
      // Carregar coordenadores, professores e anos letivos em paralelo
      const [coordenadoresData, professoresData, anosData] = await Promise.all([
        turmasApi.buscarCoordenadores(escola.id),
        turmasApi.buscarProfessores(escola.id),
        turmasApi.buscarAnosLetivos(escola.id)
      ]);

      setCoordenadores(Array.isArray(coordenadoresData) ? coordenadoresData : coordenadoresData.results || []);
      setProfessores(Array.isArray(professoresData) ? professoresData : professoresData.results || []);
      setAnosLetivos(Array.isArray(anosData) ? anosData : anosData.results || []);
    } catch (err: any) {
      console.error('Erro ao carregar dados:', err);
      // Não bloquear o formulário se falhar
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    setError(null);
  };

  const validarFormulario = (): boolean => {
    if (!formData.nome) {
      setError('Nome da turma é obrigatório');
      return false;
    }
    if (!formData.serie) {
      setError('Série é obrigatória');
      return false;
    }
    if (!formData.sala) {
      setError('Sala é obrigatória');
      return false;
    }
    if (formData.capacidadeMaxima < 1) {
      setError('Capacidade máxima deve ser maior que zero');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const payload = {
        nome: formData.nome,
        serie: formData.serie,
        turno: formData.turno,
        ano_letivo: parseInt(formData.anoLetivo.toString()),
        capacidade_maxima: parseInt(formData.capacidadeMaxima.toString()),
        sala: formData.sala,
        ...(formData.coordenadorId && { coordenador: formData.coordenadorId }),
        ...(formData.professorTitularId && { professor_titular: formData.professorTitularId })
      };
      
      await onSave(payload);
    } catch (err: any) {
      console.error('Erro ao salvar:', err);
      setError(err.message || 'Erro ao salvar turma');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-cyan-600 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6" />
              <h3 className="text-xl font-bold">
                {turma ? 'Editar Turma' : 'Nova Turma'}
              </h3>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-300 rounded-lg text-white text-sm">
              {error}
            </div>
          )}
        </div>

        {loadingData ? (
          <div className="p-12 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-teal-600 animate-spin mx-auto mb-3" />
              <p className="text-gray-600">Carregando dados...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Informações Básicas */}
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Informações Básicas</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Turma *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    placeholder="Ex: 5º Ano A"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Série *
                  </label>
                  <select
                    required
                    value={formData.serie}
                    onChange={(e) => handleChange('serie', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Selecione...</option>
                    <option value="1º Ano">1º Ano</option>
                    <option value="2º Ano">2º Ano</option>
                    <option value="3º Ano">3º Ano</option>
                    <option value="4º Ano">4º Ano</option>
                    <option value="5º Ano">5º Ano</option>
                    <option value="6º Ano">6º Ano</option>
                    <option value="7º Ano">7º Ano</option>
                    <option value="8º Ano">8º Ano</option>
                    <option value="9º Ano">9º Ano</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Turno *
                  </label>
                  <select
                    required
                    value={formData.turno}
                    onChange={(e) => handleChange('turno', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="MATUTINO">Matutino</option>
                    <option value="VESPERTINO">Vespertino</option>
                    <option value="NOTURNO">Noturno</option>
                    <option value="INTEGRAL">Integral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ano Letivo *
                  </label>
                  <select
                    required
                    value={formData.anoLetivo}
                    onChange={(e) => handleChange('anoLetivo', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {anosLetivos.length > 0 ? (
                      anosLetivos.map(ano => (
                        <option key={ano.id} value={ano.ano}>{ano.ano}</option>
                      ))
                    ) : (
                      <>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacidade Máxima *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.capacidadeMaxima}
                    onChange={(e) => handleChange('capacidadeMaxima', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sala *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sala}
                    onChange={(e) => handleChange('sala', e.target.value)}
                    placeholder="Ex: 101"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* Responsáveis */}
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Responsáveis</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coordenador
                  </label>
                  <select
                    value={formData.coordenadorId}
                    onChange={(e) => handleChange('coordenadorId', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Selecione...</option>
                    {coordenadores.map(coord => (
                      <option key={coord.id} value={coord.id}>
                        {coord.first_name} {coord.last_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professor Titular
                  </label>
                  <select
                    value={formData.professorTitularId}
                    onChange={(e) => handleChange('professorTitularId', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Selecione...</option>
                    {professores.map(prof => (
                      <option key={prof.id} value={prof.usuario}>
                        {prof.nome || `${prof.usuario?.first_name} ${prof.usuario?.last_name}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Observações */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <h4 className="font-medium text-teal-900 mb-2">ℹ️ Informações</h4>
              <ul className="text-sm text-teal-800 space-y-1">
                <li>• Após criar a turma, você poderá alocar alunos e professores</li>
                <li>• As disciplinas podem ser configuradas posteriormente</li>
                <li>• A capacidade máxima pode ser alterada a qualquer momento</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  turma ? 'Atualizar Turma' : 'Criar Turma'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CadastroTurmaModal;