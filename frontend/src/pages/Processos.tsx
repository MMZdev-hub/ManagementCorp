import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarPlanos, criarPlano, type PlanoAcao } from "../services/planoService";
import "../styles/processos.css";

export default function Processos() {
    const navigate = useNavigate();
    const [filtro, setFiltro] = useState("Todos");
    const [buscar, setBuscar] = useState("");
    const [planos, setPlanos] = useState<PlanoAcao[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [novoPlano, setNovoPlano] = useState({
        nome: "", responsavel: "", dataCriacao: "", prazo: "", status: "Pendentes"
    });

    useEffect(() => {
        listarPlanos().then(setPlanos).catch(console.error);
    }, []);

    const planosFiltrados = planos.filter(p => {
        const matchFiltro = filtro === "Todos" || p.status === filtro;
        const matchBuscar = p.nome.toLowerCase().includes(buscar.toLowerCase()) ||
                            p.responsavel.toLowerCase().includes(buscar.toLowerCase());
        return matchFiltro && matchBuscar;
    });

    function getStatusClass(status: string) {
        if (status === "Pendentes") return "tag-pendente";
        if (status === "Em Andamento") return "tag-andamento";
        if (status === "Concluído") return "tag-concluido";
        return "";
    }

    async function handleSalvarPlano() {
        try {
            await criarPlano(novoPlano);
            const atualizados = await listarPlanos();
            setPlanos(atualizados);
            setShowForm(false);
            setNovoPlano({ nome: "", responsavel: "", dataCriacao: "", prazo: "", status: "Pendentes" });
        } catch (err) {
            console.error("Erro ao criar plano:", err);
        }
    }

    return (
        <div className="processos-page">

            {/* Header */}
            <header className="dashboard-header">
                <div className="header-user">
                    <div className="header-avatar">👤</div>
                    <span className="header-username">Filipe Santos</span>
                </div>
                <nav className="header-nav">
                    <a onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>Início</a>
                    <a href="#">Processos</a>
                    <a href="#">Planos de Ação</a>
                    <a href="#">Auditoria Interna</a>
                </nav>
                <div className="header-right">
                    <span className="header-bell">🔔</span>
                    <div className="header-logo">Management<span>Corp</span></div>
                </div>
            </header>

            <main className="processos-content">
                <div className="processos-grid">

                    {/* ESQUERDA — Modelagem */}
                    <div className="modelagem-card">
                        <h2 className="processos-title">Modelagem de Processos</h2>
                        <button className="btn-novo-processo">Novo Processo</button>

                        <div className="fluxo-area">
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

                            <div className="sugestoes-area">
                                <h4>Sugestões de Otimização</h4>
                                <div className="alerta-gargalo">
                                    <span className="alerta-icon">⚠️</span>
                                    <span className="alerta-texto">Possível Gargalo</span>
                                    <p>Identificado entre Tarefa A e Decisão</p>
                                </div>
                            </div>
                        </div>

                        <div className="modelagem-actions">
                            <button className="btn-anexar-processo">Anexar Processo</button>
                            <button className="btn-salvar-processo">Salvar</button>
                        </div>
                    </div>

                    {/* DIREITA — Planos de Ação */}
                    <div className="planos-card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2 className="processos-title">Planos de Ação</h2>
                            <button className="btn-salvar-processo" onClick={() => setShowForm(!showForm)}>+</button>
                        </div>

                        {/* Formulário novo plano */}
                        {showForm && (
                            <div className="novo-plano-form">
                                <input placeholder="Nome do plano" value={novoPlano.nome}
                                    onChange={e => setNovoPlano({ ...novoPlano, nome: e.target.value })} />
                                <input placeholder="Responsável" value={novoPlano.responsavel}
                                    onChange={e => setNovoPlano({ ...novoPlano, responsavel: e.target.value })} />
                                <input type="date" value={novoPlano.dataCriacao}
                                    onChange={e => setNovoPlano({ ...novoPlano, dataCriacao: e.target.value })} />
                                <input type="date" placeholder="Prazo" value={novoPlano.prazo}
                                    onChange={e => setNovoPlano({ ...novoPlano, prazo: e.target.value })} />
                                <select value={novoPlano.status}
                                    onChange={e => setNovoPlano({ ...novoPlano, status: e.target.value })}>
                                    <option>Pendentes</option>
                                    <option>Em Andamento</option>
                                    <option>Concluído</option>
                                </select>
                                <button className="btn-salvar-processo" onClick={handleSalvarPlano}>Salvar</button>
                            </div>
                        )}

                        <div className="planos-search">
                            <span className="search-icon">🔍</span>
                            <input type="text" placeholder="Pesquisar" value={buscar}
                                onChange={e => setBuscar(e.target.value)} />
                        </div>

                        <div className="planos-filtros">
                            {["Todos", "Pendentes", "Em Andamento"].map(f => (
                                <button key={f}
                                    className={`btn-filtro ${filtro === f ? "ativo" : ""}`}
                                    onClick={() => setFiltro(f)}>
                                    {f}
                                </button>
                            ))}
                        </div>

                        <div className="planos-lista">
                            {planos.length === 0 ? (
                                <p style={{ color: "#cbd5d8" }}>Nenhum plano cadastrado ainda.</p>
                            ) : (
                                planosFiltrados.map(plano => (
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
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}