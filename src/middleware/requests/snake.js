import { check } from "express-validator";

export const createValidation = [
  check("name").notEmpty().withMessage("Name should not be empty").trim(),
  check("scientific_name")
    .notEmpty()
    .withMessage("Scientific Name should not be empty")
    .trim(),
  check("description")
    .notEmpty()
    .withMessage("Description should not be empty")
    .trim(),
];

export const updateValidation = [
  check("name").optional().trim(),
  check("scientific_name").optional().trim(),
  check("description").optional().trim(),
];
