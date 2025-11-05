import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout"
import Dashboard from "./components/Dashboard";
import Financeiro from "./pages/Financeiro";
import Alunos from "./pages/Alunos";
import Professores from "./pages/Professores"

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout fixo */}
        <Route path="/" element={<MainLayout />}>
          {/* Rotas "filhas" que mudam dentro do layout */}
          <Route index element={<Dashboard />} />
          <Route path="financeiro" element={<Financeiro />} />
          <Route path="alunos" element={<Alunos />} />
          <Route path="professores" element={<Professores />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
