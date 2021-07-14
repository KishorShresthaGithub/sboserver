import { check } from "express-validator";

export const createValidation = [
  check("name").notEmpty().trim(),
  check("address").notEmpty().trim(),
  check("email")
    .isEmail()
    .withMessage("Email should be a valid email")
    .notEmpty()
    .trim(),
  check("phone").notEmpty().trim(),
  check("message").notEmpty(),
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
