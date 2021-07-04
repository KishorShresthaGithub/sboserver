import { Router } from "express";
import AuthController from "./../controller/authcontroller";
const router = Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", AuthController.login);

export default router;
