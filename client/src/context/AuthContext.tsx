import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false); // <- aqui termina o carregamento
    };
    loadUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data } = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("token", data.token);

    const profile = await api.get("/api/private/profile");
    setUser(profile.data);
    localStorage.setItem("user", JSON.stringify(profile.data));

    navigate("/profile");
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
