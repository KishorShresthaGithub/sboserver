import { Router } from "express";
import BaseController from "../controller/basecontroller";
import UserController from "../controller/usercontroller";
import checkRole from "../middleware/check_role";
import User from "../models/user";
import AuthController from "./../controller/authcontroller";
const router = Router();

/* GET users listing. */
router.get("/", checkRole(["admin"]), UserController.getAllUsers);

router.get("/current", UserController.getCurrentUser);
router.put("/current", UserController.updateUser);

router.get("/:user_string_id", UserController.getUser);

router.put("/:user_string_id", checkRole(["admin"]), UserController.updateUser);
router.delete(
  "/:user_string_id",
  checkRole(["admin"]),
  UserController.deleteUser
);

router.put(
  "/:user_string_id/change_role",
  checkRole(["admin"]),
  AuthController.changeUserRole
);

export default router;
