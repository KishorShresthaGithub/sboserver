import { check } from "express-validator";

export const createValidation = [
  check("title").notEmpty().withMessage("Title should not be empty").trim(),
  check("show").optional().isBoolean(),
  check("description")
    .notEmpty()
    .withMessage("Description should not be empty"),
];

export const updateValidation = [
  check("title").optional().trim(),
  check("show").optional().isBoolean(),
  check("description").optional(),
];
