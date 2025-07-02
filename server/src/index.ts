import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor Express rodando com sucesso!");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
