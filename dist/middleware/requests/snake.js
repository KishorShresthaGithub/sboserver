"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateValidation = exports.createValidation = void 0;

var _expressValidator = require("express-validator");

var createValidation = [(0, _expressValidator.check)("name").notEmpty().withMessage("Name should not be empty").trim(), (0, _expressValidator.check)("scientific_name").notEmpty().withMessage("Scientific Name should not be empty").trim(), (0, _expressValidator.check)("description").notEmpty().withMessage("Description should not be empty").trim()];
exports.createValidation = createValidation;
var updateValidation = [(0, _expressValidator.check)("name").optional().trim(), (0, _expressValidator.check)("scientific_name").optional().trim(), (0, _expressValidator.check)("description").optional().trim()];
exports.updateValidation = updateValidation;