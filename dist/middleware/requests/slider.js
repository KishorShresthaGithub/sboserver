"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateValidation = exports.createValidation = void 0;

var _expressValidator = require("express-validator");

var createValidation = [(0, _expressValidator.check)("caption").optional().trim(), (0, _expressValidator.check)("position").optional().toInt().isNumeric().withMessage("Position should be numeric")];
exports.createValidation = createValidation;
var updateValidation = [(0, _expressValidator.check)("caption").optional().trim(), (0, _expressValidator.check)("position").optional().toInt().isNumeric()];
exports.updateValidation = updateValidation;