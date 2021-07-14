import { check } from "express-validator";

export const createValidation = [
  check("title").notEmpty().trim(),
  check("description").notEmpty(),
];

export const updateValidation = [
  check("title").optional().trim(),
  check("description").optional(),
];
