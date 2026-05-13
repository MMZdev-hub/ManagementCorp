import { useEffect, useState } from "react";
import Header from "../components/Header";
import { listarTarefas, criarTarefa, atualizarStatusTarefa, deletarTarefa, type Tarefa } from "../services/tarefaService";
import "../styles/tarefas.css";

export default function Tarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [chatMsg, setChatMsg] = useState("");
    const [chatHistorico, setChatHistorico] = useState<string[]>([]);
    const [novoTarefa, setNovoTarefa] = useState({
        titulo: "", responsavel: "", data: "", status: "Pendente", prioridade: "Normal"
    });

    useEffect(() => {
        listarTarefas().then(setTarefas).catch(console.error);
    }, []);

    const pendentes = tarefas.filter(t => t.status === "Pendente");
    const emAndamento = tarefas.filter(t => t.status === "Em Andamento");
    const concluidas = tarefas.filter(t => t.status === "Concluído");

    const total = tarefas.length || 1;
    const pctConcluido = Math.round((concluidas.length / total) * 100);
    const pctPendente = Math.round((pendentes.length / total) * 100);

    async function handleCriar() {
        try {
            await criarTarefa(novoTarefa);
            const atualizadas = await listarTarefas();
            setTarefas(atualizadas);
            setShowForm(false);
            setNovoTarefa({ titulo: "", responsavel: "", data: "", status: "Pendente", prioridade: "Normal" });
        } catch (err) {
            console.error("Erro ao criar tarefa:", err);
        }
    }

    async function handleStatus(id: number, status: string) {
        try {
            await atualizarStatusTarefa(id, status);
            const atualizadas = await listarTarefas();
            setTarefas(atualizadas);
        } catch (err) {
            console.error("Erro ao atualizar status:", err);
        }
    }

    async function handleDeletar(id: number) {
        try {
            await deletarTarefa(id);
            const atualizadas = await listarTarefas();
            setTarefas(atualizadas);
        } catch (err) {
            console.error("Erro ao deletar tarefa:", err);
        }
    }

    function handleChat() {
        if (!chatMsg.trim()) return;
        setChatHistorico(prev => [...prev, `Você: ${chatMsg}`]);
        setChatHistorico(prev => [...prev, `Bot: Analisando "${chatMsg}"...`]);
        setChatMsg("");
    }

    function TarefaCard({ tarefa }: { tarefa: Tarefa }) {
        return (
            <div className="tarefa-card">
                <div className="tarefa-card-header">
                    <span className="tarefa-titulo">{tarefa.titulo}</span>
                </div>
                <div className="tarefa-responsavel">👤 {tarefa.responsavel}</div>
                <div className="tarefa-data">{tarefa.data}</div>
                <div className="tarefa-acoes">
                    {tarefa.status !== "Concluído" && (
                        <button className="btn-acao verde"
                            onClick={() => handleStatus(tarefa.id!, tarefa.status === "Pendente" ? "Em Andamento" : "Concluído")}>
                            ✓
                        </button>
                    )}
                    <button className="btn-acao vermelho" onClick={() => handleDeletar(tarefa.id!)}>✕</button>
                </div>
            </div>
        );
    }

    return (
        <div className="tarefas-page">

            {/* Header */}
            <Header paginaAtiva="tarefas" />

            <main className="tarefas-content">

                {/* Filtros e botão */}
                <div className="tarefas-toolbar">
                    <button className="btn-filtro-tarefa">Status</button>
                    <button className="btn-filtro-tarefa">Prioridade</button>
                    <button className="btn-filtro-tarefa">Responsável</button>
                    <button className="btn-adicionar-tarefa" onClick={() => setShowForm(!showForm)}>
                        Adicionar Tarefa
                    </button>
                </div>

                {/* Formulário */}
                {showForm && (
                    <div className="tarefa-form">
                        <input placeholder="Título" value={novoTarefa.titulo}
                            onChange={e => setNovoTarefa({ ...novoTarefa, titulo: e.target.value })} />
                        <input placeholder="Responsável" value={novoTarefa.responsavel}
                            onChange={e => setNovoTarefa({ ...novoTarefa, responsavel: e.target.value })} />
                        <input type="date" value={novoTarefa.data}
                            onChange={e => setNovoTarefa({ ...novoTarefa, data: e.target.value })} />
                        <select value={novoTarefa.status}
                            onChange={e => setNovoTarefa({ ...novoTarefa, status: e.target.value })}>
                            <option>Pendente</option>
                            <option>Em Andamento</option>
                            <option>Concluído</option>
                        </select>
                        <select value={novoTarefa.prioridade}
                            onChange={e => setNovoTarefa({ ...novoTarefa, prioridade: e.target.value })}>
                            <option>Normal</option>
                            <option>Alta</option>
                            <option>Baixa</option>
                        </select>
                        <button className="btn-adicionar-tarefa" onClick={handleCriar}>Salvar</button>
                    </div>
                )}

                {/* Kanban + Progresso + Chatbot */}
                <div className="tarefas-grid">

                    {/* Kanban */}
                    <div className="kanban">
                        <div className="kanban-col">
                            <h3 className="kanban-titulo">Pendentes</h3>
                            {pendentes.length === 0
                                ? <p className="kanban-vazio">Nenhuma tarefa</p>
                                : pendentes.map(t => <TarefaCard key={t.id} tarefa={t} />)}
                        </div>
                        <div className="kanban-col">
                            <h3 className="kanban-titulo">Em Andamento</h3>
                            {emAndamento.length === 0
                                ? <p className="kanban-vazio">Nenhuma tarefa</p>
                                : emAndamento.map(t => <TarefaCard key={t.id} tarefa={t} />)}
                        </div>
                        <div className="kanban-col">
                            <h3 className="kanban-titulo">Concluído</h3>
                            {concluidas.length === 0
                                ? <p className="kanban-vazio">Nenhuma tarefa</p>
                                : concluidas.map(t => <TarefaCard key={t.id} tarefa={t} />)}
                        </div>
                    </div>

                    {/* Progresso + Chatbot */}
                    <div className="tarefas-side">

                        {/* Progresso */}
                        <div className="progresso-card">
                            <div className="progresso-item">
                                <span className="progresso-label">Concluído</span>
                                <div className="progresso-barra">
                                    <div className="progresso-fill azul" style={{ width: `${pctConcluido}%` }} />
                                </div>
                                <span className="progresso-pct">{pctConcluido}%</span>
                            </div>
                            <div className="progresso-item">
                                <span className="progresso-label">Pendentes</span>
                                <div className="progresso-barra">
                                    <div className="progresso-fill roxo" style={{ width: `${pctPendente}%` }} />
                                </div>
                                <span className="progresso-pct">{pctPendente}%</span>
                            </div>
                            <button className="btn-exportar">Exportar Relatório</button>
                        </div>

                        {/* Chatbot */}
                        <div className="chatbot-card">
                            <h3 className="chatbot-titulo">Chatbot</h3>
                            <div className="chatbot-msgs">
                                {chatHistorico.map((msg, i) => (
                                    <div key={i} className={`chatbot-msg ${msg.startsWith("Bot") ? "bot" : "user"}`}>
                                        {msg}
                                    </div>
                                ))}
                            </div>
                            <div className="chatbot-input">
                                <input
                                    placeholder="Pesquisar..."
                                    value={chatMsg}
                                    onChange={e => setChatMsg(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleChat()}
                                />
                                <button onClick={handleChat}>➤</button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}