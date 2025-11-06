import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle, Shield, LogIn, Key } from 'lucide-react';

// ============= PÁGINA DE LOGIN =============
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Salva token
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Verifica se precisa trocar senha
        if (data.user.primeiro_acesso || data.user.senha_temporaria) {
          window.location.href = '/trocar-senha';
        } else {
          window.location.href = '/';
        }
      } else {
        setError(data.detail || 'Email ou senha inválidos');
      }
    } catch (err) {
      setError('Erro ao conectar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return <ForgotPasswordPage onBack={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-xl mx-auto mb-4 flex items-center justify-center">
            <img src='images/logo-sophia.png' className="bg-blue-50 w-20 h-20  rounded-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sistema Sophia</h1>
          <p className="text-blue-100">Gestão Escolar Inteligente</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Bem-vindo de volta!
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Esqueci minha senha */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Esqueci minha senha
              </button>
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Entrar
                </>
              )}
            </button>
          </form>

          {/* Avisos de Segurança */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">🔒 Acesso Seguro</p>
                <p className="text-xs">
                  Suas credenciais são protegidas com criptografia de ponta a ponta.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-100 text-sm mt-6">
          © 2025 Sophia. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

// ============= PÁGINA DE TROCA DE SENHA =============
const TrocarSenhaPage = () => {
  const [formData, setFormData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    atual: false,
    nova: false,
    confirmar: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [forcedChange, setForcedChange] = useState(false);

  React.useEffect(() => {
    // Verifica se é primeiro acesso
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setForcedChange(user.primeiro_acesso || user.senha_temporaria);
  }, []);

  const validarSenha = (senha) => {
    const erros = [];
    if (senha.length < 8) erros.push('Mínimo 8 caracteres');
    if (!/[A-Z]/.test(senha)) erros.push('Uma letra maiúscula');
    if (!/[a-z]/.test(senha)) erros.push('Uma letra minúscula');
    if (!/[0-9]/.test(senha)) erros.push('Um número');
    if (!/[!@#$%^&*]/.test(senha)) erros.push('Um caractere especial');
    return erros;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validações
    const erros = validarSenha(formData.novaSenha);
    if (erros.length > 0) {
      setError(`Senha fraca. Necessário: ${erros.join(', ')}`);
      setLoading(false);
      return;
    }

    if (formData.novaSenha !== formData.confirmarSenha) {
      setError('As senhas não conferem');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('/api/auth/trocar-senha/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          senha_atual: formData.senhaAtual || undefined,
          nova_senha: formData.novaSenha,
          confirmar_senha: formData.confirmarSenha
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setError(data.senha_atual?.[0] || data.nova_senha?.[0] || 'Erro ao trocar senha');
      }
    } catch (err) {
      setError('Erro ao conectar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const forcaSenha = () => {
    const senha = formData.novaSenha;
    if (!senha) return { nivel: 0, cor: 'gray', texto: 'Digite uma senha' };
    
    const erros = validarSenha(senha);
    if (erros.length === 0) return { nivel: 100, cor: 'green', texto: 'Senha forte' };
    if (erros.length <= 2) return { nivel: 60, cor: 'yellow', texto: 'Senha média' };
    return { nivel: 30, cor: 'red', texto: 'Senha fraca' };
  };

  const forca = forcaSenha();

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Senha Alterada!</h2>
          <p className="text-gray-600">Redirecionando para o sistema...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-xl mx-auto mb-4 flex items-center justify-center">
            <Key className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {forcedChange ? 'Primeiro Acesso' : 'Trocar Senha'}
          </h1>
          <p className="text-purple-100">
            {forcedChange 
              ? 'Por segurança, você deve criar uma nova senha'
              : 'Altere sua senha regularmente por segurança'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {forcedChange && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Troca de senha obrigatória</p>
                  <p className="text-xs mt-1">Sua senha atual é temporária e deve ser alterada.</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Senha Atual (apenas se não for primeiro acesso) */}
            {!forcedChange && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha Atual
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPasswords.atual ? 'text' : 'password'}
                    required={!forcedChange}
                    value={formData.senhaAtual}
                    onChange={(e) => setFormData({ ...formData, senhaAtual: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, atual: !showPasswords.atual })}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPasswords.atual ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Nova Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nova Senha
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPasswords.nova ? 'text' : 'password'}
                  required
                  value={formData.novaSenha}
                  onChange={(e) => setFormData({ ...formData, novaSenha: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, nova: !showPasswords.nova })}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPasswords.nova ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Indicador de Força */}
              {formData.novaSenha && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Força da senha:</span>
                    <span className={`text-xs font-medium text-${forca.cor}-600`}>{forca.texto}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${forca.cor}-500 h-2 rounded-full transition-all`}
                      style={{ width: `${forca.nivel}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Mínimo 8 caracteres, com maiúsculas, minúsculas, números e caracteres especiais
                  </p>
                </div>
              )}
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Nova Senha
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPasswords.confirmar ? 'text' : 'password'}
                  required
                  value={formData.confirmarSenha}
                  onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, confirmar: !showPasswords.confirmar })}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPasswords.confirmar ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmarSenha && formData.novaSenha !== formData.confirmarSenha && (
                <p className="text-xs text-red-600 mt-1">As senhas não conferem</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'Alterando...' : 'Alterar Senha'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ============= PÁGINA ESQUECI MINHA SENHA =============
const ForgotPasswordPage = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/redefinir-senha/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setSuccess(true);
      }
    } catch (err) {
      setError('Erro ao conectar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Enviado!</h2>
          <p className="text-gray-600 mb-6">
            Se o email estiver cadastrado, você receberá instruções para redefinir sua senha.
          </p>
          <button
            onClick={onBack}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar ao Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Esqueceu sua senha?</h2>
        <p className="text-gray-600 mb-6">
          Digite seu email e enviaremos instruções para redefinir sua senha.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {loading ? 'Enviando...' : 'Enviar Instruções'}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Voltar ao Login
          </button>
        </form>
      </div>
    </div>
  );
};

// ============= APP PRINCIPAL (DEMO) =============
export default function AuthApp() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <>
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'trocar-senha' && <TrocarSenhaPage />}
    </>
  );
}