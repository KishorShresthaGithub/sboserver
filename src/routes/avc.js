//Routes for antivenom centers

import { Router } from "express";
import AVCcontroller from "./../controller/avccontroller";
import authenticateToken from "../middleware/authenticate_token";

const router = Router();

router.get("/", AVCcontroller.index);

//getting disctricts
router.get("/districts", AVCcontroller.districts);
router.get("/districts/:district", AVCcontroller.district);

router.get("/:slug", AVCcontroller.show);

router.post("/", authenticateToken, AVCcontroller.save);
router.put("/:slug", authenticateToken, AVCcontroller.update);
router.delete("/:slug", authenticateToken, AVCcontroller.destroy);

export default router;
