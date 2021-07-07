import { Router } from "express";
import BaseController from "../controller/basecontroller";
import checkRole from "../middleware/check_role";
import User from "../models/user";
import AuthController from "./../controller/authcontroller";
const router = Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const users = await User.findAll();

  return BaseController.sendResponse(res, users, "Users Listing");
});

router.put(
  "/change_roles/:string_id/",
  checkRole(["admin", "user"]),
  AuthController.changeUserRole
);

export default router;
