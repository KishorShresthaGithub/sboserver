import { Router } from "express";
import ContactController from "../controller/contactcontroller";
import authenticateToken from "../middleware/authenticate_token";
import { createValidation } from "../middleware/requests/contact";
import { validationMid } from "../middleware/validation";

const router = Router();

router.get("/", authenticateToken, ContactController.index);
router.get("/:id", authenticateToken, ContactController.show);
router.post("/", createValidation, validationMid, ContactController.save);

export default router;
