import { check } from "express-validator";

export const createValidation = [
  check("name").notEmpty().withMessage("Title should not be empty").trim(),
  check("contact").notEmpty().withMessage("Contact should not be empty").trim(),
  check("map_location")
    .optional()
    .trim(),
  check("district").notEmpty().withMessage("District should not be empty").trim(),
];

export const updateValidation = [
  check("name").optional().trim(),
  check("contact").optional().trim(),
  check("map_location").optional().trim(),
  check("disctrict").optional().trim(),
];
