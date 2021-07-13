import { validationResult } from "express-validator";
import BaseController from "../controller/basecontroller";

export const validationMid = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return BaseController.sendError(
      res,
      { errors: errors.array() },
      "Validation Errors",
      400
    );
  }
  next();
};
