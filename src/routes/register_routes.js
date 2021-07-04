import { Router } from "express";
import AuthController from "../controller/authcontroller";

import usersRouter from "./users";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Snakebite org API server").status(200);
});

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

router.use("/users", usersRouter);

router.use("*", (req, res) => {
  res.send("No resource found").status(404);
});

export default router;
