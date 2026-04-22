import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarUsuarios, toggleAcesso, type Usuario } from "../services/userService";
import "../styles/permissoes.css";

interface Atividade {
    id: number;
    nome: string;
    acao: string;
    data: string;
}

const atividadesIniciais: Atividade[] = [
    { id: 1, nome: "Ana Maria", acao: "Editou auditoria nº45632", data: "24 de Apr. 2024" },
    { id: 2, nome: "Marcos Antônio", acao: "Excluiu Auditoria nº22541", data: "10 de Jan. 2024" },
];

export default function Permissoes() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        listarUsuarios()
            .then(setUsuarios)
            .catch(err => console.error("Erro ao buscar usuários:", err));
    }, []);

   async function handleToggle(id: number) {
        try {
            const autalizado = await toggleAcesso(id);
            setUsuarios(prev =>
                prev.map(U => U.id === id ? { ...U, acesso: autalizado.acesso, permissoes: autalizado.permissoes } : U)
            );
        } catch (err) {
            console.error("Erro ao atualizar acesso:", err);
        }
        
    }

    return (
        <div className="permissoes-page">

              {/* Header */}
              <header className="dashboard-header">
                <div className="header-user">
                    <div className="header-avatar">👤</div>
                    <span className="header-username">Caíque Lima</span>
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

            {/* conteúdo */}
            <main className="permissoes-content">

                {/* Tabela de Usuários */}
                <div className="permissoes-card">
                    <h2 className="permissoes-title">Controle de Usuários</h2>

                    {usuarios.length === 0 ? (
                        <p style={{ color: "#cbd5d8" }}>Nenhum usuário cadastrado ainda.</p>
                    ) : (
                    <table  className="usuarios-table">
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>Perfil</th>
                                <th>Permissões</th>
                                <th>Acesso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(u => (
                                <tr key={u.id}>
                                    <td>{u.email}</td>
                                    <td>{u.perfil || "—"}</td>
                                    <td>{u.permissoes || "ON"}</td>
                                    <td>
                                        <div 
                                            className={`toggle ${u.acesso ? "on" : "off"}`}
                                            onClick={() => handleToggle(u.id)}
                                        >
                                            <div className="toggle-ball" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                </div>

                {/* Registro de Atividades */}
                <div className="permissoes-card">
                    <h3 className="permissoes-subtitle">Registro de Atividade</h3>

                    <div className="atividade-lista">
                        {atividadesIniciais.map(a => (
                            <div key={a.id} className="atividade-item">
                                <div className="atividade-avatar">👤</div>
                                <div className="atividade-info">
                                    <span className="atividade-nome">{a.nome}</span>
                                    <span className="atividade-data">{a.data}</span>
                                </div>
                                <div className="atividade-acao">{a.acao}</div>
                                <div className="atividade-data-right">{a.data}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}