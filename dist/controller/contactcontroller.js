"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _contact = _interopRequireDefault(require("../models/contact"));

var _basecontroller = _interopRequireDefault(require("./basecontroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ContactController = {
  /**
   * Method to display all contacts
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  index: function index(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var contacts;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _contact["default"].findAll({
                order: [["created_at", "DESC"]]
              });

            case 3:
              contacts = _context.sent;
              return _context.abrupt("return", _basecontroller["default"].sendResponse(res, contacts, "Contact message listing"));

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
   * Method to display single contact
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  show: function show(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var contact;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _contact["default"].findOne({
                where: {
                  id: req.params.id
                }
              });

            case 3:
              contact = _context2.sent;

              if (contact) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", _basecontroller["default"].sendError(res, {}, "Contact not found", 404));

            case 6:
              return _context2.abrupt("return", _basecontroller["default"].sendResponse(res, contact.toJSON(), "Contact listing"));

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _basecontroller["default"].sendError(res, _context2.t0));

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }))();
  },

  /**
   * Method to save contact to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  save: function save(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var contact;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _contact["default"].create(req.body);

            case 3:
              contact = _context3.sent;

              if (contact) {
                _context3.next = 6;
                break;
              }

              throw new Error();

            case 6:
              return _context3.abrupt("return", _basecontroller["default"].sendResponse(res, contact.toJSON(), "Contact message sent"));

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              return _context3.abrupt("return", _basecontroller["default"].sendError(res, _context3.t0));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }))();
  }
};
var _default = ContactController;
exports["default"] = _default;