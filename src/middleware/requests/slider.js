import { check } from "express-validator";

export const createValidation = [
  check("caption").optional().trim(),
  check("position").optional().toInt().isNumeric(),
];

export const updateValidation = [
  check("caption").optional().trim(),
  check("position").optional().toInt().isNumeric(),
];
