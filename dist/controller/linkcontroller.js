"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _link = _interopRequireDefault(require("../models/link"));

var _basecontroller = _interopRequireDefault(require("./basecontroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var LinkController = {
  /**
   *
   * Method to show all links with sub links
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  index: function index(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var dblinks;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _link["default"].findAll({
                order: [["position", "ASC"]]
              });

            case 3:
              dblinks = _context.sent;
              return _context.abrupt("return", _basecontroller["default"].sendResponse(res, dblinks, "Navigation"));

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
   *
   * Method to show all links
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  all: function all(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var dblinks;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _link["default"].findAll({
                order: [["parent_link", "ASC"]],
                raw: true
              });

            case 3:
              dblinks = _context2.sent;
              return _context2.abrupt("return", _basecontroller["default"].sendResponse(res, temp, "Navigation"));

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              return _context2.abrupt("return", _basecontroller["default"].sendError(res, _context2.t0));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }))();
  },

  /**
   *
   * Method to show single link data
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  show: function show(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var dblink;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _link["default"].findOne({
                where: {
                  link: req.params.url
                }
              });

            case 3:
              dblink = _context3.sent;

              if (dblink) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", _basecontroller["default"].sendError(res, null, "Link not found", 404));

            case 6:
              return _context3.abrupt("return", _basecontroller["default"].sendResponse(res, dblink, "Single link listing"));

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
  },

  /**
   *
   * Method to save links
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  save: function save(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var link;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _link["default"].create(req.body);

            case 3:
              link = _context4.sent;

              if (link) {
                _context4.next = 6;
                break;
              }

              throw Error("Somthing went wrong");

            case 6:
              return _context4.abrupt("return", _basecontroller["default"].sendResponse(res, link.toJSON(), "Link saved"));

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", _basecontroller["default"].sendError(res, _context4.t0));

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 9]]);
    }))();
  },

  /**
   *
   * Method to updated links and link pages
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  update: function update(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var link, update;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _link["default"].findOne({
                where: {
                  id: req.params.id
                }
              });

            case 3:
              link = _context5.sent;

              if (link) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", _basecontroller["default"].sendError(res, {}, 404));

            case 6:
              _context5.next = 8;
              return link.update(req.body);

            case 8:
              update = _context5.sent;

              if (update) {
                _context5.next = 11;
                break;
              }

              throw new Error("Something went wrong");

            case 11:
              return _context5.abrupt("return", _basecontroller["default"].sendResponse(res, link.toJSON(), "Link updated"));

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              return _context5.abrupt("return", _basecontroller["default"].sendError(res, _context5.t0));

            case 18:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 14]]);
    }))();
  },

  /**
   *
   * Method to delete and reset parent links
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  "delete": function _delete(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var link, sub_linksLinks, updateParent;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _link["default"].findOne({
                where: {
                  id: req.params.id
                }
              })["catch"](console.log);

            case 3:
              link = _context6.sent;

              if (link) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", _basecontroller["default"].sendError(res, {}, 404));

            case 6:
              _context6.next = 8;
              return _link["default"].findAll({
                where: {
                  parent_link: link.id
                }
              })["catch"](console.log);

            case 8:
              sub_linksLinks = _context6.sent;
              if (sub_linksLinks.length) updateParent = sub_linksLinks.map(function (res) {
                return res.update({
                  parent_link: null
                });
              });
              _context6.next = 12;
              return Promise.all(updateParent)["catch"](console.log);

            case 12:
              _context6.next = 14;
              return link.destroy();

            case 14:
              if (_context6.sent) {
                _context6.next = 16;
                break;
              }

              throw new Error("Something went wrong");

            case 16:
              return _context6.abrupt("return", _basecontroller["default"].sendResponse(res, link.toJSON(), "Link deleted"));

            case 19:
              _context6.prev = 19;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", _basecontroller["default"].sendError(res, _context6.t0));

            case 22:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 19]]);
    }))();
  }
};
var _default = LinkController;
exports["default"] = _default;