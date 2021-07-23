import { Router } from "express";
import SliderController from "../controller/slidercontroller";
import { imageUpload } from "../helpers/upload";
import authenticateToken from "../middleware/authenticate_token";
import {
  createValidation,
  updateValidation,
} from "../middleware/requests/slider";
import { validationMid } from "../middleware/validation";

const router = Router();
router.get("/", SliderController.index);
router.get("/:slug", SliderController.show);

router.post(
  "/",
  authenticateToken,
  imageUpload.single("image"),
  createValidation,
  validationMid,
  SliderController.save
);

router.put(
  "/:id",
  authenticateToken,
  imageUpload.single("image"),
  updateValidation,
  validationMid,
  SliderController.update
);

router.delete("/:id", authenticateToken, SliderController.destroy);

export default router;
