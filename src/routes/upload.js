import { Router } from "express";

import path from "path";

import { imageUpload } from "../helpers/upload";

const router = Router();
const pa = path.resolve(__dirname, "../public", "images");

router.post("/", imageUpload.single("image"), GalleryController.uploadImage);
router.post(
  "/multiple",
  imageUpload.array("images"),
  GalleryController.uploadImages
);

export default router;
