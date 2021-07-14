import { check } from "express-validator";

export const createValidation = [
  check("link").notEmpty().trim(),
  check("parent_link").optional().toInt().isNumeric().trim(),
  check("page").optional().trim(),
];

export const updateValidation = [
  check("link").optional().trim(),
  check("parent_link").optional().toInt().isNumeric().trim(),
  check("page").optional().trim(),
];
