"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateValidation = exports.createValidation = void 0;

var _expressValidator = require("express-validator");

var createValidation = [(0, _expressValidator.check)("title").notEmpty().withMessage("Title should not be empty").trim(), (0, _expressValidator.check)("show").optional().toBoolean(), (0, _expressValidator.check)("description").notEmpty().withMessage("Description should not be empty")];
exports.createValidation = createValidation;
var updateValidation = [(0, _expressValidator.check)("title").optional().trim(), (0, _expressValidator.check)("show").optional().toBoolean(), (0, _expressValidator.check)("description").optional()];
exports.updateValidation = updateValidation;