import { check } from "express-validator";

export const createEventValidation = [
  check("title").notEmpty().trim(),
  check("start_date").notEmpty().trim(),
  check("end_date").notEmpty().trim(),
  check("location").notEmpty().trim(),
  check("time").notEmpty(),
  check("description").notEmpty(),
];

export const updateEventValidation = [
  check("title").optional().trim(),
  check("start_date").optional().trim(),
  check("end_date").optional().trim(),
  check("location").optional().trim(),
  check("time").optional(),
  check("description").optional(),
];
