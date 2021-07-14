import { check } from "express-validator";

export const createValidation = [
  check("caption").optional().trim(),
  check("position")
    .optional()
    .toInt()
    .isNumeric()
    .withMessage("Position should be numeric"),
];

export const updateValidation = [
  check("caption").optional().trim(),
  check("position").optional().toInt().isNumeric(),
];
