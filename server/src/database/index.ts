import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string)
    console.log('🟢 Conectado ao MongoDB')
  } catch (error) {
    console.error('🔴 Erro ao conectar ao MongoDB:', error)
  }
}