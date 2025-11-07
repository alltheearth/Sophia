// src/pages/Alunos/modals/CadastroAluno.tsx

import React, { useState } from 'react';
import { X, Upload, Plus, Trash2, User } from 'lucide-react';
import {  type Aluno, alunosApi } from '../../../services/alunosApi';

interface CadastroAlunoModalProps {
  aluno: Aluno | null;
  escolaId: string;
  onClose: () => void;
  onSalvar: () => void;
}

const CadastroAlunoModal: React.FC<CadastroAlunoModalProps> = ({ 
  aluno, 
  escolaId, 
  onClose, 
  onSalvar 
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados do Aluno
    nome: aluno?.nome || '',
    dataNascimento: aluno?.data_nascimento || aluno?.dataNascimento || '',
    cpf: aluno?.cpf || '',
    rg: aluno?.rg || '',
    sexo: aluno?.sexo || '',
    
    // Endereço
    cep: aluno?.cep || '',
    endereco: aluno?.endereco || '',
    numero: aluno?.numero || '',
    complemento: aluno?.complemento || '',
    bairro: aluno?.bairro || '',
    cidade: aluno?.cidade || '',
    estado: aluno?.estado || '',
    
    // Dados Escolares
    matricula: aluno?.matricula || '',
    turma: aluno?.turma_atual || aluno?.turma || '',
    turno: aluno?.turno || 'MATUTINO',
    dataMatricula: aluno?.data_matricula || aluno?.dataMatricula || new Date().toISOString().split('T')[0],
    
    // Responsáveis
    responsaveis: aluno?.responsaveis && aluno.responsaveis.length > 0 ? aluno.responsaveis.map(r => ({
      nome: r.nome,
      cpf: r.cpf || '',
      parentesco: r.parentesco,
      telefone: r.telefone,
      email: r.email,
      responsavelFinanceiro: r.responsavel_financeiro
    })) : [{
      nome: '',
      cpf: '',
      parentesco: 'MÃE',
      telefone: '',
      email: '',
      responsavelFinanceiro: true
    }],
    
    // Saúde
    tipoSanguineo: aluno?.tipo_sanguineo || aluno?.tipoSanguineo || '',
    alergias: aluno?.alergias || '',
    medicamentos: aluno?.medicamentos || '',
    observacoesMedicas: aluno?.observacoes_medicas || aluno?.observacoesMedicas || ''
  });

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setErro('');

    try {
      if (aluno) {
        // Atualizar
        await alunosApi.atualizar(aluno.id, formData);
        alert('Aluno atualizado com sucesso!');
      } else {
        // Criar
        await alunosApi.criar(formData, escolaId);
        alert('Aluno cadastrado com sucesso!');
      }
      onSalvar();
    } catch (err: any) {
      setErro(err.message || 'Erro ao salvar aluno');
      console.error('Erro ao salvar:', err);
    } finally {
      setSalvando(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleResponsavelChange = (index: number, field: string, value: any) => {
    const novosResponsaveis = [...formData.responsaveis];
    novosResponsaveis[index] = { ...novosResponsaveis[index], [field]: value };
    setFormData({ ...formData, responsaveis: novosResponsaveis });
  };

  const adicionarResponsavel = () => {
    setFormData({
      ...formData,
      responsaveis: [
        ...formData.responsaveis,
        {
          nome: '',
          cpf: '',
          parentesco: 'PAI',
          telefone: '',
          email: '',
          responsavelFinanceiro: false
        }
      ]
    });
  };

  const removerResponsavel = (index: number) => {
    if (formData.responsaveis.length > 1) {
      const novosResponsaveis = formData.responsaveis.filter((_, i) => i !== index);
      setFormData({ ...formData, responsaveis: novosResponsaveis });
    }
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
              {aluno ? 'Editar Aluno' : 'Novo Aluno'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Steps */}
          <div className="flex items-center gap-4 mt-4">
            {[
              { num: 1, label: 'Dados do Aluno' },
              { num: 2, label: 'Responsáveis' },
              { num: 3, label: 'Informações Adicionais' }
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                  step >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
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
          {/* Erro */}
          {erro && (
            <div className="mx-6 mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-sm text-red-800">{erro}</p>
            </div>
          )}

          {/* Step 1: Dados do Aluno */}
          {step === 1 && (
            <div className="p-6 space-y-6">
              {/* Foto */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  <User className="w-12 h-12" />
                </div>
                <button 
                  type="button" 
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                >
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione...</option>
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                    <input
                      type="text"
                      value={formData.cpf}
                      onChange={(e) => handleChange('cpf', e.target.value)}
                      placeholder="000.000.000-00"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">RG</label>
                    <input
                      type="text"
                      value={formData.rg}
                      onChange={(e) => handleChange('rg', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div></div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                    <input
                      type="text"
                      value={formData.endereco}
                      onChange={(e) => handleChange('endereco', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número</label>
                    <input
                      type="text"
                      value={formData.numero}
                      onChange={(e) => handleChange('numero', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                    <input
                      type="text"
                      value={formData.complemento}
                      onChange={(e) => handleChange('complemento', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
                    <input
                      type="text"
                      value={formData.bairro}
                      onChange={(e) => handleChange('bairro', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                    <input
                      type="text"
                      value={formData.cidade}
                      onChange={(e) => handleChange('cidade', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Dados Escolares */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Dados Escolares</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Matrícula {!aluno && '*'}
                    </label>
                    <input
                      type="text"
                      required={!aluno}
                      value={formData.matricula}
                      onChange={(e) => handleChange('matricula', e.target.value)}
                      placeholder="Ex: 2024001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Matrícula *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dataMatricula}
                      onChange={(e) => handleChange('dataMatricula', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Turma</label>
                    <input
                      type="text"
                      value={formData.turma}
                      onChange={(e) => handleChange('turma', e.target.value)}
                      placeholder="Ex: 1º Ano A"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Turno *</label>
                    <select
                      required
                      value={formData.turno}
                      onChange={(e) => handleChange('turno', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="MATUTINO">Matutino</option>
                      <option value="VESPERTINO">Vespertino</option>
                      <option value="NOTURNO">Noturno</option>
                      <option value="INTEGRAL">Integral</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Responsáveis */}
          {step === 2 && (
            <div className="p-6 space-y-6">
              {formData.responsaveis.map((responsavel, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-800">Responsável {index + 1}</h4>
                    {formData.responsaveis.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removerResponsavel(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={responsavel.nome}
                        onChange={(e) => handleResponsavelChange(index, 'nome', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CPF *</label>
                      <input
                        type="text"
                        required
                        value={responsavel.cpf}
                        onChange={(e) => handleResponsavelChange(index, 'cpf', e.target.value)}
                        placeholder="000.000.000-00"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parentesco *
                      </label>
                      <select
                        required
                        value={responsavel.parentesco}
                        onChange={(e) => handleResponsavelChange(index, 'parentesco', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="MÃE">Mãe</option>
                        <option value="PAI">Pai</option>
                        <option value="AVÔ">Avô</option>
                        <option value="AVÓ">Avó</option>
                        <option value="TIO">Tio</option>
                        <option value="TIA">Tia</option>
                        <option value="OUTRO">Outro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={responsavel.telefone}
                        onChange={(e) => handleResponsavelChange(index, 'telefone', e.target.value)}
                        placeholder="(00) 00000-0000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={responsavel.email}
                        onChange={(e) => handleResponsavelChange(index, 'email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={responsavel.responsavelFinanceiro}
                          onChange={(e) => handleResponsavelChange(index, 'responsavelFinanceiro', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">Responsável Financeiro</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={adicionarResponsavel}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 w-full justify-center"
              >
                <Plus className="w-4 h-4" />
                Adicionar Responsável
              </button>
            </div>
          )}

          {/* Step 3: Informações Adicionais */}
          {step === 3 && (
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Informações de Saúde</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo Sanguíneo
                    </label>
                    <select
                      value={formData.tipoSanguineo}
                      onChange={(e) => handleChange('tipoSanguineo', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione...</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div></div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alergias</label>
                    <textarea
                      value={formData.alergias}
                      onChange={(e) => handleChange('alergias', e.target.value)}
                      rows={3}
                      placeholder="Descreva alergias conhecidas..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medicamentos de Uso Contínuo
                    </label>
                    <textarea
                      value={formData.medicamentos}
                      onChange={(e) => handleChange('medicamentos', e.target.value)}
                      rows={3}
                      placeholder="Liste medicamentos de uso contínuo..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observações Médicas
                    </label>
                    <textarea
                      value={formData.observacoesMedicas}
                      onChange={(e) => handleChange('observacoesMedicas', e.target.value)}
                      rows={3}
                      placeholder="Outras observações médicas importantes..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
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
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Próximo
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={salvando}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {salvando ? 'Salvando...' : (aluno ? 'Atualizar Aluno' : 'Cadastrar Aluno')}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroAlunoModal;