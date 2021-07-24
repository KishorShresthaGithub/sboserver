"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateValidation = exports.createValidation = void 0;

var _expressValidator = require("express-validator");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createValidation = [(0, _expressValidator.check)("title").notEmpty().withMessage("Title is required").trim(), (0, _expressValidator.check)("start_date").notEmpty().withMessage("Start Date is required").trim(), (0, _expressValidator.check)("end_date").notEmpty().withMessage("End Date is required").custom(function (value, _ref) {
  var req = _ref.req;

  if (!(0, _moment["default"])(req.body.start_date).isSameOrBefore(value)) {
    throw new Error("Start Date should be same or before the End Date");
  } else {
    return true;
  }
}), (0, _expressValidator.check)("location").notEmpty().withMessage("Location is required").trim(), (0, _expressValidator.check)("time").notEmpty().withMessage("Time is required"), (0, _expressValidator.check)("description").notEmpty().withMessage("Description is required")];
exports.createValidation = createValidation;
var updateValidation = [(0, _expressValidator.check)("title").optional().trim(), (0, _expressValidator.check)("start_date").optional().trim(), (0, _expressValidator.check)("end_date").optional().custom(function (value, _ref2) {
  var req = _ref2.req;

  if (!(0, _moment["default"])(req.body.start_date).isSameOrBefore(value)) {
    throw new Error("Start Date should be same or before the End Date");
  } else {
    return true;
  }
}), (0, _expressValidator.check)("location").optional().trim(), (0, _expressValidator.check)("time").optional(), (0, _expressValidator.check)("description").optional()];
exports.updateValidation = updateValidation;