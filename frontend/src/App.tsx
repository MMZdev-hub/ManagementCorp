import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import NovaAuditoria from "./pages/NovaAuditoria";
import Processos from "./pages/Processos";
import Permissoes from "./pages/Permissoes";
import AuditoriaInternaPage from "./pages/AuditoriaInterna";
import Historico from "./pages/Historico";
import Tarefas from "./pages/Tarefas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auditoria/nova" element={
          <PrivateRoute>
            <NovaAuditoria />
          </PrivateRoute>
        } />
        <Route path="/processos" element={
          <PrivateRoute>
            <Processos />
          </PrivateRoute>
        } />
        <Route path="/permissoes" element={
          <PrivateRoute>
            <Permissoes />
          </PrivateRoute>
        } />
        <Route path="/auditoria-interna" element={
          <PrivateRoute>
            <AuditoriaInternaPage />
          </PrivateRoute>
        } />
        <Route path="/historico" element={
          <PrivateRoute>
            <Historico />
          </PrivateRoute>
        } />
        <Route path="/tarefas" element={
          <PrivateRoute>
              <Tarefas />
          </PrivateRoute>
        } />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;