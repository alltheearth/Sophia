// src/pages/Comunicacao/modals/UploadMidia.jsx

import React, { useState } from 'react';
import { X, Upload, Image, Video, FileImage, Trash2, Users, Tag, Calendar } from 'lucide-react';

const UploadMidiaModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo: 'FOTO',
    turma: '',
    alunos: [],
    tags: '',
    data: new Date().toISOString().split('T')[0]
  });

  const [arquivos, setArquivos] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const novosArquivos = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file)
    }));
    setArquivos([...arquivos, ...novosArquivos]);
  };

  const handleRemoverArquivo = (id) => {
    setArquivos(arquivos.filter(arquivo => arquivo.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (arquivos.length === 0) {
      alert('Selecione pelo menos um arquivo');
      return;
    }
    console.log('Upload de mídia:', { ...formData, arquivos });
    alert(`${arquivos.length} arquivo(s) enviado(s) com sucesso!`);
    onClose();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const totalSize = arquivos.reduce((total, arquivo) => total + arquivo.size, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">Upload de Fotos e Vídeos</h3>
              <p className="text-sm text-white/90">Compartilhe momentos especiais com os pais</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Área de Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arquivos *
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium mb-1">
                    Clique para selecionar ou arraste arquivos aqui
                  </p>
                  <p className="text-sm text-gray-500">
                    Suporta: JPG, PNG, GIF, MP4, MOV (máx. 50MB por arquivo)
                  </p>
                </label>
              </div>
            </div>

            {/* Preview dos Arquivos */}
            {arquivos.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Arquivos Selecionados ({arquivos.length})
                  </label>
                  <p className="text-xs text-gray-500">Total: {formatFileSize(totalSize)}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {arquivos.map((arquivo) => (
                    <div key={arquivo.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        {arquivo.type.startsWith('image/') ? (
                          <img
                            src={arquivo.preview}
                            alt={arquivo.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                            <Video className="w-12 h-12 text-purple-600 mb-2" />
                            <p className="text-xs text-gray-600 px-2 text-center truncate w-full">
                              {arquivo.name}
                            </p>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoverArquivo(arquivo.id)}
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {formatFileSize(arquivo.size)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Informações */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) => handleChange('titulo', e.target.value)}
                  placeholder="Ex: Aula de Artes - Pintura"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => handleChange('descricao', e.target.value)}
                  rows={3}
                  placeholder="Descreva o momento ou atividade..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo *
                </label>
                <select
                  required
                  value={formData.tipo}
                  onChange={(e) => handleChange('tipo', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="FOTO">Foto</option>
                  <option value="VIDEO">Vídeo</option>
                  <option value="ALBUM">Álbum</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turma *
                </label>
                <select
                  required
                  value={formData.turma}
                  onChange={(e) => handleChange('turma', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecione...</option>
                  <option value="5-ano-a">5º Ano A</option>
                  <option value="5-ano-b">5º Ano B</option>
                  <option value="4-ano-c">4º Ano C</option>
                  <option value="3-ano-a">3º Ano A</option>
                  <option value="2-ano-a">2º Ano A</option>
                  <option value="1-ano-b">1º Ano B</option>
                  <option value="todas">Todas as Turmas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data do Evento
                </label>
                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) => handleChange('data', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="relative">
                  <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => handleChange('tags', e.target.value)}
                    placeholder="Ex: arte, criatividade, pintura"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Separe as tags por vírgula</p>
              </div>
            </div>

            {/* Alunos Marcados */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alunos Aparecendo nas Fotos
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Digite para buscar alunos..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Os pais dos alunos marcados serão notificados
              </p>
            </div>

            {/* Configurações */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-3">Configurações de Privacidade</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-700">
                    Permitir download das imagens pelos pais
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-700">
                    Enviar notificação aos pais dos alunos marcados
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">
                    Adicionar marca d'água com logo da escola
                  </span>
                </label>
              </div>
            </div>

            {/* Informações Importantes */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileImage className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">⚠️ Diretrizes de Compartilhamento</p>
                  <ul className="text-xs space-y-1">
                    <li>• Certifique-se de ter autorização dos pais para compartilhar imagens</li>
                    <li>• Evite fotos que possam identificar crianças em situações sensíveis</li>
                    <li>• Verifique a qualidade e adequação do conteúdo antes de enviar</li>
                    <li>• As mídias enviadas ficam disponíveis por tempo indeterminado</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-white flex justify-between items-center sticky bottom-0">
            <div className="text-sm text-gray-600">
              {arquivos.length > 0 && (
                <span>
                  {arquivos.length} arquivo(s) • {formatFileSize(totalSize)}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={arquivos.length === 0}
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Upload className="w-4 h-4" />
                Publicar Mídia
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadMidiaModal;