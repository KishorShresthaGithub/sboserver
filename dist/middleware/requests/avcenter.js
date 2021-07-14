"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateValidation = exports.createValidation = void 0;

var _expressValidator = require("express-validator");

var createValidation = [(0, _expressValidator.check)("name").notEmpty().withMessage("Title should not be empty").trim(), (0, _expressValidator.check)("contact").notEmpty().withMessage("Name should not be empty").trim(), (0, _expressValidator.check)("map_location").notEmpty().withMessage("Name should not be empty").trim(), (0, _expressValidator.check)("disctrict").notEmpty().withMessage("Name should not be empty").trim()];
exports.createValidation = createValidation;
var updateValidation = [(0, _expressValidator.check)("name").optional().trim(), (0, _expressValidator.check)("contact").optional().trim(), (0, _expressValidator.check)("map_location").optional().trim(), (0, _expressValidator.check)("disctrict").optional().trim()];
exports.updateValidation = updateValidation;