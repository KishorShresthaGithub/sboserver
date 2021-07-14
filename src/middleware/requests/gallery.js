import { check } from "express-validator";

export const createValidation = [
  check("title").notEmpty().withMessage("Title should not be empty").trim(),
  check("description").optional().trim(),
];

export const updateValidation = [
  check("title").optional().trim(),
  check("description").optional(),
];
