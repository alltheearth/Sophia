import { BarChart3, BookOpen, Calendar, DollarSign, GraduationCap, MessageSquare, Users } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [userRole] = useState('GESTOR'); // Pode ser: SUPERUSER, GESTOR, COORDENADOR, PROFESSOR, RESPONSAVEL
      
    const user = {
    nome: 'Maria Silva',
    role: 'Gestora',
    escola: 'Colégio Luz do Saber',
    foto: null
  };
 
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', active: true, roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR'] },
    { icon: Users, label: 'Alunos', roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR', 'PROFESSOR'] },
    { icon: GraduationCap, label: 'Professores', roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR'] },
    { icon: BookOpen, label: 'Turmas', roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR', 'PROFESSOR'] },
    { icon: BarChart3, label: 'Notas', roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR', 'PROFESSOR'] },
    { icon: Calendar, label: 'Agenda', roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR', 'PROFESSOR'] },
    { icon: DollarSign, label: 'Financeiro', roles: ['SUPERUSER', 'GESTOR'] },
    { icon: MessageSquare, label: 'Comunicação', roles: ['SUPERUSER', 'GESTOR', 'COORDENADOR', 'PROFESSOR'] }
  ];
  const visibleMenuItems = menuItems.filter(item => item.roles.includes(userRole));

    return (
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-600 to-blue-800 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 flex items-center justify-between border-b border-blue-500/30">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Sophia</h1>
                <p className="text-xs text-blue-200">Gestão Escolar</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm mx-auto">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {visibleMenuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-blue-100 hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-blue-500/30">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">MS</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.nome}</p>
                <p className="text-xs text-blue-200 truncate">{user.role}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

    )
}

export default Sidebar