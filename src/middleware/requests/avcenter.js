import { check } from "express-validator";

export const createValidation = [
  check("name").notEmpty().withMessage("Title should not be empty").trim(),
  check("contact").notEmpty().withMessage("Name should not be empty").trim(),
  check("map_location")
    .notEmpty()
    .withMessage("Name should not be empty")
    .trim(),
  check("disctrict").notEmpty().withMessage("Name should not be empty").trim(),
];

export const updateValidation = [
  check("name").optional().trim(),
  check("contact").optional().trim(),
  check("map_location").optional().trim(),
  check("disctrict").optional().trim(),
];
