import { Router } from "express";
import AuthController from "../controller/authcontroller";
import UploadController from "../controller/uploadcontroller";
import { imageUpload } from "../helpers/upload";
import authenticateToken from "../middleware/authenticate_token";
import {
  authRegisterValidation,
  loginValidation,
} from "../middleware/requests/auth";
import { validationMid } from "../middleware/validation";
import avcRouter from "./avc";
import contactRouter from "./contacts";
import eventsRouter from "./events";
import galleryRouter from "./gallery";
import linkRouter from "./links";
import newsRouter from "./news";
import sliderRouter from "./slider";
import snakeRouter from "./snakes";
import summaryRouter from "./summaryreport";
import usersRouter from "./users";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Snakebite org API server").status(200);
});

router.post("/login", loginValidation, validationMid, AuthController.login);

router.post(
  "/register",
  authRegisterValidation,
  validationMid,
  AuthController.register
);

router.use("/users", authenticateToken, usersRouter);
router.use("/events", eventsRouter);
router.use("/contacts", contactRouter);
router.use("/news", newsRouter);
router.use("/avcenters", avcRouter);
// router.use("/gallery", galleryRouter);
router.use("/links", linkRouter);
router.use("/sliders", sliderRouter);
router.use("/snakes", snakeRouter);
router.use("/gallery", galleryRouter);
router.use("/summaryreport", summaryRouter);

router.post(
  "/upload_file",
  authenticateToken,
  imageUpload.single("image"),
  UploadController.uploadImage
);

router.use("*", (req, res) => {
  res.send("No resource found").status(404);
});

export default router;
