"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateValidation = exports.createValidation = void 0;

var _expressValidator = require("express-validator");

var createValidation = [(0, _expressValidator.check)("title").notEmpty().withMessage("Title cannot be empty").trim(), (0, _expressValidator.check)("link").notEmpty().withMessage("Link should not be empty"), (0, _expressValidator.check)("position").optional().toInt().isNumeric(), (0, _expressValidator.check)("parent_link").optional(), (0, _expressValidator.check)("page").optional().trim()];
exports.createValidation = createValidation;
var updateValidation = [(0, _expressValidator.check)("title").optional().trim(), (0, _expressValidator.check)("link").optional().notEmpty().withMessage(" Links cannot be empty"), (0, _expressValidator.check)("position").optional().toInt().isNumeric(), (0, _expressValidator.check)("parent_link").optional(), (0, _expressValidator.check)("page").optional().trim()];
exports.updateValidation = updateValidation;