import { check } from "express-validator";
import moment from "moment";

export const createValidation = [
  check("title").notEmpty().withMessage("Title is required").trim(),
  check("start_date").notEmpty().withMessage("Start Date is required").trim(),
  check("end_date")
    .notEmpty()
    .withMessage("End Date is required")
    .custom((value, { req }) => {
      if (!moment(req.body.start_date).isSameOrBefore(value)) {
        throw new Error("Start Date should be same or before the End Date");
      } else {
        return true;
      }
    }),

  check("location").notEmpty().withMessage("Location is required").trim(),
  check("time").notEmpty().withMessage("Time is required"),
  check("description").notEmpty().withMessage("Description is required"),
];

export const updateValidation = [
  check("title").optional().trim(),
  check("start_date").optional().trim(),
  check("end_date")
    .optional()
    .custom((value, { req }) => {
      if (!moment(req.body.start_date).isSameOrBefore(value)) {
        throw new Error("Start Date should be same or before the End Date");
      } else {
        return true;
      }
    }),
  check("location").optional().trim(),
  check("time").optional(),
  check("description").optional(),
];
