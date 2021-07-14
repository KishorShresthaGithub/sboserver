import { check } from "express-validator";

export const createValidation = [
  check("name").notEmpty().trim(),
  check("scientific_name").notEmpty().trim(),
  check("description").notEmpty().trim(),
];

export const updateValidation = [
  check("name").optional().trim(),
  check("scientific_name").optional().trim(),
  check("description").optional().trim(),
];
