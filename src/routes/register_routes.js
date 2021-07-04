import { Router } from "express";

import usersRouter from "./users";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Snakebite org API server").status(200);
});

router.use("/users", usersRouter);

router.use("*", (req, res) => {
  res.send("Not found resource").status(404);
});

export default router;
