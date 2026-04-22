import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/processos.css";

const planosIniciais = [
    {id:1, nome: "Plano de Ação 1", responsavel: "André Luis", dataCriacao:"15/04/2024", prazo: "15/06/2024", status: "Pendentes"},
    {id:1, nome: "Plano de Ação 2", responsavel: "Caíque Lima", dataCriacao: "10/06/2024", prazo: "10/06/2024", status: "Em Andamento"},
    {id:1, nome: "Plano de Ação 3", responsavel: "Ivã Araujo", dataCriacao: "05/05/2024", prazo: "05/06/2024", status: "Concluído"},
];

export default function Processos() {
    const navigate = useNavigate();
    const [filtro, setFiltro] = useState("Todos");
    const [buscar, setBusca] = useState("");

    const planosFiltrados = planosIniciais.filter(p => {
        const matchFiltro = filtro === "Todos" || p.status === filtro;
        const matchBuscar = p.nome.toLocaleLowerCase().includes(buscar.toLowerCase()) ||
                            p.responsavel.toLocaleLowerCase().includes(buscar.toLowerCase());
        return matchFiltro && matchBuscar;
    });

    function getStatusClass(status: string) {
        if (status === "Pendentes") return "tag-pendente";
        if (status === "Em Andamento") return "tag-andamento";
        if (status === "Concluído") return "tag-concluido";
        return "";
    }

    return (
        <div className="processos-page">

            {/*Header*/}
            <header className="dashboard-header">
            <div className="header-user">
                    <div className="header-avatar">👤</div>
                    <span className="header-username">Filipe Santos</span>
                </div>
                <nav className="header-nav">
                    <a href="#" onClick={() => navigate("/dashboard")}>Início</a>
                    <a href="#">Processos</a>
                    <a href="#">Planos de Ação</a>
                    <a href="#">Auditoria Interna</a>
                </nav>
                <div className="header-right">
                    <span className="header-bell">🔔</span>
                    <div className="header-logo">Management<span>Corp</span></div>
                </div>
            </header>

            {/*Conteúdo*/}
            <main className="processos-content">
                <div className="processos-grid">

                    {/* Esquerda - Modelagem*/}
                    <div className="modelagem-card">
                        <h2 className="processos-title">Modelagem de Processos</h2>

                        <button className="btn-novo-processo">Novo Processo</button>

                        <div className="fluxo-area">
                            {/* Fluxograma */}
                            <div className="fluxo-diagram">
                                <div className="fluxo-node inicio">Início</div>
                                <div className="fluxo-arrow">↓</div>
                                <div className="fluxo-node tarefa">Tarefa A</div>
                                <div className="fluxo-arrow">↓</div>
                                <div className="fluxo-node decisao">Decisão</div>
                                <div className="fluxo-arrow">↓ Sim</div>
                                <div className="fluxo-node tarefa">Tarefa B</div>
                                <div className="fluxo-arrow">↓</div>
                                <div className="fluxo-node saida">Saída</div>
                            </div>

                            {/* Sugestões */}
                            <div className="sugestoes-area">
                                <h4>Sugestões de Otimização</h4>
                                <div className="alerta-gargalo">
                                    <span className="alerta-icon">⚠️</span>
                                    <span className="alerta-texto">Possível Gargalo</span>
                                    <p>Identificado entre Tarefa A e Decisão</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Direita - Planos de Ação */}
                    <div className="planos-card">
                        <h2 className="processo-title">Planos de Ação</h2>

                        <div className="planos-search">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Pesquisar"
                                value={buscar}
                                onChange={e => setBusca(e.target.value)}
                            />
                        </div>

                        <div className="planos-filtros">
                            {["Todos", "Pendentes", "Em Andamento"].map(f => (
                                <button
                                    key={f}
                                    className={`btn-filtro ${filtro === f ? "ativo" : ""}`}
                                    onClick={() => setFiltro(f)}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        <div className="planos-lista">
                            {planosFiltrados.map(plano => (
                                <div key={plano.id} className="plano-item">
                                    <div className="plano-info">
                                        <span className="plano-nome">{plano.nome}</span>
                                        <span className={`plano-tag ${getStatusClass(plano.status)}`}>
                                            {plano.status}
                                        </span>
                                        <span className="plano-data">{plano.dataCriacao}</span>
                                    </div>
                                    <div className="plano-right">
                                        <span className="plano-responsavel">{plano.responsavel}</span>
                                        <span className="plano-prazo">{plano.prazo}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}