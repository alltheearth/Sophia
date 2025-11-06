// src/pages/Comunicacao/components/Galeria.jsx

import React, { useState } from 'react';
import { Image as ImageIcon, Video, Download, Heart, MessageCircle, Eye, Calendar, X } from 'lucide-react';

const Galeria = () => {
  const [filtroTipo, setFiltroTipo] = useState('TODOS');
  const [midiaVisualizando, setMidiaVisualizando] = useState(null);

  // Mídias mockadas
  const midias = [
    {
      id: 1,
      tipo: 'FOTO',
      titulo: 'Aula de Artes - Pintura',
      descricao: 'Os alunos do 3º ano criando suas obras de arte! 🎨',
      url: null,
      thumbnail: null,
      turma: '3º Ano A',
      alunos: ['Pedro', 'Ana', 'Lucas'],
      data: '2024-11-05',
      criadoPor: 'Prof. Lucia Santos',
      visualizacoes: 45,
      curtidas: 12,
      comentarios: 3
    },
    {
      id: 2,
      tipo: 'VIDEO',
      titulo: 'Apresentação de Teatro',
      descricao: 'Turminha do 5º ano apresentando a peça "O Pequeno Príncipe" 🎭',
      url: null,
      thumbnail: null,
      turma: '5º Ano A',
      alunos: ['Ana Carolina', 'Beatriz', 'Rafael'],
      data: '2024-11-04',
      criadoPor: 'Coordenação',
      visualizacoes: 89,
      curtidas: 25,
      comentarios: 8,
      duracao: '3:45'
    },
    {
      id: 3,
      tipo: 'FOTO',
      titulo: 'Recreio - Brincadeiras',
      descricao: 'Momentos de diversão no recreio! 😊',
      url: null,
      thumbnail: null,
      turma: '2º Ano A',
      alunos: ['Juliana', 'Carlos', 'Maria'],
      data: '2024-11-03',
      criadoPor: 'Monitor',
      visualizacoes: 67,
      curtidas: 18,
      comentarios: 5
    },
    {
      id: 4,
      tipo: 'FOTO',
      titulo: 'Experimento de Ciências',
      descricao: 'Vulcão de bicarbonato em ação! 🌋',
      url: null,
      thumbnail: null,
      turma: '4º Ano C',
      alunos: ['Lucas Gabriel', 'Pedro'],
      data: '2024-11-02',
      criadoPor: 'Prof. Carlos Lima',
      visualizacoes: 52,
      curtidas: 15,
      comentarios: 4
    },
    {
      id: 5,
      tipo: 'VIDEO',
      titulo: 'Aula de Educação Física',
      descricao: 'Circuito de atividades ao ar livre 🏃‍♂️',
      url: null,
      thumbnail: null,
      turma: '1º Ano B',
      alunos: ['Todos'],
      data: '2024-11-01',
      criadoPor: 'Prof. Roberto Lima',
      visualizacoes: 73,
      curtidas: 20,
      comentarios: 6,
      duracao: '2:15'
    },
    {
      id: 6,
      tipo: 'FOTO',
      titulo: 'Lanche Coletivo',
      descricao: 'Degustação de frutas na aula de nutrição 🍎🍌',
      url: null,
      thumbnail: null,
      turma: '3º Ano B',
      alunos: ['Mariana', 'Gabriel', 'Isabella'],
      data: '2024-10-31',
      criadoPor: 'Nutricionista',
      visualizacoes: 41,
      curtidas: 11,
      comentarios: 2
    }
  ];

  const midiasFiltradas = midias.filter(midia =>
    filtroTipo === 'TODOS' || midia.tipo === filtroTipo
  );

  const handleCurtir = (midia) => {
    console.log('Curtindo mídia:', midia.id);
  };

  const handleComentar = (midia) => {
    console.log('Comentando mídia:', midia.id);
  };

  const handleDownload = (midia) => {
    console.log('Baixando mídia:', midia.id);
    alert('Download iniciado!');
  };

  const handleVisualizar = (midia) => {
    setMidiaVisualizando(midia);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Tipo de mídia:</span>
            <div className="flex gap-2">
              {['TODOS', 'FOTO', 'VIDEO'].map((tipo) => (
                <button
                  key={tipo}
                  onClick={() => setFiltroTipo(tipo)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filtroTipo === tipo
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de Mídias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {midiasFiltradas.map((midia) => (
            <div
              key={midia.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleVisualizar(midia)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                {midia.tipo === 'FOTO' ? (
                  <ImageIcon className="w-16 h-16 text-pink-400" />
                ) : (
                  <>
                    <Video className="w-16 h-16 text-purple-400" />
                    {midia.duracao && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                        {midia.duracao}
                      </div>
                    )}
                  </>
                )}
                <div className="absolute top-2 left-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    midia.tipo === 'FOTO'
                      ? 'bg-blue-500 text-white'
                      : 'bg-purple-500 text-white'
                  }`}>
                    {midia.tipo === 'FOTO' ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                    {midia.tipo}
                  </span>
                </div>
              </div>

              {/* Informações */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-800 flex-1">{midia.titulo}</h3>
                  <span className="text-xs text-gray-500 ml-2">
                    {new Date(midia.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{midia.descricao}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                    {midia.turma}
                  </span>
                  {midia.alunos.length > 0 && (
                    <span className="inline-flex px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">
                      {midia.alunos.length} {midia.alunos.length === 1 ? 'aluno' : 'alunos'}
                    </span>
                  )}
                </div>

                {/* Estatísticas */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCurtir(midia);
                      }}
                      className="flex items-center gap-1 hover:text-pink-600 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span>{midia.curtidas}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComentar(midia);
                      }}
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{midia.comentarios}</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{midia.visualizacoes}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(midia);
                    }}
                    className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                {/* Criador */}
                <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                  Compartilhado por {midia.criadoPor}
                </div>
              </div>
            </div>
          ))}
        </div>

        {midiasFiltradas.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhuma mídia encontrada</h3>
            <p className="text-gray-600">Não há fotos ou vídeos para o filtro selecionado.</p>
          </div>
        )}
      </div>

      {/* Modal de Visualização */}
      {midiaVisualizando && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="max-w-5xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">{midiaVisualizando.titulo}</h2>
              <button
                onClick={() => setMidiaVisualizando(null)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl aspect-video flex items-center justify-center mb-4">
              {midiaVisualizando.tipo === 'FOTO' ? (
                <ImageIcon className="w-32 h-32 text-pink-500" />
              ) : (
                <Video className="w-32 h-32 text-purple-500" />
              )}
            </div>

            <div className="bg-white rounded-xl p-6">
              <p className="text-gray-700 mb-4">{midiaVisualizando.descricao}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Turma:</span>
                  <span className="ml-2 font-medium text-gray-800">{midiaVisualizando.turma}</span>
                </div>
                <div>
                  <span className="text-gray-600">Data:</span>
                  <span className="ml-2 font-medium text-gray-800">
                    {new Date(midiaVisualizando.data).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Alunos:</span>
                  <span className="ml-2 font-medium text-gray-800">
                    {midiaVisualizando.alunos.join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Compartilhado por:</span>
                  <span className="ml-2 font-medium text-gray-800">{midiaVisualizando.criadoPor}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleCurtir(midiaVisualizando)}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Curtir ({midiaVisualizando.curtidas})
                </button>
                <button
                  onClick={() => handleComentar(midiaVisualizando)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Comentar ({midiaVisualizando.comentarios})
                </button>
                <button
                  onClick={() => handleDownload(midiaVisualizando)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ml-auto"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Galeria;