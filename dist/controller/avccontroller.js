"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _avcenter = _interopRequireDefault(require("../models/avcenter"));

var _basecontroller = _interopRequireDefault(require("./basecontroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var AVCcontroller = {
  /**
   * Method to list all AVCenters
   * can pass limit query to limit the number of AVCenters
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  index: function index(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var limit, options, avc;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              limit = req.query.limit;
              options = {
                order: [["name", "ASC"]]
              };
              if (limit) options.limit = parseInt(limit);
              _context.next = 6;
              return _avcenter["default"].findAll(options);

            case 6:
              avc = _context.sent;
              return _context.abrupt("return", _basecontroller["default"].sendResponse(res, avc, "AVCenters listing"));

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", _basecontroller["default"].sendError(res, _context.t0));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 10]]);
    }))();
  },

  /**
   * Method to return districts from antivenom centers with number of centers
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  districts: function districts(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var districts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _avcenter["default"].count({
                attributes: ["district"],
                group: "district"
              });

            case 3:
              districts = _context2.sent;
              console.log(districts);
              return _context2.abrupt("return", _basecontroller["default"].sendResponse(res, districts, "District listing"));

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _basecontroller["default"].sendError(res, _context2.t0));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8]]);
    }))();
  },

  /**
   * Method to return antivenom centers from one district
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  district: function district(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var avc;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _avcenter["default"].findAll({
                where: {
                  district: req.params.district
                }
              });

            case 3:
              avc = _context3.sent;
              console.log("disctricts");
              return _context3.abrupt("return", _basecontroller["default"].sendResponse(res, avc, "District listing"));

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", _basecontroller["default"].sendError(res, _context3.t0));

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 8]]);
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
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var slug, ev;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              slug = req.params.slug;
              _context4.next = 4;
              return _avcenter["default"].findOne({
                where: {
                  slug: slug
                }
              });

            case 4:
              ev = _context4.sent;
              console.log(ev);

              if (ev) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", _basecontroller["default"].sendError(res, {}, "AVCenter not found", 404));

            case 8:
              return _context4.abrupt("return", _basecontroller["default"].sendResponse(res, ev.toJSON(), "AVCenter listing"));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              return _context4.abrupt("return", _basecontroller["default"].sendError(res, _context4.t0));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 11]]);
    }))();
  },

  /**
   * Method to save AVCenters to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  save: function save(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var ev;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _avcenter["default"].create(req.body, {
                skip: ["slug"]
              });

            case 3:
              ev = _context5.sent;

              if (ev) {
                _context5.next = 6;
                break;
              }

              throw Error();

            case 6:
              return _context5.abrupt("return", _basecontroller["default"].sendResponse(res, ev.toJSON(), "AVCenter successfully added"));

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              return _context5.abrupt("return", _basecontroller["default"].sendError(res, _context5.t0));

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
    }))();
  },

  /**
   * Method to update AVCenters to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  update: function update(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var slug, ev, updateConfirm;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              //TODO move to validation middleware
              slug = req.params.slug;
              _context6.next = 4;
              return _avcenter["default"].findOne({
                where: {
                  slug: slug
                }
              });

            case 4:
              ev = _context6.sent;

              if (ev) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", _basecontroller["default"].sendError(res, {}, "AVCenter not found", 404));

            case 7:
              _context6.next = 9;
              return ev.update(req.body);

            case 9:
              updateConfirm = _context6.sent;

              if (updateConfirm) {
                _context6.next = 12;
                break;
              }

              throw Error();

            case 12:
              return _context6.abrupt("return", _basecontroller["default"].sendResponse(res, ev.toJSON(), "AVCenter successfully added"));

            case 15:
              _context6.prev = 15;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);
              return _context6.abrupt("return", _basecontroller["default"].sendError(res, _context6.t0));

            case 19:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 15]]);
    }))();
  },

  /**
   * Method to delete resource
   *
   * @param {Request} req
   * @param {Response} res
   */
  destroy: function destroy(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var slug, ev, deleteData;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              //TODO move to validation middleware
              slug = req.params.slug;
              _context7.next = 4;
              return _avcenter["default"].findOne({
                where: {
                  slug: slug
                }
              });

            case 4:
              ev = _context7.sent;

              if (ev) {
                _context7.next = 7;
                break;
              }

              return _context7.abrupt("return", _basecontroller["default"].sendError(res, {}, "AVCenter not found", 404));

            case 7:
              _context7.next = 9;
              return ev.destroy();

            case 9:
              deleteData = _context7.sent;

              if (deleteData) {
                _context7.next = 12;
                break;
              }

              throw Error("Something went wrong when deleteing item");

            case 12:
              return _context7.abrupt("return", _basecontroller["default"].sendResponse(res, ev.toJSON(), "Item Successfully deleted"));

            case 15:
              _context7.prev = 15;
              _context7.t0 = _context7["catch"](0);
              console.log(_context7.t0);
              return _context7.abrupt("return", _basecontroller["default"].sendError(res, _context7.t0));

            case 19:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 15]]);
    }))();
  }
};
var _default = AVCcontroller;
exports["default"] = _default;