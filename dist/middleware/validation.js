"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationMid = void 0;

var _expressValidator = require("express-validator");

var _basecontroller = _interopRequireDefault(require("../controller/basecontroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validationMid = function validationMid(req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return _basecontroller["default"].sendError(res, {
      errors: errors.array()
    }, "Validation Errors", 400);
  }

  next();
};

exports.validationMid = validationMid;