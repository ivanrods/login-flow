import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import Input from "../components/input";
import styles from "../styles/section.module.css";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/signup", { name, email, password });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro no cadastro.");
    }
  };

  return (
    <section className={styles.section}>
      <aside className={styles.in}>
        <h2>Olá amigo!</h2>
        <p>Cadastre-se com dados pessoais para conectar</p>

        <Link to="/login">Fazer login</Link>
      </aside>
      <form onSubmit={handleSubmit} className={styles.in_form}>
        <h1>Create Account</h1>
          <span>insira seus dados para registro</span>
        <Input
          type="text"
          label="Nome"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          label="Email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          label="Senaha"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>

      {error && <p>{error}</p>}
    </section>
  );
};
