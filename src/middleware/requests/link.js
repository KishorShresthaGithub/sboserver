import { check } from "express-validator";

export const createValidation = [
  check("title").notEmpty().withMessage("Title cannot be empty").trim(),
  check("link").notEmpty().withMessage("Link should not be empty"),
  check("position").optional().toInt().isNumeric(),
  check("parent_link").optional(),
  check("page").optional().trim(),
];

export const updateValidation = [
  check("title").optional().trim(),
  check("link").optional().notEmpty().withMessage(" Links cannot be empty"),
  check("position").optional().toInt().isNumeric(),
  check("parent_link").optional(),
  check("page").optional().trim(),
];
