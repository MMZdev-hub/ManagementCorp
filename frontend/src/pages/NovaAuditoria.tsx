import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/nova-auditoria.css";

export default function NovaAuditoria() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nome:"",
        dataInicio: "",
        responsavel: "",
        prazo: "",
        setor: "",
        objetivo: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSalvar() {
        console.log("auditoria salva:", form);
        navigate("/dashboard");
    }

    return (
        <div className="nova-auditoria-page">

            {/*Hearder*/}
            <header className="dashboard-header">
                <div className="header-user">
                    <div className="header-avatar">👤</div>
                    <span className="header-username">Filipe Santos</span>
                </div>

                <nav className="header-nav">
                    <a href="#">Inicio</a>
                    <a href="#">Processos</a>
                    <a href="#">Planos de Ação</a>
                    <a href="#">Auditoria Interna</a>
                </nav>
                <div className="header-right">
                    <span className="header-bell">🔔</span>
                    <div className="header-logo">Management<span>Corp</span></div>
                </div>
            </header>

            {/*Contepudo*/}
            <main className="nova-auditoria-content">
                <div className="nova-auditoria-card">
                    <h2 className="nova-auditoria-title">Nova Auditoria Externa</h2>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nome da Auditoria</label>
                            <input
                                name="nome"
                                placeholder="Digite aqui"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                                <label>Data de Inicio</label>
                                <input 
                                    name="dataInicio"
                                    placeholder="Digite aqui"
                                    type="date"
                                    onChange={handleChange}
                                />
                            </div>

                        <div className="form-group">
                            <label>Responsavel Pela Auditoria</label>
                            <input
                                name="responsavel"
                                placeholder="Digite aqui"
                                onChange={handleChange}
                             />
                        </div>

                        <div className="form-group">
                            <label>Prazo de Conclusão</label>
                            <input
                                name="prazo"
                                placeholder="Digite aqui"
                                type="date"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Setor da Empresa</label>
                            <input
                                name="setor"
                                placeholder="Digite aqui"
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="form-group">
                            <label>Objetivo da Auditoria</label>
                            <input
                                name="Objetivo"
                                placeholder="Digite aqui"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="btn-anexar">Anexar</button>
                        <button className="btn-salvar" onClick={handleSalvar}>Salvar</button>
                        <button className="btn-importar">importar Documento</button>
                    </div>
                </div>
            </main>
        </div>
    );
}