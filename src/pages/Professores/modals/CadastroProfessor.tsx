// src/pages/Professores/modals/CadastroProfessor.tsx

import React, { useState } from 'react';
import { X, Upload, Plus, GraduationCap, Loader2 } from 'lucide-react';
import {type Professor } from '../../../services/professoresApi';

interface CadastroProfessorModalProps {
  professor: Professor | null;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

const CadastroProfessorModal: React.FC<CadastroProfessorModalProps> = ({ 
  professor, 
  onClose,
  onSave 
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    // Dados Pessoais
    nome: professor?.nome || '',
    email: professor?.email || '',
    telefone: professor?.telefone || '',
    cpf: professor?.cpf || '',
    rg: professor?.rg || '',
    dataNascimento: professor?.dataNascimento || professor?.data_nascimento || '',
    sexo: professor?.sexo || '',
    
    // Endereço
    cep: professor?.cep || '',
    endereco: professor?.endereco || '',
    numero: professor?.numero || '',
    complemento: professor?.complemento || '',
    bairro: professor?.bairro || '',
    cidade: professor?.cidade || '',
    
    // Dados Profissionais
    dataAdmissao: professor?.dataAdmissao || professor?.data_admissao || new Date().toISOString().split('T')[0],
    registro: professor?.registro || professor?.registro_profissional || '',
    formacao: professor?.formacao || '',
    especializacao: professor?.especializacao || '',
    cargaHoraria: professor?.cargaHoraria || professor?.carga_horaria || 40,
    turno: professor?.turno || 'MATUTINO',
    status: professor?.status || 'ATIVO',
    salario: professor?.salario || '',
    
    // Disciplinas e Turmas
    disciplinas: professor?.disciplinas || [],
    turmas: professor?.turmas || []
  });

