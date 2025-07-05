import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import Input from "../components/input";

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
    <section>
      <aside className="in">
        <h2>Hello, Friend!</h2>
        <p>Register with personal detalis use all of sete fearures</p>

        <Link to="/login">Fazer login</Link>
      </aside>
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
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
