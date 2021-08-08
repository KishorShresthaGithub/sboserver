"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginValidation = exports.authUpdateValidation = exports.authRegisterValidation = void 0;

var _expressValidator = require("express-validator");

var _user = _interopRequireDefault(require("../../models/user"));

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var authRegisterValidation = [(0, _expressValidator.check)("email").isEmail().withMessage("Email must be email").notEmpty().withMessage("Email is required").trim().custom(function (value) {
  return _user["default"].findOne({
    where: {
      email: value
    }
  }).then(function (user) {
    if (user) {
      return Promise.reject("E-mail already in use");
    }
  });
}), (0, _expressValidator.check)("password").notEmpty().withMessage("Password is required"), (0, _expressValidator.check)("c_password").notEmpty().withMessage("Password Confirmation is empty").custom(function (value, _ref) {
  var req = _ref.req;
  if (value !== req.body.password) throw new Error("Password confirmation doesnot match");
  return true;
}), (0, _expressValidator.check)("first_name").trim().notEmpty(), (0, _expressValidator.check)("last_name").trim().notEmpty()];
exports.authRegisterValidation = authRegisterValidation;
var authUpdateValidation = [(0, _expressValidator.check)("email").optional().isEmail().withMessage("Email must be email").trim().custom(function (value, _ref2) {
  var req = _ref2.req;
  return _user["default"].findOne({
    where: _defineProperty({
      email: value
    }, _sequelize.Op.not, {
      id: req.user.id
    })
  }).then(function (user) {
    if (user) {
      return Promise.reject("E-mail already in use");
    }
  });
}), (0, _expressValidator.check)("c_password").optional().custom(function (value, _ref3) {
  var req = _ref3.req;
  if (value !== req.body.password) throw new Error("Password confirmation doesnot match");
  return true;
}), (0, _expressValidator.check)("first_name").optional().trim(), (0, _expressValidator.check)("last_name").optional().trim()];
exports.authUpdateValidation = authUpdateValidation;
var loginValidation = [(0, _expressValidator.check)("email").notEmpty().withMessage("Please enter your email").trim(), (0, _expressValidator.check)("password").notEmpty().withMessage("Please enter your password")];
exports.loginValidation = loginValidation;