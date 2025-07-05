import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Input from "../components/input";

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
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
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
      <aside className="up">
        <h2>Welcome Back!</h2>
        <p>To keep connected with us please login with your personal info</p>

        <Link to="/register">Registrar</Link>
      </aside>

      {error && <p>{error}</p>}
    </section>
  );
};
