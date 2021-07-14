"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateValidation = exports.createValidation = void 0;

var _expressValidator = require("express-validator");

var createValidation = [(0, _expressValidator.check)("title").notEmpty().withMessage("Title is required").trim(), (0, _expressValidator.check)("start_date").notEmpty().withMessage("Start Date is required").trim(), (0, _expressValidator.check)("end_date").notEmpty().withMessage("End Date is required").trim(), (0, _expressValidator.check)("location").notEmpty().withMessage("Location is required").trim(), (0, _expressValidator.check)("time").notEmpty().withMessage("Time is required"), (0, _expressValidator.check)("description").notEmpty().withMessage("Description is required")];
exports.createValidation = createValidation;
var updateValidation = [(0, _expressValidator.check)("title").optional().trim(), (0, _expressValidator.check)("start_date").optional().trim(), (0, _expressValidator.check)("end_date").optional().trim(), (0, _expressValidator.check)("location").optional().trim(), (0, _expressValidator.check)("time").optional(), (0, _expressValidator.check)("description").optional()];
exports.updateValidation = updateValidation;