"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _basecontroller = _interopRequireDefault(require("./basecontroller"));

var _uploadcontroller = _interopRequireDefault(require("./uploadcontroller"));

var _Snake = _interopRequireDefault(require("../models/Snake"));

var _url = _interopRequireDefault(require("../helpers/url"));

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SnakeController = {
  /**
   * Method to list all Snakes
   * can pass limit query to limit the number of Snakes
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  index: function index(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var Snakes;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _Snake["default"].findAll({
                order: [["name", "ASC"]]
              });

            case 3:
              Snakes = _context.sent;
              return _context.abrupt("return", _basecontroller["default"].sendResponse(res, Snakes, "Snakes listing"));

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", _basecontroller["default"].sendError(res, _context.t0));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }))();
  },

  /**
   * Method to show resource
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  show: function show(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var id, ev;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id;
              _context2.next = 4;
              return _Snake["default"].findOne({
                where: {
                  id: id
                }
              });

            case 4:
              ev = _context2.sent;

              if (ev) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", _basecontroller["default"].sendError(res, {}, "Snake not found", 404));

            case 7:
              return _context2.abrupt("return", _basecontroller["default"].sendResponse(res, ev.toJSON(), "Snake listing"));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              return _context2.abrupt("return", _basecontroller["default"].sendError(res, _context2.t0));

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 10]]);
    }))();
  },

  /**
   * Method to save Snakes to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  save: function save(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var file, imageUrl, ref, ev;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              file = req.file || null;

              if (!file) {
                _context3.next = 8;
                break;
              }

              imageUrl = _url["default"];
              _context3.next = 6;
              return _uploadcontroller["default"].compressImage(file);

            case 6:
              ref = _context3.sent;
              //image url
              imageUrl += "/public/images/".concat(ref);

            case 8:
              _context3.next = 10;
              return _Snake["default"].create(_objectSpread(_objectSpread({}, req.body), {}, {
                image: imageUrl
              }));

            case 10:
              ev = _context3.sent;

              if (ev) {
                _context3.next = 13;
                break;
              }

              throw Error();

            case 13:
              return _context3.abrupt("return", _basecontroller["default"].sendResponse(res, ev.toJSON(), "Snake successfully added"));

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              return _context3.abrupt("return", _basecontroller["default"].sendError(res, _context3.t0));

            case 20:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 16]]);
    }))();
  },

  /**
   * Method to update Snakes to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  update: function update(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var id, ev, file, updatedata, imageUrl, ref, updateConfirm;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              //TODO move to validation middleware
              id = req.params.id;
              _context4.next = 4;
              return _Snake["default"].findOne({
                where: {
                  id: id
                }
              });

            case 4:
              ev = _context4.sent;

              if (ev) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", _basecontroller["default"].sendError(res, {}, "Snake not found", 404));

            case 7:
              //   const { title, date, location, time, description } = req.body;
              file = req.file || null; //TODO validation empty body;

              updatedata = req.body;

              if (!file) {
                _context4.next = 16;
                break;
              }

              imageUrl = _url["default"];
              _context4.next = 13;
              return _uploadcontroller["default"].compressImage(file);

            case 13:
              ref = _context4.sent;
              //image url
              imageUrl += "/public/images/".concat(ref);
              updatedata = _objectSpread(_objectSpread({}, updatedata), {}, {
                image: imageUrl
              });

            case 16:
              _context4.next = 18;
              return ev.update(updatedata);

            case 18:
              updateConfirm = _context4.sent;

              if (updateConfirm) {
                _context4.next = 21;
                break;
              }

              throw Error();

            case 21:
              return _context4.abrupt("return", _basecontroller["default"].sendResponse(res, ev.toJSON(), "Snake successfully added"));

            case 24:
              _context4.prev = 24;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              return _context4.abrupt("return", _basecontroller["default"].sendError(res, _context4.t0));

            case 28:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 24]]);
    }))();
  },

  /**
   * Method to delete resource
   *
   * @param {Request} req
   * @param {Response} res
   */
  destroy: function destroy(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var id, ev, deleteData;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              //TODO move to validation middleware
              id = req.params.id;
              _context5.next = 4;
              return _Snake["default"].findOne({
                where: {
                  id: id
                }
              });

            case 4:
              ev = _context5.sent;

              if (ev) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return", _basecontroller["default"].sendError(res, {}, "Snake not found", 404));

            case 7:
              _context5.next = 9;
              return ev.destroy();

            case 9:
              deleteData = _context5.sent;

              if (deleteData) {
                _context5.next = 12;
                break;
              }

              throw Error("Something went wrong when deleteing item");

            case 12:
              return _context5.abrupt("return", _basecontroller["default"].sendResponse(res, ev.toJSON(), "Item Successfully deleted"));

            case 15:
              _context5.prev = 15;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              return _context5.abrupt("return", _basecontroller["default"].sendError(res, _context5.t0));

            case 19:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 15]]);
    }))();
  }
};
var _default = SnakeController;
exports["default"] = _default;