"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _basecontroller = _interopRequireDefault(require("./basecontroller"));

var _uploadcontroller = _interopRequireDefault(require("./uploadcontroller"));

var _summaryreport = _interopRequireDefault(require("./../models/summaryreport"));

var _url = _interopRequireDefault(require("./../helpers/url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SummaryReportController = {
  /**
   * Method to list all SummaryReports
   * can pass limit query to limit the number of SummaryReports
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  index: function index(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var SummaryReports;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _summaryreport["default"].findAll({
                order: [["created_at", "DESC"]]
              });

            case 3:
              SummaryReports = _context.sent;
              return _context.abrupt("return", _basecontroller["default"].sendResponse(res, SummaryReports, "SummaryReports listing"));

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
  summaryReport: function summaryReport(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var ev;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _summaryreport["default"].findOne({
                where: {
                  show: true
                }
              });

            case 3:
              ev = _context2.sent;

              if (ev) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", _basecontroller["default"].sendError(res, {}, "SummaryReport not found", 404));

            case 6:
              return _context2.abrupt("return", _basecontroller["default"].sendResponse(res, ev.toJSON(), "SummaryReport listing"));

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              return _context2.abrupt("return", _basecontroller["default"].sendError(res, _context2.t0));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
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
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var id, ev;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              id = req.params.id;
              _context3.next = 4;
              return _summaryreport["default"].findOne({
                where: {
                  id: id
                }
              });

            case 4:
              ev = _context3.sent;

              if (ev) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", _basecontroller["default"].sendError(res, {}, "SummaryReport not found", 404));

            case 7:
              return _context3.abrupt("return", _basecontroller["default"].sendResponse(res, ev.toJSON(), "SummaryReport listing"));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              return _context3.abrupt("return", _basecontroller["default"].sendError(res, _context3.t0));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 10]]);
    }))();
  },

  /**
   * Method to save SummaryReports to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  save: function save(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _file, input, ref, ev;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _file = req.file || null;
              input = req.body;

              if (!_file) {
                _context4.next = 8;
                break;
              }

              _context4.next = 6;
              return _uploadcontroller["default"].uploadPDF(_file);

            case 6:
              ref = _context4.sent;
              input = _objectSpread(_objectSpread({}, input), {}, {
                pdf_link: ref.pdf_url
              });

            case 8:
              _context4.next = 10;
              return _summaryreport["default"].create(input);

            case 10:
              ev = _context4.sent;

              if (ev) {
                _context4.next = 13;
                break;
              }

              throw Error();

            case 13:
              return _context4.abrupt("return", _basecontroller["default"].sendResponse(res, ev.toJSON(), "SummaryReport successfully added"));

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              return _context4.abrupt("return", _basecontroller["default"].sendError(res, _context4.t0));

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 16]]);
    }))();
  },

  /**
   * Method to update SummaryReports to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  update: function update(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var id, ev, _file2, updatedata, ref, updateConfirm;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              //TODO move to validation middleware
              id = req.params.id;
              _context5.next = 4;
              return _summaryreport["default"].findOne({
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

              return _context5.abrupt("return", _basecontroller["default"].sendError(res, {}, "SummaryReport not found", 404));

            case 7:
              //   const { title, date, location, time, description } = req.body;
              _file2 = req.file || null; //TODO validation empty body;

              updatedata = req.body;

              if (!_file2) {
                _context5.next = 14;
                break;
              }

              _context5.next = 12;
              return _uploadcontroller["default"].uploadPDF(_file2);

            case 12:
              ref = _context5.sent;
              updatedata = _objectSpread(_objectSpread({}, updatedata), {}, {
                pdf_link: ref.pdf_url
              });

            case 14:
              _context5.next = 16;
              return ev.update(updatedata);

            case 16:
              updateConfirm = _context5.sent;

              if (updateConfirm) {
                _context5.next = 19;
                break;
              }

              throw Error();

            case 19:
              return _context5.abrupt("return", _basecontroller["default"].sendResponse(res, ev.toJSON(), "SummaryReport successfully added"));

            case 22:
              _context5.prev = 22;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              return _context5.abrupt("return", _basecontroller["default"].sendError(res, _context5.t0));

            case 26:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 22]]);
    }))();
  },

  /**
   * Method to delete resource
   *
   * @param {Request} req
   * @param {Response} res
   */
  destroy: function destroy(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var id, ev, deleteData;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              id = req.params.id;
              _context6.next = 4;
              return _summaryreport["default"].findOne({
                where: {
                  id: id
                }
              });

            case 4:
              ev = _context6.sent;

              if (ev) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", _basecontroller["default"].sendError(res, {}, "SummaryReport not found", 404));

            case 7:
              _context6.next = 9;
              return ev.destroy();

            case 9:
              deleteData = _context6.sent;

              if (deleteData) {
                _context6.next = 12;
                break;
              }

              throw Error("Something went wrong when deleteing item");

            case 12:
              return _context6.abrupt("return", _basecontroller["default"].sendResponse(res, ev.toJSON(), "Item Successfully deleted"));

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
  download: function download(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var id, ev, image, imagepath, filepath;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              id = req.params.id;
              _context7.next = 4;
              return _summaryreport["default"].findOne({
                where: {
                  id: id
                }
              });

            case 4:
              ev = _context7.sent;

              if (ev) {
                _context7.next = 7;
                break;
              }

              return _context7.abrupt("return", _basecontroller["default"].sendError(res, {}, "SummaryReport not found", 404));

            case 7:
              image = new URL(_url["default"]);
              imagepath = image.pathname.split("/").filter(Boolean);
              imagepath = [__dirname, "../"].concat(_toConsumableArray(imagepath));
              filepath = imagepath.reduce(function (a, i) {
                return path.join(a, i);
              });

              if (fs.existsSync(file)) {
                _context7.next = 14;
                break;
              }

              console.log("File not found");
              return _context7.abrupt("return", _basecontroller["default"].sendError(res, {}, "File not found", 500));

            case 14:
              return _context7.abrupt("return", res.download(filepath));

            case 17:
              _context7.prev = 17;
              _context7.t0 = _context7["catch"](0);
              console.log(_context7.t0);
              return _context7.abrupt("return", _basecontroller["default"].sendError(res, _context7.t0));

            case 21:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 17]]);
    }))();
  }
};
var _default = SummaryReportController;
exports["default"] = _default;