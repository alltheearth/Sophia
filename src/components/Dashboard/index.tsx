import { useState, useEffect } from 'react';
import { Users, BookOpen, GraduationCap, TrendingUp, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

const Dashboard = () => {
  const { user, escola } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (escola?.id) {
      loadDashboardData();
    }
  }, [escola]);

  const loadDashboardData = async () => {
    try {
      const data = await api.getDashboard(escola!.id);
      setDashboardData(data.data);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </main>
    );
  }

  const stats = [
    {
      title: 'Total de Alunos',
      value: dashboardData?.total_alunos || '0',
      change: '+12',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Professores Ativos',
      value: dashboardData?.total_professores || '0',
      change: '+3',
      changeType: 'positive',
      icon: GraduationCap,
      color: 'bg-purple-500'
    },
    {
      title: 'Turmas',
      value: dashboardData?.total_turmas || '0',
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

  return (
    <main className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Olá, {user?.first_name}! 👋</h2>
        <p className="text-gray-600 mt-1">Aqui está um resumo do que está acontecendo hoje em {escola?.nome}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                {stat.changeType === 'positive' && <TrendingUp className="w-4 h-4" />}
                <span className="font-medium">{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;