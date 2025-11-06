import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout"
import Dashboard from "./components/Dashboard";
import Financeiro from "./pages/Financeiro";
import Alunos from "./pages/Alunos";
import Professores from "./pages/Professores"
import Turmas from "./pages/Turmas"
import Notas from "./pages/Notas"
import Auth from "./pages/Auth"
import Agenda from "./pages/Agenda"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="auth" element={<Auth />} />
        {/* Layout fixo */}
        <Route path="/" element={<MainLayout />}>
          {/* Rotas "filhas" que mudam dentro do layout */}
          <Route index element={<Dashboard />} />
          <Route path="financeiro" element={<Financeiro />} />
          <Route path="alunos" element={<Alunos />} />
          <Route path="professores" element={<Professores />} />
          <Route path="turmas" element={<Turmas />} />
          <Route path="notas" element={<Notas />} />
          <Route path="agenda" element={<Agenda />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
