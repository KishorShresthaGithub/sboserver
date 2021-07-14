import { Router } from "express";
import { imageUpload } from "../helpers/upload";
import authenticateToken from "../middleware/authenticate_token";
import {
  createValidation,
  updateValidation,
} from "../middleware/requests/snake";
import { validationMid } from "../middleware/validation";

import SnakeController from "./../controller/snakecontroller";

const router = Router();

router.get("/", SnakeController.index);
router.get("/:slug", SnakeController.show);

router.post(
  "/",
  authenticateToken,
  imageUpload.single("image"),
  createValidation,
  validationMid,
  SnakeController.save
);
router.put(
  "/:slug",
  authenticateToken,
  imageUpload.single("image"),
  updateValidation,
  validationMid,
  SnakeController.update
);
router.delete("/:slug", authenticateToken, SnakeController.destroy);

export default router;
