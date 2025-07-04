import { useAuth } from "../context/AuthContext";

export const Profile = () => {
  const { user, signOut } = useAuth();
  if (!user) return <p>Carregando...</p>;
  return (
    <div>
      <h1>Perfil</h1>
      <img src={user.avatar} alt="Avatar" width={100} />
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={signOut}>Sair</button>
    </div>
  );
};
