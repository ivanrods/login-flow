import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { User } from "../models/User";

const router = Router();

router.get("/profile", verifyToken, async (req: any, res: any) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(user);
});

export default router;
