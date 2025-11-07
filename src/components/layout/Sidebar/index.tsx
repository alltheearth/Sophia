import { BarChart3, Users, GraduationCap, BookOpen, Calendar, DollarSign, MessageSquare, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, escola, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', id: 'dashboard', roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR'] },
    { icon: Users, label: 'Alunos', id: 'alunos', roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR', 'PROFESSOR'] },
    { icon: GraduationCap, label: 'Professores', id: 'professores', roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR'] },
    { icon: BookOpen, label: 'Turmas', id: 'turmas', roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR', 'PROFESSOR'] },
    { icon: BarChart3, label: 'Notas', id: 'notas', roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR', 'PROFESSOR'] },
    { icon: Calendar, label: 'Agenda', id: 'agenda', roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR', 'PROFESSOR'] },
    { icon: DollarSign, label: 'Financeiro', id: 'financeiro', roles: ['SUPERUSER', 'GESTOR'] },
    { icon: MessageSquare, label: 'Comunicação', id: 'comunicacao', roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR', 'PROFESSOR'] }
  ];

  const visibleMenuItems = menuItems.filter(item => item.roles.includes(user?.role || ''));

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-600 to-blue-800 text-white transition-all duration-300 flex flex-col`}>
      <div className="p-6 flex items-center justify-between border-b border-blue-500/30">
        {sidebarOpen ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Sophia</h1>
              <p className="text-xs text-blue-200">Gestão Escolar</p>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
        )}
        {sidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        )}
      </div>
      
      {!sidebarOpen && (
        <div className="p-4 border-b border-blue-500/30">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-white mx-auto" />
          </button>
        </div>
      )}

      {sidebarOpen && escola && (
        <div className="px-4 py-3 bg-white/10 border-b border-blue-500/30">
          <p className="text-xs text-blue-200">Escola Ativa:</p>
          <p className="text-sm font-medium truncate">{escola.nome}</p>
        </div>
      )}

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {visibleMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentPage === item.id
                ? 'bg-white/20 text-white shadow-lg' 
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-500/30">
        <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </span>
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-blue-200 truncate">{user?.role}</p>
            </div>
          )}
        </div>
        {sidebarOpen && (
          <button
            onClick={logout}
            className="w-full mt-3 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
          >
            Sair
          </button>
        )}
      </div>
    </aside>
  );
};
