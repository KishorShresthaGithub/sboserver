import { Router } from "express";
import EventController from "../controller/eventcontroller";
import { imageUpload } from "../helpers/upload";
import authenticateToken from "../middleware/authenticate_token";

const router = Router();
router.get("/", EventController.index);
router.get("/:slug", EventController.show);

router.post(
  "/",
  authenticateToken,
  imageUpload.single("image"),
  EventController.save
);

router.put(
  "/:slug",
  authenticateToken,
  imageUpload.single("image"),
  EventController.update
);

router.delete("/:slug", authenticateToken, EventController.destroy);

export default router;
