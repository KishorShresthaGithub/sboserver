"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireWildcard(require("../models/user"));

var _basecontroller = _interopRequireDefault(require("./basecontroller"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _excluded = ["role", "password", "email"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UserController = {
  /**
   * Method to get all users from store
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Callback} _next
   * @returns
   */
  getAllUsers: function getAllUsers(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var users;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _user["default"].findAll({
                order: [["created_at", "DESC"]]
              });

            case 3:
              users = _context.sent;
              return _context.abrupt("return", _basecontroller["default"].sendResponse(res, users, "Users Listing"));

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _basecontroller["default"].sendError(res, _context.t0));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }))();
  },

  /**
   * Method to get user from string_id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Callback} _next
   * @returns
   */
  getUser: function getUser(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var user_string_id, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              user_string_id = req.params.user_string_id;
              _context2.next = 4;
              return _user["default"].findOne({
                where: {
                  string_id: user_string_id
                }
              });

            case 4:
              user = _context2.sent;
              return _context2.abrupt("return", _basecontroller["default"].sendResponse(res, user.toJSON(), "User Listing"));

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              return _context2.abrupt("return", _basecontroller["default"].sendError(res, _context2.t0));

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8]]);
    }))();
  },

  /**
   * Method to get current logged in user
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Callback} _next
   * @returns
   */
  getCurrentUser: function getCurrentUser(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var user;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _user["default"].findOne({
                where: {
                  string_id: req.user.string_id
                }
              });

            case 3:
              user = _context3.sent;
              return _context3.abrupt("return", _basecontroller["default"].sendResponse(res, user.toJSON(), "Current User"));

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              return _context3.abrupt("return", _basecontroller["default"].sendError(res, _context3.t0));

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }))();
  },

  /**
   * Method to update user details
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Callback} next
   */
  updateUser: function updateUser(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var user_string_id, _req$body, role, password, email, request, passwordHash, user, update;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              //get string id from params and if params not defined get user string id
              user_string_id = req.params.user_string_id || req.user.string_id; //TODO handle request body empty in validation
              //TODO handle email uniqueness when update
              //getting request except role

              _req$body = req.body, role = _req$body.role, password = _req$body.password, email = _req$body.email, request = _objectWithoutProperties(_req$body, _excluded);
              console.log(request);

              if (!password) {
                _context4.next = 9;
                break;
              }

              _context4.next = 7;
              return _bcrypt["default"].hash(password, 15);

            case 7:
              passwordHash = _context4.sent;
              request.password = passwordHash;

            case 9:
              _context4.next = 11;
              return _user["default"].findOne({
                where: {
                  string_id: user_string_id
                }
              });

            case 11:
              user = _context4.sent;

              if (user) {
                _context4.next = 14;
                break;
              }

              return _context4.abrupt("return", _basecontroller["default"].sendError(res, {}, "User does not exist", 400));

            case 14:
              if (email !== user.email) {
                request.email = email;
              } //update user


              _context4.next = 17;
              return user.update(request);

            case 17:
              update = _context4.sent;

              if (update) {
                _context4.next = 20;
                break;
              }

              throw Error({
                errors: "Something went wrong"
              });

            case 20:
              return _context4.abrupt("return", _basecontroller["default"].sendResponse(res, user.toJSON(), "User updated"));

            case 23:
              _context4.prev = 23;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              return _context4.abrupt("return", _basecontroller["default"].sendError(res, _context4.t0.errors, "Something went wrong"));

            case 27:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 23]]);
    }))();
  },

  /**
   * Method to delete user
   *
   * @param {Request} req
   * @param {Response} res
   * @param {*} next
   * @returns
   */
  deleteUser: function deleteUser(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var user, deletedUser;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _user["default"].findOne({
                where: {
                  string_id: req.params.user_string_id
                }
              });

            case 3:
              user = _context5.sent;
              _context5.next = 6;
              return user.destroy();

            case 6:
              deletedUser = _context5.sent;

              if (deletedUser) {
                _context5.next = 9;
                break;
              }

              throw new Error({
                errors: "Something went wrong"
              });

            case 9:
              return _context5.abrupt("return", _basecontroller["default"].sendResponse(res, user.toJSON(), "User successfully deleted"));

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", _basecontroller["default"].sendError(res, _context5.t0.errors));

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 12]]);
    }))();
  }
};
var _default = UserController;
exports["default"] = _default;