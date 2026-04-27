import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { listarAuditoriasPorResponsavel, type Auditoria } from "../services/auditoriaService";
import { getEmailFromToken } from "../services/authService";
import "../styles/historico.css";

export default function MinhasAuditorias() {
    const navigate = useNavigate();
    const [auditorias, setAuditorias] = useState<Auditoria[]>([]);
    const nomeUsuario = getEmailFromToken();

    useEffect(() => {
        listarAuditoriasPorResponsavel(nomeUsuario)
            .then(setAuditorias)
            .catch(console.error);
    }, [nomeUsuario]);

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
            <Header />

            <main className="historico-content">
                <div className="historico-card">
                    <h2 className="historico-title">Minhas Auditorias</h2>
                    <p style={{ color: "#cbd5d8", textAlign: "center", marginBottom: "16px" }}>
                        Auditorias relacionadas a: <strong style={{ color: "white" }}>{nomeUsuario}</strong>
                    </p>

                    <div className="historico-lista">
                        {auditorias.length === 0 ? (
                            <p style={{ color: "#cbd5d8", textAlign: "center" }}>
                                Nenhuma auditoria encontrada para você.
                            </p>
                        ) : (
                            auditorias.map(a => (
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
                                        <span className="historico-responsavel">{a.setor}</span>
                                        <span className="historico-data">{a.dataInicio}</span>
                                    </div>
                                    <div className="historico-item-right">
                                        <span className="historico-prazo">{a.prazo}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div style={{ marginTop: "24px", textAlign: "center" }}>
                        <button
                            onClick={() => navigate("/dashboard")}
                            style={{
                                background: "#6aadca",
                                color: "white",
                                border: "none",
                                borderRadius: "20px",
                                padding: "10px 24px",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                        >
                            Voltar ao Dashboard
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}