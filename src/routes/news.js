import { Router } from "express";
import NewsController from "../controller/newscontroller";
import { imageUpload } from "../helpers/upload";
import authenticateToken from "../middleware/authenticate_token";
import {
  createValidation,
  updateValidation,
} from "../middleware/requests/news";
import { validationMid } from "../middleware/validation";

const router = Router();
router.get("/", NewsController.index);
router.get("/:slug", NewsController.show);

router.post(
  "/",
  authenticateToken,
  imageUpload.single("image"),
  createValidation,
  validationMid,
  NewsController.save
);

router.put(
  "/:id",
  authenticateToken,
  imageUpload.single("image"),
  updateValidation,
  validationMid,
  NewsController.update
);

router.delete("/:id", authenticateToken, NewsController.destroy);

export default router;
