import { Router } from "express";
import SliderController from "../controller/Slidercontroller";
import { imageUpload } from "../helpers/upload";
import authenticateToken from "../middleware/authenticate_token";

const router = Router();
router.get("/", SliderController.index);
router.get("/:slug", SliderController.show);

router.post(
  "/",
  authenticateToken,
  imageUpload.single("image"),
  SliderController.save
);

router.put(
  "/:slug",
  authenticateToken,
  imageUpload.single("image"),
  SliderController.update
);

router.delete("/:slug", authenticateToken, SliderController.destroy);

export default router;
