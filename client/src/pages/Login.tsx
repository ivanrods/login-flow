import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Input from "../components/input";
import styles from "../styles/section.module.css";

const schema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Senha obrigatória"),
});

export const Login = () => {
  const [error, setError] = useState("");
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: { email: string; password: string }) => {
    setError("");
    try {
      await signIn(data.email, data.password);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao atualizar perfil.");
      }
    }
  };
  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.up_form}>
        <h1>Sign In</h1>
        <span>use sua conta</span>
        <Input
          type="email"
          label="Email"
          placeholder="E-mail"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <Input
          type="password"
          label="Senha"
          placeholder="Senha"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Entrar</button>
      </form>
      <aside className={styles.up}>
        <h2>Bem vindo de volta!</h2>
        <p>
          Para continuar conectado, faça login com suas informações pessoais
        </p>

        <Link to="/register">Criar conta</Link>
      </aside>

      {error && <p>{error}</p>}
    </section>
  );
};
