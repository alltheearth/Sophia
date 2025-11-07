import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/Dashboard";
import Financeiro from "./pages/Financeiro";
import Alunos from "./pages/Alunos"
import Professores from "./pages/Professores";
import Turmas from "./pages/Turmas";
import Notas from "./pages/Notas";
import Auth from "./pages/Auth";
import Agenda from "./pages/Agenda";
import Comunicacao from "./pages/Comunicacao";
import type { JSX } from "react";

// Componente para proteger rotas
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota pública */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Rotas protegidas */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="financeiro" element={<Financeiro />} />
            <Route path="alunos" element={<Alunos />} />
            <Route path="professores" element={<Professores />} />
            <Route path="turmas" element={<Turmas />} />
            <Route path="notas" element={<Notas />} />
            <Route path="agenda" element={<Agenda />} />
            <Route path="comunicacao" element={<Comunicacao />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;