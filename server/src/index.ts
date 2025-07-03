import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import { connectToDatabase } from "./database";
import authRoutes from './routes/auth.routes'
import protectedRoutes from './routes/protected.routes'
import userRoutes from './routes/user.routes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

connectToDatabase();

app.use('/api/auth', authRoutes)
app.use('/api/private', protectedRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
