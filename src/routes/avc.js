//Routes for antivenom centers

import { Router } from "express";
import authenticateToken from "../middleware/authenticate_token";
import {
  createValidation,
  updateValidation,
} from "../middleware/requests/avcenter";
import { validationMid } from "../middleware/validation";
import AVCcontroller from "./../controller/avccontroller";

const router = Router();

router.get("/", AVCcontroller.index);

//getting disctricts
router.get("/districts", AVCcontroller.districts);
router.get("/districts/:district", AVCcontroller.district);

router.get("/:slug", AVCcontroller.show);

router.post(
  "/",
  authenticateToken,
  createValidation,
  validationMid,
  AVCcontroller.save
);

router.put(
  "/:slug",
  authenticateToken,
  updateValidation,
  validationMid,
  AVCcontroller.update
);

router.delete("/:slug", authenticateToken, AVCcontroller.destroy);

export default router;
