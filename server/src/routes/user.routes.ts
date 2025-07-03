import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/profileController";

const router = Router();

router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
