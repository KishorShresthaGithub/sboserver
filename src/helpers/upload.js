import multer from "multer";
import path from "path";
import fs from "fs";
import md5 from "md5";

export const image_storage = multer.diskStorage({
  destination(req, file, cb) {
    const pa = path.resolve(__dirname, "../public", "images");
    if (!fs.existsSync(pa)) {
      fs.mkdirSync(pa, { recursive: true });
    }
    cb(null, pa);
  },
  filename(req, file, cb) {
    let filename = md5(file.fieldname + "" + Date.now());
    filename += `.${file.originalname.split(".")[1]}`; //extension
    cb(null, filename);
  },
});

//image
export const imageUpload = multer({
  storage: image_storage,
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

export const pdf_storage = multer.diskStorage({
  destination(req, file, cb) {
    const pa = path.resolve(__dirname, "../public", "pdf");
    if (!fs.existsSync(pa)) {
      fs.mkdirSync(pa, { recursive: true });
    }
    cb(null, pa);
  },
  filename(req, file, cb) {
    let filename = md5(file.originalname + "" + Date.now());
    filename += `.${file.originalname.split(".")[1]}`; //extension
    cb(null, filename);
  },
});

//pdf
export const pdfUpload = multer({
  storage: pdf_storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    let filetype = file.mimetype === "application/pdf";

    if (!filetype) {
      cb(new Error("Please upload an pdf"), false);
    }
    cb(null, true);
  },
});
