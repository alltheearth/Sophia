import { useState } from 'react';
import { BarChart3, Users, BookOpen, GraduationCap, DollarSign, Calendar, MessageSquare, Bell, Search, Menu, ChevronDown, TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [userRole] = useState('GESTOR'); // Pode ser: SUPERUSER, GESTOR, COORDENADOR, PROFESSOR, RESPONSAVEL

     const user = {
    nome: 'Maria Silva',
    role: 'Gestora',
    escola: 'Colégio Luz do Saber',
    foto: null
  };

  const stats = [
    {
      title: 'Total de Alunos',
      value: '847',
      change: '+12',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Professores Ativos',
      value: '52',
      change: '+3',
      changeType: 'positive',
      icon: GraduationCap,
      color: 'bg-purple-500'
    },
    {
      title: 'Turmas',
      value: '28',
      change: '0',
      changeType: 'neutral',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Taxa de Presença',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'bg-teal-500'
    }
  ];

  const financialStats = [
    {
      title: 'Receita Mensal',
      value: 'R$ 145.780',
      change: '+8.3%',
      changeType: 'positive'
    },
    {
      title: 'Mensalidades Pagas',
      value: '742/847',
      percentage: '87.6%',
      changeType: 'positive'
    },
    {
      title: 'Em Atraso',
      value: 'R$ 18.420',
      count: '105 alunos',
      changeType: 'negative'
    }
  ];

  const recentActivities = [
    { type: 'nota', message: 'Prof. João lançou notas do 5º Ano A - Matemática', time: '5 min atrás' },
    { type: 'frequencia', message: 'Frequência do 3º Ano B registrada', time: '12 min atrás' },
    { type: 'pagamento', message: 'Mensalidade paga - Ana Carolina Silva', time: '25 min atrás' },
    { type: 'comunicado', message: 'Novo comunicado enviado para Ensino Médio', time: '1 hora atrás' },
    { type: 'aluno', message: 'Novo aluno matriculado - 2º Ano C', time: '2 horas atrás' }
  ];

  const upcomingEvents = [
    { title: 'Reunião de Pais - 1º Ano', date: '05 Nov', time: '19:00' },
    { title: 'Prova Bimestral - Matemática', date: '08 Nov', time: '08:00' },
    { title: 'Entrega de Boletins', date: '15 Nov', time: '14:00' },
    { title: 'Formatura 5º Ano', date: '20 Nov', time: '19:30' }
  ];

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
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Olá, {user.nome.split(' ')[0]}! 👋</h2>
            <p className="text-gray-600 mt-1">Aqui está um resumo do que está acontecendo hoje.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {stat.changeType === 'positive' ? <TrendingUp className="w-4 h-4" /> : 
                     stat.changeType === 'negative' ? <TrendingDown className="w-4 h-4" /> : null}
                    <span className="font-medium">{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Financial Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {financialStats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-gray-600 text-sm mb-2">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
                {stat.percentage && (
                  <p className="text-sm text-gray-600">{stat.percentage} do total</p>
                )}
                {stat.count && (
                  <p className="text-sm text-gray-600">{stat.count}</p>
                )}
                {stat.change && (
                  <p className={`text-sm mt-2 font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} vs. mês anterior
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Atividades Recentes</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Ver todas
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === 'nota' ? 'bg-purple-500' :
                      activity.type === 'frequencia' ? 'bg-green-500' :
                      activity.type === 'pagamento' ? 'bg-blue-500' :
                      activity.type === 'comunicado' ? 'bg-orange-500' :
                      'bg-gray-400'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">{activity.message}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Próximos Eventos</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Ver agenda
                </button>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
                    <div className="bg-blue-50 px-3 py-2 rounded-lg text-center flex-shrink-0">
                      <p className="text-xs text-blue-600 font-medium">{event.date}</p>
                      <p className="text-xs text-gray-600 mt-1">{event.time}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{event.title}</p>
                    </div>
                    <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
  );
};

export default Dashboard;