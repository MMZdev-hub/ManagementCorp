import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", response.data);

      navigate("/dashboard");

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || "Erro no login");
      } else {
        setError("Erro inesperado");
    }
  }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>

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

      {error && <p className="error">{error}</p>}

      <a href="#" className="forgot">
        Esqueci minha senha
      </a>

      <button type="submit">Entrar</button>
    </form>
  );
}