import { User } from "../models/User";

export const getAllUsers = async (_req: any, res: any) => {
  const users = await User.find().select("-password"); // esconde a senha
  res.json(users);
};

export const updateUser = async (req: any, res: any) => {
  const { name, email, avatar } = req.body;

  if (req.user.id !== req.params.id) {
    return res.status(403).json({ message: "Acesso negado." });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, avatar },
    { new: true }
  ).select("-password");

  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json({ message: "Usuário atualizado com sucesso", user });
};

export const deleteUser = async (req: any, res: any) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (req.user.id !== req.params.id) {
    return res.status(403).json({ message: "Acesso negado." });
  }

  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json({ message: "Usuário deletado com sucesso" });
};
