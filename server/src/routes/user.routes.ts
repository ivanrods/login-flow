import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import {
  getAllUsers,

  updateUser,
  deleteUser,
} from "../controllers/profileController";

const router = Router();

router.get("/", verifyToken, getAllUsers);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
