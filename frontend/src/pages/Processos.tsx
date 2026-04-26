import { useEffect, useState } from "react";
import Header from "../components/Header";
import { listarPlanos, criarPlano, type PlanoAcao } from "../services/planoService";
import { listarAuditorias, atualizarStatusAuditoria, deletarAuditoria, type Auditoria } from "../services/auditoriaService";
import { listarAuditoriasInternas, type AuditoriaInterna } from "../services/auditoriaInternaService";
import "../styles/processos.css";

export default function Processos() {
    const [filtro, setFiltro] = useState("Todos");
    const [buscar, setBuscar] = useState("");
    const [planos, setPlanos] = useState<PlanoAcao[]>([]);
    const [auditorias, setAuditorias] = useState<Auditoria[]>([]);
    const [auditoriasInternas, setAuditoriasInternas] = useState<AuditoriaInterna[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [abaAtiva, setAbaAtiva] = useState<"externas" | "internas">("externas");
    const [novoPlano, setNovoPlano] = useState({
        nome: "", responsavel: "", dataCriacao: "", prazo: "", status: "Pendentes"
    });

    useEffect(() => {
        listarPlanos().then(setPlanos).catch(console.error);
        listarAuditorias().then(setAuditorias).catch(console.error);
        listarAuditoriasInternas().then(setAuditoriasInternas).catch(console.error);
    }, []);

    const planosFiltrados = planos.filter(p => {
        const matchFiltro = filtro === "Todos" || p.status === filtro;
        const matchBuscar = p.nome.toLowerCase().includes(buscar.toLowerCase()) ||
                            p.responsavel.toLowerCase().includes(buscar.toLowerCase());
        return matchFiltro && matchBuscar;
    });

    function getStatusClass(status: string) {
        if (status === "Pendentes" || status === "Pendente") return "tag-pendente";
        if (status === "Em Andamento") return "tag-andamento";
        if (status === "Concluída" || status === "Concluído") return "tag-concluido";
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

    async function handleStatusAuditoria(id: number, status: string) {
        try {
            await atualizarStatusAuditoria(id, status);
            const atualizadas = await listarAuditorias();
            setAuditorias(atualizadas);
        } catch (err) {
            console.error("Erro ao atualizar status:", err);
        }
    }

    async function handleDeletarAuditoria(id: number) {
        if (!confirm("Deseja excluir esta auditoria?")) return;
        try {
            await deletarAuditoria(id);
            const atualizadas = await listarAuditorias();
            setAuditorias(atualizadas);
        } catch (err) {
            console.error("Erro ao deletar auditoria:", err);
        }
    }

    return (
        <div className="processos-page">
            <Header paginaAtiva="processos" />

            <main className="processos-content">
                <div className="processos-grid">

                    {/* ESQUERDA — Auditorias */}
                    <div className="modelagem-card">
                        <h2 className="processos-title">Auditorias</h2>

                        {/* Abas */}
                        <div className="abas">
                            <button
                                className={`aba-btn ${abaAtiva === "externas" ? "aba-ativa" : ""}`}
                                onClick={() => setAbaAtiva("externas")}>
                                Externas
                            </button>
                            <button
                                className={`aba-btn ${abaAtiva === "internas" ? "aba-ativa" : ""}`}
                                onClick={() => setAbaAtiva("internas")}>
                                Internas
                            </button>
                        </div>

                        {/* Lista de Auditorias Externas */}
                        {abaAtiva === "externas" && (
                            <div className="auditoria-lista">
                                {auditorias.length === 0 ? (
                                    <p style={{ color: "#cbd5d8" }}>Nenhuma auditoria externa cadastrada.</p>
                                ) : (
                                    auditorias.map(a => (
                                        <div key={a.id} className="auditoria-card-item">
                                            <div className="auditoria-card-info">
                                                <span className="auditoria-card-nome">{a.nome}</span>
                                                <span className="auditoria-card-resp">{a.responsavel}</span>
                                                <span className={`plano-tag ${getStatusClass(a.status || "")}`}>
                                                    {a.status}
                                                </span>
                                            </div>
                                            <div className="auditoria-card-acoes">
                                                <select
                                                    value={a.status || ""}
                                                    onChange={e => handleStatusAuditoria(a.id!, e.target.value)}
                                                    className="select-status"
                                                >
                                                    <option>Pendente</option>
                                                    <option>Em Andamento</option>
                                                    <option>Concluída</option>
                                                </select>
                                                <button
                                                    className="btn-deletar"
                                                    onClick={() => handleDeletarAuditoria(a.id!)}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Lista de Auditorias Internas */}
                        {abaAtiva === "internas" && (
                            <div className="auditoria-lista">
                                {auditoriasInternas.length === 0 ? (
                                    <p style={{ color: "#cbd5d8" }}>Nenhuma auditoria interna cadastrada.</p>
                                ) : (
                                    auditoriasInternas.map(a => (
                                        <div key={a.id} className="auditoria-card-item">
                                            <div className="auditoria-card-info">
                                                <span className="auditoria-card-nome">{a.nome}</span>
                                                <span className="auditoria-card-resp">{a.responsavel}</span>
                                                <span className="auditoria-card-dept">{a.departamento}</span>
                                            </div>
                                            <div className="auditoria-card-acoes">
                                                <span className="auditoria-card-data">{a.data}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {/* DIREITA — Planos de Ação */}
                    <div className="planos-card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2 className="processos-title">Planos de Ação</h2>
                            <button className="btn-salvar-processo" onClick={() => setShowForm(!showForm)}>+</button>
                        </div>

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