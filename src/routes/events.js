import { Router } from "express";
import EventController from "../controller/eventcontroller";
import { imageUpload } from "../helpers/upload";
import authenticateToken from "../middleware/authenticate_token";
import {
  createValidation,
  updateValidation,
} from "../middleware/requests/events";
import { validationMid } from "../middleware/validation";

const router = Router();
router.get("/", EventController.index);
router.get("/upcoming", EventController.upcoming);

router.get("/:slug", EventController.show);

router.post(
  "/",
  authenticateToken,
  imageUpload.single("image"),
  createValidation,
  validationMid,
  EventController.save
);

router.put(
  "/:id",
  authenticateToken,
  imageUpload.single("image"),
  updateValidation,
  validationMid,
  EventController.update
);

router.delete("/:id", authenticateToken, EventController.destroy);

export default router;