  const [novaDisciplina, setNovaDisciplina] = useState('');

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    setError(null);
  };

  const adicionarDisciplina = () => {
    if (novaDisciplina && !formData.disciplinas.includes(novaDisciplina)) {
      setFormData({
        ...formData,
        disciplinas: [...formData.disciplinas, novaDisciplina]
      });
      setNovaDisciplina('');
    }
  };

  const removerDisciplina = (disciplina: string) => {
    setFormData({
      ...formData,
      disciplinas: formData.disciplinas.filter(d => d !== disciplina)
    });
  };

  const validarStep = (currentStep: number): boolean => {
    if (currentStep === 1) {
      if (!formData.nome || !formData.email || !formData.telefone || !formData.cpf) {
        setError('Preencha todos os campos obrigatórios');
        return false;
      }
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Email inválido');
        return false;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.formacao || !formData.dataAdmissao) {
        setError('Preencha todos os campos obrigatórios');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarStep(3)) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Preparar dados para envio
      const payload = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        cpf: formData.cpf,
        rg: formData.rg,
        data_nascimento: formData.dataNascimento,
        sexo: formData.sexo,
        
        cep: formData.cep,
        endereco: formData.endereco,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
        cidade: formData.cidade,
        
        data_admissao: formData.dataAdmissao,
        registro_profissional: formData.registro,
        formacao: formData.formacao,
        especializacao: formData.especializacao,
        carga_horaria: parseInt(formData.cargaHoraria.toString()),
        turno: formData.turno,
        status: formData.status,
        salario: formData.salario ? parseFloat(formData.salario.toString()) : 0,
        
        disciplinas: formData.disciplinas,
        turmas: formData.turmas
      };
      
      await onSave(payload);
    } catch (err: any) {
      console.error('Erro ao salvar:', err);
      setError(err.message || 'Erro ao salvar professor');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validarStep(step)) {
      if (step < 3) setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    setError(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              {professor ? 'Editar Professor' : 'Novo Professor'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg" disabled={loading}>
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Steps */}
          <div className="flex items-center gap-4 mt-4">
            {[
              { num: 1, label: 'Dados Pessoais' },
              { num: 2, label: 'Dados Profissionais' },
              { num: 3, label: 'Disciplinas e Turmas' }
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                  step >= s.num ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s.num}
                </div>
                <span className={`text-sm font-medium ${
                  step >= s.num ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Dados Pessoais */}
          {step === 1 && (
            <div className="p-6 space-y-6">
              {/* Foto */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  <GraduationCap className="w-12 h-12" />
                </div>
                <button type="button" className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
                  <Upload className="w-4 h-4" />
                  Enviar Foto
                </button>
              </div>

              {/* Dados Pessoais */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Dados Pessoais</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => handleChange('nome', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telefone}
                      onChange={(e) => handleChange('telefone', e.target.value)}
                      placeholder="(00) 00000-0000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      value={formData.dataNascimento}
                      onChange={(e) => handleChange('dataNascimento', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sexo
                    </label>
                    <select
                      value={formData.sexo}
                      onChange={(e) => handleChange('sexo', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Selecione...</option>
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CPF *</label>
                    <input
                      type="text"
                      required
                      value={formData.cpf}
                      onChange={(e) => handleChange('cpf', e.target.value)}
                      placeholder="000.000.000-00"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">RG</label>
                    <input
                      type="text"
                      value={formData.rg}
                      onChange={(e) => handleChange('rg', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Endereço</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CEP</label>
                    <input
                      type="text"
                      value={formData.cep}
                      onChange={(e) => handleChange('cep', e.target.value)}
                      placeholder="00000-000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div></div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                    <input
                      type="text"
                      value={formData.endereco}
                      onChange={(e) => handleChange('endereco', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número</label>
                    <input
                      type="text"
                      value={formData.numero}
                      onChange={(e) => handleChange('numero', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
                    <input
                      type="text"
                      value={formData.bairro}
                      onChange={(e) => handleChange('bairro', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                    <input
                      type="text"
                      value={formData.cidade}
                      onChange={(e) => handleChange('cidade', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Dados Profissionais */}
          {step === 2 && (
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Informações Profissionais</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Admissão *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dataAdmissao}
                      onChange={(e) => handleChange('dataAdmissao', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registro Profissional
                    </label>
                    <input
                      type="text"
                      value={formData.registro}
                      onChange={(e) => handleChange('registro', e.target.value)}
                      placeholder="Ex: CRM, CRE, etc"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Formação *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.formacao}
                      onChange={(e) => handleChange('formacao', e.target.value)}
                      placeholder="Ex: Licenciatura em Matemática"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Especialização/Pós-Graduação
                    </label>
                    <input
                      type="text"
                      value={formData.especializacao}
                      onChange={(e) => handleChange('especializacao', e.target.value)}
                      placeholder="Ex: Mestrado em Educação"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Carga Horária Semanal *
                    </label>
                    <select
                      required
                      value={formData.cargaHoraria}
                      onChange={(e) => handleChange('cargaHoraria', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="20">20 horas</option>
                      <option value="30">30 horas</option>
                      <option value="40">40 horas</option>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="MATUTINO">Matutino</option>
                      <option value="VESPERTINO">Vespertino</option>
                      <option value="NOTURNO">Noturno</option>
                      <option value="INTEGRAL">Integral</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status *
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="ATIVO">Ativo</option>
                      <option value="FERIAS">Em Férias</option>
                      <option value="LICENCA">Em Licença</option>
                      <option value="AFASTADO">Afastado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salário
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        R$
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.salario}
                        onChange={(e) => handleChange('salario', e.target.value)}
                        placeholder="0,00"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Disciplinas e Turmas */}
          {step === 3 && (
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Disciplinas Lecionadas</h4>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={novaDisciplina}
                    onChange={(e) => setNovaDisciplina(e.target.value)}
                    placeholder="Nome da disciplina"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarDisciplina())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={adicionarDisciplina}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.disciplinas.map((disciplina, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg">
                      <span className="text-sm font-medium">{disciplina}</span>
                      <button
                        type="button"
                        onClick={() => removerDisciplina(disciplina)}
                        className="hover:bg-purple-200 rounded p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Dica:</strong> As turmas podem ser associadas posteriormente na gestão de turmas ou disciplinas.
                </p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 flex justify-between sticky bottom-0 bg-white">
            <div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={loading}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Voltar
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={loading}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  Próximo
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    professor ? 'Atualizar Professor' : 'Cadastrar Professor'
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroProfessorModal;