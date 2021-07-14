import { check } from "express-validator";

export const createValidation = [
  check("title").notEmpty().withMessage("Title cannot be empty").trim(),
  check("link").notEmpty().withMessage("Link should not be empty").trim(),
  check("parent_link")
    .optional()
    .toInt()
    .isNumeric()
    .withMessage("Parent link value should be a number")
    .trim(),
  check("page").optional().trim(),
];

export const updateValidation = [
  check("title").optional().trim(),
  check("link").optional().trim(),
  check("parent_link").optional().toInt().isNumeric().trim(),
  check("page").optional().trim(),
];
