import { validationResult } from "express-validator";
import BaseController from "../controller/basecontroller";

export const validationMid = (req, res, next) => {
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    return BaseController.sendError(
      res,
      errors.array(),
      "Validation Errors",
      400
    );
  }
  next();
};

export const fileValidation = (req, res, next) => {
  if (req.file || req.files) {
    next();
  }

  return BaseController.sendError(res, {}, "No image uploaded", 400);
};
