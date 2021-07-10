import { Router } from "express";
import ContactController from "../controller/contactcontroller";
import authenticateToken from "../middleware/authenticate_token";

const router = Router();

router.get("/", authenticateToken, ContactController.index);
router.get("/:id", authenticateToken, ContactController.show);
router.post("/", ContactController.save);

export default router;
