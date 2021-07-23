"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateValidation = exports.createValidation = void 0;

var _expressValidator = require("express-validator");

var createValidation = [(0, _expressValidator.check)("name").notEmpty().withMessage("Name should not be empty").trim(), (0, _expressValidator.check)("address").notEmpty().withMessage("Address should not be empty").trim(), (0, _expressValidator.check)("email").isEmail().withMessage("Email should be a valid email").notEmpty().withMessage("Email should not be empty").trim(), (0, _expressValidator.check)("phone").notEmpty().withMessage("Phone should not be empty").trim(), (0, _expressValidator.check)("message").notEmpty().withMessage("Message should not be empty")];
exports.createValidation = createValidation;
var updateValidation = [(0, _expressValidator.check)("name").optional().trim(), (0, _expressValidator.check)("address").optional().trim(), (0, _expressValidator.check)("email").isEmail().withMessage("Email should be a valid email").optional().trim(), (0, _expressValidator.check)("phone").optional().trim(), (0, _expressValidator.check)("message").optional()];
exports.updateValidation = updateValidation;