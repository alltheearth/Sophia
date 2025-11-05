// src/pages/Professores/modals/CadastroProfessor.jsx

import React, { useState } from 'react';
import { X, Upload, Plus, Trash2, GraduationCap } from 'lucide-react';

const CadastroProfessorModal = ({ professor, onClose }) => {
  const [step, setStep] = useState(1); // 1: Dados Pessoais, 2: Dados Profissionais, 3: Disciplinas e Turmas
  const [formData, setFormData] = useState({
    // Dados Pessoais
    nome: professor?.nome || '',
    email: professor?.email || '',
    telefone: professor?.telefone || '',
    cpf: professor?.cpf || '',
    rg: professor?.rg || '',
    dataNascimento: professor?.dataNascimento || '',
    sexo: professor?.sexo || '',
    
    // Endereço
    cep: professor?.cep || '',
    endereco: professor?.endereco || '',
    numero: professor?.numero || '',
    complemento: professor?.complemento || '',
    bairro: professor?.bairro || '',
    cidade: professor?.cidade || '',
    
    // Dados Profissionais
    dataAdmissao: professor?.dataAdmissao || new Date().toISOString().split('T')[0],
    registro: professor?.registro || '',
    formacao: professor?.formacao || '',
    especializacao: professor?.especializacao || '',
    cargaHoraria: professor?.cargaHoraria || 40,
    turno: professor?.turno || 'MATUTINO',
    status: professor?.status || 'ATIVO',
    salario: professor?.salario || '',
    
    // Disciplinas e Turmas
    disciplinas: professor?.disciplinas || [],
    turmas: professor?.turmas || []
  });

  const [novaDisciplina, setNovaDisciplina] = useState('');

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
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

  const removerDisciplina = (disciplina) => {
    setFormData({
      ...formData,
      disciplinas: formData.disciplinas.filter(d => d !== disciplina)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Salvando professor:', formData);
    alert(professor ? 'Professor atualizado com sucesso!' : 'Professor cadastrado com sucesso!');
    onClose();
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
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
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
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
                      Data de Nascimento *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dataNascimento}
                      onChange={(e) => handleChange('dataNascimento', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sexo *
                    </label>
                    <select
                      required
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                    <input
                      type="text"
                      value={formData.complemento}
                      onChange={(e) => handleChange('complemento', e.target.value)}
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
                        type="text"
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

              <div>
                <h4 className="font-medium text-gray-800 mb-3">Turmas (Opcional)</h4>
                <p className="text-sm text-gray-600 mb-3">
                  As turmas podem ser associadas posteriormente na gestão de turmas
                </p>
                <select
                  multiple
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  size="5"
                >
                  <option>1º Ano A</option>
                  <option>2º Ano A</option>
                  <option>3º Ano B</option>
                  <option>4º Ano C</option>
                  <option>5º Ano A</option>
                </select>
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
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Voltar
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Próximo
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {professor ? 'Atualizar Professor' : 'Cadastrar Professor'}
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