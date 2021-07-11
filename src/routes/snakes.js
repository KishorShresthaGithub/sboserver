import { Router } from "express";
import authenticateToken from "../middleware/authenticate_token";
import SnakeController from "./../controller/snakecontroller";

const router = Router();

router.get("/", SnakeController.index);
router.get("/:slug", SnakeController.show);

router.post("/", authenticateToken, SnakeController.save);
router.put("/:slug", authenticateToken, SnakeController.update);
router.delete("/:slug", authenticateToken, SnakeController.delete);

export default router;
