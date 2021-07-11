import { Router } from "express";
import NewsController from "../controller/Newscontroller";
import { imageUpload } from "../helpers/upload";
import authenticateToken from "../middleware/authenticate_token";

const router = Router();
router.get("/", NewsController.index);
router.get("/:slug", NewsController.show);

router.post(
  "/",
  authenticateToken,
  imageUpload.single("image"),
  NewsController.save
);

router.put(
  "/:slug",
  authenticateToken,
  imageUpload.single("image"),
  NewsController.update
);

router.delete("/:slug", authenticateToken, NewsController.destroy);

export default router;
