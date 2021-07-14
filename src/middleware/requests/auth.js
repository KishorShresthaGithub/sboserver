import { check } from "express-validator";
import User from "../../models/user";
import { Op } from "sequelize";

export const authRegisterValidation = [
  check("email")
    .isEmail()
    .withMessage("Email must be email")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
  check("password").notEmpty().withMessage("Password is required"),
  check("c_password")
    .notEmpty()
    .withMessage("Password Confirmation is empty")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Password confirmation doesnot match");
      return true;
    }),
  check("first_name").trim().notEmpty(),
  check("last_name").trim().notEmpty(),
];

export const authUpdateValidation = [
  check("email")
    .optional()
    .isEmail()
    .withMessage("Email must be email")
    .trim()
    .custom((value, { req }) => {
      return User.findOne({
        where: { email: value, [Op.not]: { id: req.user.id } },
      }).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),

  check("c_password")
    .optional()
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Password confirmation doesnot match");
      return true;
    }),
  check("first_name").optional().trim(),
  check("last_name").optional().trim(),
];

export const loginValidation = [
  check("email").notEmpty().withMessage("Please enter your email").trim(),
  check("password").notEmpty().withMessage("Please enter your password"),
];
