"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _link = _interopRequireDefault(require("../models/link"));

var _basecontroller = _interopRequireDefault(require("./basecontroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var LinkController = {
  index: function index(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _ret;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var dblinks, links, temp, _loop, i;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _link["default"].findAll({
                          order: [["parent_link", "ASC"]],
                          raw: true
                        });

                      case 2:
                        dblinks = _context.sent;
                        links = _toConsumableArray(dblinks);
                        links = links.map(function (e) {
                          e.sub_links = [];
                          return e;
                        });
                        temp = [];

                        _loop = function _loop(i) {
                          if (links[i].parent_link === null) temp.push(links[i]);else {
                            var parent = links.find(function (res) {
                              return res.id === links[i].parent_link;
                            });
                            links[i].link = "".concat(parent.link, "/").concat(links[i].link);
                            parent.sub_links.push(links[i]);
                          }
                        };

                        for (i = 0; i < links.length; i++) {
                          _loop(i);
                        }

                        temp = temp.sort(function (a, b) {
                          return parseInt(a.position) - parseInt(b.position);
                        });
                        return _context.abrupt("return", {
                          v: _basecontroller["default"].sendResponse(res, temp, "Navigation")
                        });

                      case 10:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })(), "t0", 2);

            case 2:
              _ret = _context2.t0;

              if (!(_typeof(_ret) === "object")) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", _ret.v);

            case 5:
              _context2.next = 11;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t1 = _context2["catch"](0);
              console.log(_context2.t1);
              return _context2.abrupt("return", _basecontroller["default"].sendError(res, _context2.t1));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }))();
  },
  all: function all(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _ret2;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              return _context4.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var dblinks, links, temp, _loop2, i;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _link["default"].findAll({
                          order: [["parent_link", "ASC"]],
                          raw: true
                        });

                      case 2:
                        dblinks = _context3.sent;
                        links = _toConsumableArray(dblinks);
                        temp = [];

                        _loop2 = function _loop2(i) {
                          if (links[i].parent_link !== null) {
                            var parent = links.find(function (res) {
                              return res.id === links[i].parent_link;
                            });
                            links[i].link = "".concat(parent.link, "/").concat(links[i].link);
                          }

                          temp.push(links[i]);
                        };

                        for (i = 0; i < links.length; i++) {
                          _loop2(i);
                        }

                        temp = temp.sort(function (a, b) {
                          return parseInt(a.position) - parseInt(b.position);
                        });
                        return _context3.abrupt("return", {
                          v: _basecontroller["default"].sendResponse(res, temp, "Navigation")
                        });

                      case 9:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              })(), "t0", 2);

            case 2:
              _ret2 = _context4.t0;

              if (!(_typeof(_ret2) === "object")) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", _ret2.v);

            case 5:
              _context4.next = 11;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t1 = _context4["catch"](0);
              console.log(_context4.t1);
              return _context4.abrupt("return", _basecontroller["default"].sendError(res, _context4.t1));

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 7]]);
    }))();
  },
  show: function show(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var dblink, link;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _link["default"].findOne({
                where: {
                  id: req.params.id
                },
                raw: true
              });

            case 3:
              dblink = _context5.sent;

              if (dblink) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", _basecontroller["default"].sendError(res, null, "Link not found", 404));

            case 6:
              link = _objectSpread({}, dblink);

              if (!link.parent_link) {
                _context5.next = 12;
                break;
              }

              _context5.next = 10;
              return _link["default"].findOne({
                where: {
                  id: link.parent_link
                },
                raw: true
              });

            case 10:
              link.parent = _context5.sent;
              delete link.parent_link;

            case 12:
              return _context5.abrupt("return", _basecontroller["default"].sendResponse(res, link, "Single link listing"));

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
  },
  save: function save(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var link;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _link["default"].create(req.body);

            case 3:
              link = _context6.sent;

              if (link) {
                _context6.next = 6;
                break;
              }

              throw Error("Somthing went wrong");

            case 6:
              return _context6.abrupt("return", _basecontroller["default"].sendResponse(res, link.toJSON(), "Link saved"));

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", _basecontroller["default"].sendError(res, _context6.t0));

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 9]]);
    }))();
  },
  update: function update(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var link, update;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _link["default"].findOne({
                where: {
                  id: req.params.id
                }
              });

            case 3:
              link = _context7.sent;

              if (link) {
                _context7.next = 6;
                break;
              }

              return _context7.abrupt("return", _basecontroller["default"].sendError(res, {}, 404));

            case 6:
              _context7.next = 8;
              return link.update(req.body);

            case 8:
              update = _context7.sent;

              if (update) {
                _context7.next = 11;
                break;
              }

              throw new Error("Something went wrong");

            case 11:
              return _context7.abrupt("return", _basecontroller["default"].sendResponse(res, link.toJSON(), "Link updated"));

            case 14:
              _context7.prev = 14;
              _context7.t0 = _context7["catch"](0);
              console.log(_context7.t0);
              return _context7.abrupt("return", _basecontroller["default"].sendError(res, _context7.t0));

            case 18:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 14]]);
    }))();
  },
  "delete": function _delete(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var link, sub_linksLinks, updateParent;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _link["default"].findOne({
                where: {
                  id: req.params.id
                }
              })["catch"](console.log);

            case 3:
              link = _context8.sent;

              if (link) {
                _context8.next = 6;
                break;
              }

              return _context8.abrupt("return", _basecontroller["default"].sendError(res, {}, 404));

            case 6:
              _context8.next = 8;
              return _link["default"].findAll({
                where: {
                  parent_link: link.id
                }
              })["catch"](console.log);

            case 8:
              sub_linksLinks = _context8.sent;
              if (sub_linksLinks.length) updateParent = sub_linksLinks.map(function (res) {
                return res.update({
                  parent_link: null
                });
              });
              _context8.next = 12;
              return Promise.all(updateParent)["catch"](console.log);

            case 12:
              _context8.next = 14;
              return link.destroy();

            case 14:
              if (_context8.sent) {
                _context8.next = 16;
                break;
              }

              throw new Error("Something went wrong");

            case 16:
              return _context8.abrupt("return", _basecontroller["default"].sendResponse(res, link.toJSON(), "Link deleted"));

            case 19:
              _context8.prev = 19;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", _basecontroller["default"].sendError(res, _context8.t0));

            case 22:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 19]]);
    }))();
  }
};
var _default = LinkController;
exports["default"] = _default;