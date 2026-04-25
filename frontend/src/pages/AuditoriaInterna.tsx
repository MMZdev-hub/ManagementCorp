import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarAuditoriasInternas, criarAuditoriaInterna, type AuditoriaInterna } from "../services/auditoriaInternaService";
import { listarRelatorios, buscarStats, type DadosGargalo, type Stats } from "../services/relatorioService";
import "../styles/auditoria-interna.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AuditoriaInternaPage() {
    const navigate = useNavigate();
    const [auditorias, setAuditorias] = useState<AuditoriaInterna[]>([]);
    const [form, setForm] = useState({ nome: "", departamento: "", responsavel: "", data: "" });
    const [sucesso, setSucesso] = useState("");
    const [dadosGargalo, setDadosGargalo] = useState<DadosGargalo[]>([]);
    const [stats, setStats] = useState<Stats>({ tempoMedio: 0, taxaRetrabalho: 0, gargalos:0 });

    useEffect(() => {
        listarAuditoriasInternas().then(setAuditorias).catch(console.error);
        listarRelatorios().then(setDadosGargalo).catch(console.error);
        buscarStats().then(setStats).catch(console.error);
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSalvar() {
        try {
            await criarAuditoriaInterna(form);
            setSucesso("Auditoria cadastrada com sucesso!");
            setForm({ nome: "", departamento: "", responsavel: "", data: "" });
            const atualizadas = await listarAuditoriasInternas();
            setAuditorias(atualizadas);
            setTimeout(() => setSucesso(""), 3000);
        } catch (err) {
            console.error("Erro ao salvar:", err);
        }
    }

    return (
        <div className="auditoria-interna-page">

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

            <main className="auditoria-interna-content">

                {/* Formulário */}
                <div className="auditoria-interna-card">
                    <h2 className="auditoria-interna-title">Cadastrar Auditoria Interna</h2>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nome da Auditoria</label>
                            <input name="nome" placeholder="Digite aqui" value={form.nome} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Departamento</label>
                            <input name="departamento" placeholder="Digite aqui" value={form.departamento} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Responsável</label>
                            <input name="responsavel" placeholder="Digite aqui" value={form.responsavel} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Data</label>
                            <input name="data" type="date" value={form.data} onChange={handleChange} />
                        </div>
                    </div>

                    {sucesso && <p className="sucesso-msg">{sucesso}</p>}

                    <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                        <button className="btn-salvar-auditoria" onClick={handleSalvar}>
                            Anexar Evidências
                        </button>
                    </div>
                </div>

                {/* Cards informativos */}
                <div className="info-grid">

                    {/* Gargalos */}
                    <div className="info-card dark">
                        <h3>Identificação de Gargalos e Ineficiência</h3>
                        <ResponsiveContainer width="100%" height={120}>
                            <LineChart data={dadosGargalo}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="mes" tick={{ fill: "white", fontSize: 10 }} />
                                <YAxis tick={{ fill: "white", fontSize: 10 }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="tempoExecucao" stroke="#f0c030" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="taxaRetrabalho" stroke="#4caf50" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="gargalo-stats">
                            <div className="stat">
                                <span className="stat-valor">{stats.tempoMedio}</span>
                                <span className="stat-label">Tempo Médio de Execução</span>
                            </div>
                            <div className="stat">
                                <span className="stat-valor laranja">{stats.taxaRetrabalho}</span>
                                <span className="stat-label">Taxa de Retrabalho</span>
                            </div>
                            <div className="stat">
                                <span className="stat-valor">{stats.gargalos}</span>
                                <span className="stat-label">Gargalos Detectados</span>
                            </div>
                        </div>
                    </div>

                    {/* Fluxo */}
                    <div className="info-card dark">
                        <h3>Modelagem de fluxos de processos Empresariais</h3>
                        <div className="fluxo-mini">
                            <div className="fluxo-mini-node tarefa">Tarefa</div>
                            <div className="fluxo-mini-arrow">→</div>
                            <div className="fluxo-mini-node decisao">◆</div>
                            <div className="fluxo-mini-arrow">→</div>
                            <div className="fluxo-mini-node decisao laranja">◆</div>
                            <div className="fluxo-mini-arrow">→</div>
                            <div className="fluxo-mini-node decisao">Decisão</div>
                        </div>
                        <div className="fluxo-mini-bottom">
                            <div className="fluxo-mini-node circulo">●</div>
                            <div className="fluxo-mini-arrow">→</div>
                            <div className="fluxo-mini-node termino laranja">Término</div>
                        </div>
                    </div>

                    {/* Relatórios */}
                    <div className="info-card dark">
                        <h3>Geração de Relatórios e Dashboard Personalizado</h3>
                        <div className="relatorio-graficos">
                            <div className="bar-mini">
                                {dadosGargalo.length > 0
                                    ? dadosGargalo.map((d, i) => (
                                        <div key={i} className="bar-mini-col"
                                            style={{height: `${d.tempoExecução * 2}px` }} />
                                    ))
                                    : [4, 7, 5, 8, 6].map((h, i) => (
                                        <div key={i} className="bar-mini-col"
                                         style={{ height: `${h * 10}px` }} />
                                    ))
                                }
                            </div>
                            <div className="pizza-mini">🍩</div>
                        </div>
                        <button className="btn-anexar-relatorio">Anexar Evidências</button>
                    </div>

                </div>

                {/* Lista de auditorias cadastradas */}
                {auditorias.length > 0 && (
                    <div className="auditoria-interna-card" style={{ marginTop: "24px" }}>
                        <h3 style={{ color: "white", marginBottom: "16px" }}>Auditorias Cadastradas</h3>
                        {auditorias.map(a => (
                            <div key={a.id} className="auditoria-item">
                                <span>{a.nome}</span>
                                <span>{a.departamento}</span>
                                <span>{a.responsavel}</span>
                                <span>{a.data}</span>
                            </div>
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
}