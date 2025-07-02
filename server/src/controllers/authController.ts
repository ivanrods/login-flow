import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

export const signUp = async (req: any, res: any) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "E-mail já cadastrado." });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso!", userId: user._id });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro ao cadastrar usuário.", error: err });
  }
};

export const signIn = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Senha incorreta." });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    return res
      .status(200)
      .json({ message: "Login realizado com sucesso.", token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro ao fazer login.", error: err });
  }
};
