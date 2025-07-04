import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await api.get("/api/profile");
          setUser(data);
        } catch {
          signOut();
        }
      }
    };
    loadUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    const profile = await api.get("/private/profile");
    setUser(profile.data);
    navigate("/profile");
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
