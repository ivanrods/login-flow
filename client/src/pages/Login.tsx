import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Input from "../components/input";
import styles from "../styles/section.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
    } catch (err: any) {
      setError("Credenciais inválidas");
    }
  };
  return (
    <section className={styles.section}>
      
      <form onSubmit={handleSubmit} className={styles.up_form}>
        <h1>Sign In</h1>
         <span>use sua conta</span>
        <Input
          type="email"
          label="Email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          label="Senha"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
      <aside className={styles.up}>
        <h2>Bem vindo de volta!</h2>
        <p>Para continuar conectado, faça login com suas informações pessoais</p>

        <Link to="/register">Criar conta</Link>
      </aside>

      {error && <p>{error}</p>}
    </section>
  );
};
