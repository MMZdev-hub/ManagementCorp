import { useEffect, useState } from "react";
import { listarUsuarios, toggleAcesso, type Usuario } from "../services/userService";
import Header from "../components/Header";
import "../styles/permissoes.css";

export default function Permissoes() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        listarUsuarios()
            .then(setUsuarios)
            .catch(err => console.error("Erro ao buscar usuários:", err));
    }, []);

    async function handleToggle(id: number) {
        try {
            const atualizado = await toggleAcesso(id);
            setUsuarios(prev =>
                prev.map(u => u.id === id ? { ...u, acesso: atualizado.acesso, permissoes: atualizado.permissoes } : u)
            );
        } catch (err) {
            console.error("Erro ao atualizar acesso:", err);
        }
    }

    const usuariosFiltrados = usuarios.filter(u =>
        u.email.toLowerCase().includes(busca.toLowerCase()) ||
        String(u.id).includes(busca)
    );

    return (
        <div className="permissoes-page">

            <Header />

            <main className="permissoes-content">

                {/* Tabela de Usuários */}
                <div className="permissoes-card">
                    <h2 className="permissoes-title">Controle de Usuários</h2>

                    {/* Busca */}
                    <div className="permissoes-search">
                        <span>🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar por ID ou e-mail..."
                            value={busca}
                            onChange={e => setBusca(e.target.value)}
                        />
                    </div>

                    {usuariosFiltrados.length === 0 ? (
                        <p style={{ color: "#cbd5d8" }}>Nenhum usuário encontrado.</p>
                    ) : (
                        <table className="usuarios-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Usuário</th>
                                    <th>Perfil</th>
                                    <th>Permissões</th>
                                    <th>Acesso</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuariosFiltrados.map(u => (
                                    <tr key={u.id}>
                                        <td>#{u.id}</td>
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

            </main>
        </div>
    );
}