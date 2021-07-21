import { Router } from "express";
import GalleryController from "../controller/uploadcontroller";
import { imageUpload, pdfUpload } from "../helpers/upload";

const router = Router();

router.post("/", imageUpload.single("image"), GalleryController.uploadImage);

router.post(
  "/multiple",
  imageUpload.array("images", 5),
  GalleryController.uploadImages
);

router.post("/pdf", pdfUpload.single("pdf"), GalleryController.uploadPDF);

export default router;
