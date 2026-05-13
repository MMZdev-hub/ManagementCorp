import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import axios from "axios";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [nome, setNome] = useState("");

    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirm") setConfirm(value);
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        if (password !== confirm) {
            setError("As senhas não correspondem");
            return;
        }

        try {
            await api.post("/auth/register", {
                email,
                password,
                nome
            });
            setSuccess("Usuário cadastrado com sucesso");
            setTimeout(() => {navigate("/login");}, 2000);

            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data || "Erro no cadastro");
                } else {
                    setError("Erro inesperado");
                }
            }
        }

        return (
            <form className="login-form" onSubmit={handleSubmit}>

                <label>Nome completo</label>
                <input
                    type="text"
                    name="nome"
                    placeholder="Digite seu nome completo"
                    onChange={e => setNome(e.target.value)}
                />

                <label>E-mail</label>
                <input 
                type="email" 
                name="email" 
                placeholder="Digite seu e-mail" 
                onChange={handleChange} 
                />

                <label>Senha</label>
                <input 
                type="password" 
                name="password" 
                placeholder="Digite sua senha" 
                onChange={handleChange} 
                />

                <label>Confirmar senha</label>
                <input 
                type="password" 
                name="confirm" 
                placeholder="Confirme sua senha" 
                onChange={handleChange} 
                />

                {error && <p className="error">{error}</p>}
                {success && <p style={{ color: "#4caf50", fontSize: "13px" }}>{success}</p>}

                <button type="submit">Cadastrar</button>
                
                <p style={{ textAlign: "center", fontSize: "13px", marginTop: "15px", color: "#cbd5d8" }}>
                    Já tem uma conta?{""}
                    <span
                     onClick={() => navigate("/login")}
                     style={{ color: "#1e3a8a",  cursor: "pointer" }}
                     >
                        Entrar
                     </span>
                </p>
            </form>
        );
    }
  