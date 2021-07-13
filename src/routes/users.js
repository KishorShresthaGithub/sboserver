import { Router } from "express";
import UserController from "../controller/usercontroller";
import checkRole from "../middleware/check_role";
import { authUpdateValidation } from "../middleware/requests/auth";
import { validationMid } from "../middleware/validation";
import AuthController from "./../controller/authcontroller";

const router = Router();
/* GET users listing. */
router.get("/", checkRole(["admin"]), UserController.getAllUsers);

router.get("/current", UserController.getCurrentUser);
router.put(
  "/current",
  authUpdateValidation,
  validationMid,
  UserController.updateUser
);

router.get("/:user_string_id", UserController.getUser);

router.put(
  "/:user_string_id",
  checkRole(["admin"]),
  authUpdateValidation,
  validationMid,
  UserController.updateUser
);

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
