import { Router } from "express";
import md5 from "md5";
import multer from "multer";
import GalleryController from "../controller/gallerycontroller";
import path from "path";
import fs from "fs";

const router = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const pa = path.resolve(__dirname, "../public", "images");
    if (!fs.existsSync(pa)) {
      fs.mkdirSync(pa);
    }
    cb(null, pa);
  },
  filename(req, file, cb) {
    let filename = md5(file.fieldname + "" + Date.now());
    filename += `.${file.originalname.split(".")[1]}`; //extension

    cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    let filetype = file.mimetype === "image/jpeg";
    filetype |= file.mimetype === "image/png";
    filetype |= file.mimetype === "image/svg";
    filetype |= file.mimetype === "image/webp";

    if (!filetype) {
      cb(new Error("Please upload an image"), false);
    }
    cb(null, true);
  },
});

router.post("/", upload.single("images"), GalleryController.uploadImage);
router.post(
  "/multiple",
  upload.array("images"),
  GalleryController.uploadImages
);

export default router;
