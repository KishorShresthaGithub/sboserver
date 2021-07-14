import { check } from "express-validator";

export const createValidation = [
  check("title").notEmpty().trim(),
  check("show").optional().isBoolean(),
  check("description").notEmpty(),
];

export const updateValidation = [
  check("title").optional().trim(),
  check("show").optional().isBoolean(),
  check("description").optional(),
];
