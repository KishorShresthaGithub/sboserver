"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileValidation = exports.validationMid = void 0;

var _expressValidator = require("express-validator");

var _basecontroller = _interopRequireDefault(require("../controller/basecontroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validationMid = function validationMid(req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return _basecontroller["default"].sendError(res, errors.array(), "Validation Errors", 400);
  }

  next();
};

exports.validationMid = validationMid;

var fileValidation = function fileValidation(req, res, next) {
  if (req.file || req.files) {
    next();
  }

  return _basecontroller["default"].sendError(res, {}, "No image uploaded", 400);
};

exports.fileValidation = fileValidation;