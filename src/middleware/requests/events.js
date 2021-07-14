import { check } from "express-validator";

export const createValidation = [
  check("title").notEmpty().withMessage("Title is required").trim(),
  check("start_date").notEmpty().withMessage("Start Date is required").trim(),
  check("end_date").notEmpty().withMessage("End Date is required").trim(),
  check("location").notEmpty().withMessage("Location is required").trim(),
  check("time").notEmpty().withMessage("Time is required"),
  check("description").notEmpty().withMessage("Description is required"),
];

export const updateValidation = [
  check("title").optional().trim(),
  check("start_date").optional().trim(),
  check("end_date").optional().trim(),
  check("location").optional().trim(),
  check("time").optional(),
  check("description").optional(),
];
