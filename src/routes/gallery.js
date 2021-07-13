import { Router } from "express";
import GalleryController from "../controller/gallerycontroller";
import { imageUpload } from "../helpers/upload";
import authenticateToken from "../middleware/authenticate_token";

const router = Router();

router.get("/", GalleryController.index);
router.get("/:gallery", GalleryController.show);

router.post(
  "/",
  authenticateToken,
  imageUpload.array("images"),
  GalleryController.save
);
router.put(
  "/:gallery",
  authenticateToken,
  imageUpload.single("image"),
  GalleryController.update
);
router.delete("/:gallery", authenticateToken, GalleryController.destroy);

router.post(
  "/:gallery/galleryImage",
  authenticateToken,
  imageUpload.single("image"),
  GalleryController.addSingle
);

router.put(
  "/:gallery/galleryImage/:gallery_id",
  authenticateToken,
  imageUpload.single("image"),
  GalleryController.updateSingle
);

router.delete(
  "/:gallery/galleryImage/:gallery_id",
  authenticateToken,
  GalleryController.deleteSingle
);

export default router;
