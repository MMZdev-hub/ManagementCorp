import { useEffect, useState } from "react";
import Header from "../components/Header";
import { listarAuditorias, atualizarStatusAuditoria, deletarAuditoria, type Auditoria } from "../services/auditoriaService";
import { listarAuditoriasInternas, type AuditoriaInterna } from "../services/auditoriaInternaService";
import "../styles/processos.css";

export default function Processos() {
    const [auditorias, setAuditorias] = useState<Auditoria[]>([]);
    const [auditoriasInternas, setAuditoriasInternas] = useState<AuditoriaInterna[]>([]);
    const [abaAtiva, setAbaAtiva] = useState<"externas" | "internas">("externas");
    const [buscar, setBuscar] = useState("");

    useEffect(() => {
        listarAuditorias().then(setAuditorias).catch(console.error);
        listarAuditoriasInternas().then(setAuditoriasInternas).catch(console.error);
    }, []);

    function getStatusClass(status: string) {
        if (status === "Pendente" || status === "Pendentes") return "tag-pendente";
        if (status === "Em Andamento") return "tag-andamento";
        if (status === "Concluída" || status === "Concluído") return "tag-concluido";
        return "";
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

    const auditoriasFiltradas = auditorias.filter(a =>
        a.nome.toLowerCase().includes(buscar.toLowerCase()) ||
        (a.responsavel || "").toLowerCase().includes(buscar.toLowerCase())
    );

    const internFiltradas = auditoriasInternas.filter(a =>
        a.nome.toLowerCase().includes(buscar.toLowerCase()) ||
        (a.responsavel || "").toLowerCase().includes(buscar.toLowerCase())
    );

    return (
        <div className="processos-page">
            <Header paginaAtiva="processos" />

            <main className="processos-content">
                <div className="auditoria-full-card">
                    <h2 className="processos-title">Auditorias</h2>

                    {/* Busca */}
                    <div className="planos-search" style={{ marginBottom: "16px" }}>
                        <span className="search-icon">🔍</span>
                        <input type="text" placeholder="Pesquisar"
                            value={buscar} onChange={e => setBuscar(e.target.value)} />
                    </div>

                    {/* Abas */}
                    <div className="abas">
                        <button className={`aba-btn ${abaAtiva === "externas" ? "aba-ativa" : ""}`}
                            onClick={() => setAbaAtiva("externas")}>
                            Externas
                        </button>
                        <button className={`aba-btn ${abaAtiva === "internas" ? "aba-ativa" : ""}`}
                            onClick={() => setAbaAtiva("internas")}>
                            Internas
                        </button>
                    </div>

                    {/* Auditorias Externas */}
                    {abaAtiva === "externas" && (
                        <div className="auditoria-lista">
                            {auditoriasFiltradas.length === 0 ? (
                                <p style={{ color: "#cbd5d8" }}>Nenhuma auditoria externa cadastrada.</p>
                            ) : (
                                auditoriasFiltradas.map(a => (
                                    <div key={a.id} className="auditoria-card-item">
                                        <div className="auditoria-card-info">
                                            <span className="auditoria-card-nome">{a.nome}</span>
                                            <span className="auditoria-card-resp">{a.responsavel}</span>
                                            <span className={`plano-tag ${getStatusClass(a.status || "")}`}>
                                                {a.status}
                                            </span>
                                        </div>
                                        <div className="auditoria-card-acoes">
                                            <select value={a.status || ""}
                                                onChange={e => handleStatusAuditoria(a.id!, e.target.value)}
                                                className="select-status">
                                                <option>Pendente</option>
                                                <option>Em Andamento</option>
                                                <option>Concluída</option>
                                            </select>
                                            <button className="btn-deletar"
                                                onClick={() => handleDeletarAuditoria(a.id!)}>
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Auditorias Internas */}
                    {abaAtiva === "internas" && (
                        <div className="auditoria-lista">
                            {internFiltradas.length === 0 ? (
                                <p style={{ color: "#cbd5d8" }}>Nenhuma auditoria interna cadastrada.</p>
                            ) : (
                                internFiltradas.map(a => (
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
            </main>
        </div>
    );
}