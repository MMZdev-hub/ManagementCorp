import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarHistorico, type Auditoria } from "../services/auditoriaService";
import "../styles/historico.css";

export default function Historico() {
    const navigate = useNavigate();
    const [auditoria, setAuditorias] = useState<Auditoria[]>([]);
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState("Todos");

    useEffect(() => {
       const ordem = filtro === "Por Data" ? "data" : filtro === "Ordem Crescente" ? "crescente" : undefined;
       listarHistorico(ordem).then(setAuditorias).catch(console.error);
    }, [filtro]);

    const auditoriasFiltradas = auditoria
        .filter(a => {
            const matchBusca = a.nome.toLowerCase().includes(busca.toLowerCase()) ||
                                a.responsavel.toLowerCase().includes(busca.toLowerCase());
            return matchBusca;
        })
        .sort((a, b) => {
            if (filtro === "Ordem Crescente") return (a.nome || "").localeCompare(b.nome || "");
            if (filtro === "Por Data") return (a.dataInicio ||  "").localeCompare(b.dataInicio || "");
            return 0;
        });
    function getStatusColor(status: string | undefined) {
        if (status === "Concluída") return "#4caf50";
        if (status === "Em Andamento") return "#f0c030";
        return "#e53935";
    }

    function getStatusWidth(status: string | undefined) {
        if (status === "Concluída") return "100%";
        if (status === "Em Andamento") return "60%";
        return "30%";
    }

    return (
        <div className="historico-page">

             {/* Header */}
             <header className="dashboard-header">
                <div className="header-user">
                    <div className="header-avatar">👤</div>
                    <span className="header-username">Filipe Santos</span>
                </div>
                <nav className="header-nav">
                    <a onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>Início</a>
                    <a onClick={() => navigate("/processos")} style={{ cursor: "pointer" }}>Processos</a>
                    <a href="#">Planos de Ação</a>
                    <a href="#">Auditoria Interna</a>
                </nav>
                <div className="header-right">
                    <span className="header-bell">🔔</span>
                    <div className="header-logo">Management<span>Corp</span></div>
                </div>
            </header>

            <main className="historico-content">
                <div className="historico-card">
                    <h2 className="historico-title">Histórico de Auditoria</h2>

                    {/* Busca */}
                    <div className="historico-search">
                        <span>🔍</span>
                        <input 
                            type="text"
                            placeholder="Pesquisar"
                            value={busca}
                            onChange={e => setBusca(e.target.value)}
                        />
                    </div>

                    {/* Filtros */}
                    <div className="historico-filtro">
                        {["Todos", "Por Data", "Ordem Crescente"].map(f => (
                            <button 
                                key={f}
                                className={`btn-filtro-hist ${filtro === f ? "ativo" : ""}`}
                                onClick={() => setFiltro(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    
                    {/* Lista */}
                    <div className="historico-lista">
                        {auditoriasFiltradas.length === 0 ? (
                            <p style={{ color: "#cbd5d8" }}>Nenhum auditoria encontrada.</p>
                        ) : (
                            auditoriasFiltradas.map(a => (
                                <div key={a.id} className="historico-item">
                                    <div className="historico-item-left">
                                        <span className="historico-nome">{a.nome}</span>
                                        <div className="historico-barra">
                                            <div
                                                className="historico-barra-fill"
                                                style={{
                                                    width: getStatusWidth(a.status),
                                                    background: getStatusColor(a.status)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="historico-item-center">
                                        <span className="historico-responsavel">{a.responsavel}</span>
                                        <span className="historico-data">{a.dataInicio}</span>
                                    </div>
                                    <div className="historico-item-right">
                                        <span className="historico-prazo">{a.prazo}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}