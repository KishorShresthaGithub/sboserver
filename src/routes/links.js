import { Router } from "express";
import LinkController from "../controller/linkcontroller";
import authenticateToken from "../middleware/authenticate_token";
import {
  createValidation,
  updateValidation,
} from "../middleware/requests/link";
import { validationMid } from "../middleware/validation";

const router = Router();

router.get("/", LinkController.index);
router.get("/all", LinkController.all);
router.get("/:id", LinkController.show);

router.post(
  "/",
  authenticateToken,
  createValidation,
  validationMid,
  LinkController.save
);

router.put(
  "/:id",
  authenticateToken,
  updateValidation,
  validationMid,
  LinkController.update
);
router.delete("/:id", LinkController.delete);

export default router;
