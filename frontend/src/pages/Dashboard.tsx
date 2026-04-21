import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListaAuditorias, type Auditoria } from "../services/auditoriaService";
import "../styles/dashboard.css";
import {
    PieChart, Pie, Cell, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, 
} from "recharts";

const pieData = [
    { name: "Concluídas", value: 60 },
    { name: "Pendentes", value: 30 },
    { name: "Em Andamento", value: 20 },
];

const PIE_COLORS = ["#4caf50", "#e53935", "#f0c030"];

const barData = [
    { area: "Produção",   concluidas: 5, andamento: 1, pendentes: 1 },
    { area: "Logísticas", concluidas: 2, andamento: 1, pendentes: 1 },
    { area: "Tecnologia", concluidas: 1, andamento: 1, pendentes: 3 },
    { area: "RH",         concluidas: 4, andamento: 1, pendentes: 2 },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const email = localStorage.getItem("token") ? "Filipe Santos" : "Usuário";
    const [auditorias, setAuditorias] = useState<Auditoria[]>([]);

    useEffect(() => {
        ListaAuditorias()
            .then(data => {
                console.log("Auditorias Recevidas:", data);
                setAuditorias(data);
            })
            .catch(err => console.error("Erro ao buscar auditorias:", err));
    }, []);

    const concluidas = auditorias.filter(a => a.status === "Concluída").length;
    const emAndamento= auditorias.filter(a => a.status === "Em Andamento").length;
    const pendentes = auditorias.filter(a => a.status === "Pendente").length;

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className="dashboard-page">

            {/* Header */}
            <header className="dashboard-header">
                <div className="header-user">
                    <div className="header-avatar">👤</div>
                    <span className="header-username">{email}</span>
                </div>

                <nav className="header-nav">
                    <a href="#">Início</a>
                    <a href="#">Processos</a>
                    <a href="#">Planos de Ação</a>
                    <a href="#">Auditoria Interna</a>
                </nav>

                <div className="header-right">
                    <span className="header-bell">🔔</span>
                    <div className="header-logo">
                        Management<span>Corp</span>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </header>

            {/* Conteúdo */}
            <main className="dashboard-content">
                <div className="dashboard-title">
                    <span>Gestão de Auditorias</span>
                    <button className="btn-add" onClick={() => navigate("/auditoria/nova")}>+</button>
                </div>

                <div className="dashboard-panel">

                    {/* Cards */}
                    <div className="cards-column">
                        <div className="status-card green">
                            <h3>Concluídas</h3>
                            <p>{concluidas}</p>
                        </div>
                        <div className="status-card yellow">
                            <h3>Em Andamento</h3>
                            <p>{emAndamento}</p>
                        </div>
                        <div className="status-card red">
                            <h3>Pendentes</h3>
                            <p>{pendentes}</p>
                        </div>
                    </div>

                    {/* Gráficos */}
                    <div className="charts-area">
                        <h3>STATUS</h3>
                        <div className="charts-row">

                            {/* PIE */}
                            <PieChart width={250} height={300}>
                                <Pie
                                    data={pieData}
                                    cx={125}
                                    cy={130}
                                    outerRadius={80}
                                    dataKey="value"
                                    label={({ value, x, y }) => (
                                        <text
                                        x={x}
                                        y={y}
                                        fill="white"
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fontSize={13}
                                        fontWeight="bold"
                                        stroke="#333"
                                        strokeWidth={3}
                                        paintOrder="stroke"
                                    >
                                        {`${value}%`}
                                    </text>
                                    )}
                                    labelLine={false}
                                    isAnimationActive={false}
                                >
                                    {pieData.map((_, i) => (
                                        <Cell key={`cell-${i}`} fill={PIE_COLORS[i]} stroke="white" strokeWidth={1} />
                                    ))}
                                </Pie>
                                <Tooltip/>
                            </PieChart>
                            

                            {/* BAR */}
                            <div style={{ flex: 1}}>
                                <p style={{ color: "white", fontSize: "13px", marginBottom: "8px" }}>Áreas</p>
                                <BarChart width={500} height={200} data={barData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                                        <XAxis dataKey="area" tick={{ fill: "white", fontSize: 11 }} />
                                        <YAxis tick={{ fill: "white", fontSize: 11 }} />
                                        <Tooltip />
                                        <Bar dataKey="concluidas" fill="#4caf50" />
                                        <Bar dataKey="andamento"  fill="#f0c030" />
                                        <Bar dataKey="pendentes"  fill="#e53935" />
                                    </BarChart>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}