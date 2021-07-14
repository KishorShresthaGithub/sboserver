import { check } from "express-validator";

export const createValidation = [
  check("name").notEmpty().withMessage("Name should not be empty").trim(),
  check("address").notEmpty().withMessage("Address should not be empty").trim(),
  check("email")
    .isEmail()
    .withMessage("Email should be a valid email")
    .notEmpty()
    .withMessage("Email should not be empty")
    .trim(),
  check("phone").notEmpty().withMessage("Phone should not be empty").trim(),
  check("message").notEmpty().withMessage("Message should not be empty"),
];

export const updateValidation = [
  check("name").optional().trim(),
  check("address").optional().trim(),
  check("email")
    .isEmail()
    .withMessage("Email should be a valid email")
    .optional()
    .trim(),
  check("phone").optional().trim(),
  check("message").optional(),
];
