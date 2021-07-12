import { Router } from "express";
import LinkController from "../controller/linkcontroller";
import authenticateToken from "../middleware/authenticate_token";

const router = Router();

router.get("/", LinkController.index);
router.get("/:id", LinkController.show);

router.post("/", authenticateToken, LinkController.save);

router.put("/:id", LinkController.update);
router.delete("/:id", LinkController.delete);

export default router;
