import { Router } from "express";
import AuthController from "../controller/authcontroller";
import authenticateToken from "../middleware/authenticate_token";

import usersRouter from "./users";
import eventsRouter from "./events";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Snakebite org API server").status(200);
});

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

router.use("/users", authenticateToken, usersRouter);
router.use("/events", eventsRouter);

// router.use("/gallery", galleryRouter);

router.use("*", (req, res) => {
  res.send("No resource found").status(404);
});

export default router;
