"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireWildcard(require("../models/user"));

var _basecontroller = _interopRequireDefault(require("./basecontroller"));

var _expressValidator = require("express-validator");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var AuthController = {
  /**
   * Method to login user
   *
   * @param {Request} req
   * @param {Response} res
   * @returns Response
   */
  login: function login(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _req$body, email, password, user, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              _context.next = 4;
              return _user["default"].findOne({
                where: {
                  email: email
                }
              });

            case 4:
              user = _context.sent;

              if (user) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", _basecontroller["default"].sendError(res, null, "User not found", 401));

            case 7:
              _context.next = 9;
              return _bcrypt["default"].compare(password, user.password);

            case 9:
              if (_context.sent) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", _basecontroller["default"].sendError(res, null, "User Credentials do not match", 401));

            case 11:
              token = AuthController.generateAccessToken(user.toJSON());
              return _context.abrupt("return", _basecontroller["default"].sendResponse(res, token, "Login Successful"));

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _basecontroller["default"].sendError(res, _context.t0.errors));

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 15]]);
    }))();
  },

  /**
   *
   * Method to register users
   *
   * @param {Request} req
   * @param {Response} res
   * @returns Response
   */
  register: function register(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _req$body2, first_name, last_name, email, password, c_password, passwordHash, user, accessToken;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body2 = req.body, first_name = _req$body2.first_name, last_name = _req$body2.last_name, email = _req$body2.email, password = _req$body2.password, c_password = _req$body2.c_password;
              _context2.next = 4;
              return _bcrypt["default"].hash(password, 15);

            case 4:
              passwordHash = _context2.sent;
              _context2.next = 7;
              return _user["default"].create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: passwordHash
              }, {
                skip: ["string_id"]
              });

            case 7:
              user = _context2.sent;
              accessToken = AuthController.generateAccessToken(user.toJSON());
              return _context2.abrupt("return", _basecontroller["default"].sendResponse(res, accessToken, "User registered"));

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _basecontroller["default"].sendError(res, _context2.t0.errors));

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 12]]);
    }))();
  },
  generateAccessToken: function generateAccessToken(user) {
    var token = _jsonwebtoken["default"].sign(user, process.env.JWT_TOKEN_SECRET, {
      expiresIn: 7 * 24 * 60 * 60
    });

    return {
      access_token: token
    };
  },

  /**
   * Method to change user role
   *
   * @param {Request} req
   * @param {Response} res
   * @returns  Resoponse
   */
  changeUserRole: function changeUserRole(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var user_string_id, role, userDb, updated;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              user_string_id = req.params.user_string_id;
              role = req.body.role;
              _context3.next = 5;
              return _user["default"].findOne({
                where: {
                  string_id: user_string_id
                }
              });

            case 5:
              userDb = _context3.sent;
              _context3.next = 8;
              return userDb.update({
                role: _user.Role.get(role)
              });

            case 8:
              updated = _context3.sent;

              if (updated) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt("return", _basecontroller["default"].sendError(res, {}, "Something went wrong", 500));

            case 11:
              return _context3.abrupt("return", _basecontroller["default"].sendResponse(res, userDb.toJSON(), "Changed User Role"));

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", _basecontroller["default"].sendError(res, _context3.t0.errors));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 14]]);
    }))();
  }
};
var _default = AuthController;
exports["default"] = _default;