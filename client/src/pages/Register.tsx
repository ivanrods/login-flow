import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import Input from "../components/input";
import styles from "../styles/section.module.css";

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Senha obrigatória"),
});

type FormData = {
  name: string;
  email: string;
  password: string;
};

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data: FormData) => {
    setError("");

    try {
      await api.post("/auth/signup", data);
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao criar conta.");
      }
    }
  };

  return (
    <section className={styles.section}>
      <aside className={styles.in}>
        <h2>Olá amigo!</h2>
        <p>Cadastre-se com dados pessoais para conectar</p>

        <Link to="/login">Fazer login</Link>
      </aside>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.in_form}>
        <h1>Create Account</h1>
        <span>insira seus dados para registro</span>
        <Input
          type="text"
          label="Nome"
          placeholder="Nome"
          {...register("name")}
        />

        {errors.name && <p>{errors.name.message}</p>}
        <Input
          type="email"
          label="Email"
          placeholder="E-mail"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <Input
          type="password"
          label="Senaha"
          placeholder="Senha"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Cadastrar</button>
      </form>

      {error && <p>{error}</p>}
    </section>
  );
};
