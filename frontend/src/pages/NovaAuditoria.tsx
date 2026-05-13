import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/nova-auditoria.css";
import { criarAuditoria } from "../services/auditoriaService";

export default function NovaAuditoria() {

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

    async function handleSalvar() {
        try {
            await criarAuditoria({
                nome: form.nome,
                dataInicio: form.dataInicio,
                responsavel: form.responsavel,
                prazo: form.prazo,
                setor: form.setor,
                objetivo: form.objetivo,
                status: "Pendente"
            });
            alert("Auditori Salva com sucesso!");
        } catch (error) {
            alert("Erro ao salvar auditoria!");
            console.error(error);
        }
    }

    return (
        <div className="nova-auditoria-page">

            {/*Hearder*/}
            <Header />

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
                                name="objetivo"
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