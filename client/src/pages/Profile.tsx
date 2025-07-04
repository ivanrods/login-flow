import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { api } from "../services/api";
import "../styles/profile.css";

export const Profile = () => {
  const { user, signOut, setUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");

      const payload: any = { name, email };

      const res = await api.put(`/users/${user?._id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
      setMessage("Perfil atualizado com sucesso!");
    } catch (err: any) {
      setError("Erro ao atualizar perfil.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir sua conta?")) return;
    try {
      await api.delete(`/users/${user?._id}`);
      alert("Conta excluída com sucesso.");
      signOut();
    } catch (err: any) {
      setError("Erro ao excluir conta.");
    }
  };

  if (!user) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Perfil</h1>

      <img
        src={avatar || "https://via.placeholder.com/100"}
        alt="Avatar"
        width={100}
        height={100}
        style={{ borderRadius: "50%", marginBottom: 16 }}
      />
      <br />
      <input
        type="text"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={handleUpdate}>Salvar alterações</button>

      <button onClick={handleDelete}>Excluir conta</button>
      <button onClick={signOut}>Sair</button>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};
