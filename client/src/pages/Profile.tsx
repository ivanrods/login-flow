import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../services/api";
import { AxiosError } from "axios";
import Input from "../components/input";
import styles from "../styles/profile.module.css";
import { useState, useEffect } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  avatar: yup.string().url("URL inválida").required("Avatar obrigatório"),
});

type FormData = {
  name: string;
  email: string;
  avatar: string;
};

export const Profile = () => {
  const { user, setUser, signOut } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        avatar: user.avatar || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    setError("");
    setMessage("");
    try {
      const res = await api.put(`/users/${user?._id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(res.data.user);
      setMessage("Perfil atualizado com sucesso!");
      reset(res.data.user);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao atualizar perfil.");
      }
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir sua conta?")) return;
    try {
      await api.delete(`/users/${user?._id}`);
      alert("Conta excluída com sucesso.");
      signOut();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao deletar perfil.");
      }
    }
  };

  if (!user) return <p>Carregando...</p>;

  const avatar = watch("avatar");

  return (
    <div className={styles.profile}>
      <img
        src={avatar || "https://via.placeholder.com/100"}
        alt="Avatar"
        width={100}
        height={100}
        style={{ borderRadius: "50%", marginBottom: 16 }}
      />

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          type="text"
          label="Avatar URL"
          placeholder="Avatar URL"
          {...register("avatar")}
        />
        {errors.avatar && (
          <p className={styles.error}>{errors.avatar.message}</p>
        )}

        <Input
          type="text"
          label="Nome"
          placeholder="Nome"
          {...register("name")}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <Input
          type="email"
          label="E-mail"
          placeholder="E-mail"
          {...register("email")}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <div className={styles.actions}>
          <button type="submit">Salvar</button>
          <button type="button" onClick={handleDelete}>
            Excluir conta
          </button>
          <button type="button" onClick={signOut}>
            Sair
          </button>
        </div>
      </form>

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
