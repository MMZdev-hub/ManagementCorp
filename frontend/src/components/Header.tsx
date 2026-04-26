import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { getEmailFromToken } from "../services/authService";

interface HeaderProps {
    paginaAtiva?: string;
}

export default function Header({ paginaAtiva }: HeaderProps) {
    const navigate = useNavigate();
    const email = getEmailFromToken();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <header className="dashboard-header">
            <div className="header-user" onClick={() => navigate("/permissoes")} style={{ cursor: "pointer" }}>
                <div className="header-avatar">👤</div>
                <span className="header-username">{email}</span>
            </div>

            <nav className="header-nav">
                <button onClick={() => navigate("/dashboard")} className={`nav-btn ${paginaAtiva === "inicio" ? "nav-ativo" : ""}`}>
                    Início
                </button>
                <button onClick={() => navigate("/processos")} className={`nav-btn ${paginaAtiva === "processos" ? "nav-ativo" : ""}`}>
                    Processos
                </button>
                <button onClick={() => navigate("/tarefas")} className={`nav-btn ${paginaAtiva === "tarefas" ? "nav-ativo" : ""}`}>
                    Planos de Ação
                </button>
                <button onClick={() => navigate("/auditoria-interna")} className={`nav-btn ${paginaAtiva === "auditoria" ? "nav-ativo" : ""}`}>
                    Auditoria Interna
                </button>
            </nav>

            <div className="header-right">
                <span
                    className="header-bell"
                    onClick={() => navigate("/historico")}
                    style={{ cursor: "pointer" }}
                    title="Histórico"
                >
                    🔔
                </span>
                <div className="header-logo">
                    Management<span>Corp</span>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    Sair
                </button>
            </div>
        </header>
    );
}