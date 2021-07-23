"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authcontroller = _interopRequireDefault(require("../controller/authcontroller"));

var _basecontroller = _interopRequireDefault(require("../controller/basecontroller"));

var _uploadcontroller = _interopRequireDefault(require("../controller/uploadcontroller"));

var _upload = require("../helpers/upload");

var _authenticate_token = _interopRequireDefault(require("../middleware/authenticate_token"));

var _auth = require("../middleware/requests/auth");

var _validation = require("../middleware/validation");

var _avc = _interopRequireDefault(require("./avc"));

var _contacts = _interopRequireDefault(require("./contacts"));

var _events = _interopRequireDefault(require("./events"));

var _gallery = _interopRequireDefault(require("./gallery"));

var _links = _interopRequireDefault(require("./links"));

var _news = _interopRequireDefault(require("./news"));

var _slider = _interopRequireDefault(require("./slider"));

var _snakes = _interopRequireDefault(require("./snakes"));

var _summaryreport = _interopRequireDefault(require("./summaryreport"));

var _users = _interopRequireDefault(require("./users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.get("/", function (req, res) {
  return res.send("Snakebite org API server").status(200);
});
router.post("/login", _auth.loginValidation, _validation.validationMid, _authcontroller["default"].login);
router.post("/register", _auth.authRegisterValidation, _validation.validationMid, _authcontroller["default"].register);
router.use("/users", _authenticate_token["default"], _users["default"]);
router.use("/events", _events["default"]);
router.use("/contacts", _contacts["default"]);
router.use("/news", _news["default"]);
router.use("/avcenters", _avc["default"]); // router.use("/gallery", galleryRouter);

router.use("/links", _links["default"]);
router.use("/sliders", _slider["default"]);
router.use("/snakes", _snakes["default"]);
router.use("/gallery", _gallery["default"]);
router.use("/summaryreport", _summaryreport["default"]);
router.post("/upload_file", _authenticate_token["default"], _upload.imageUpload.single("image"), _uploadcontroller["default"].uploadImage);
router["delete"]("/unlink", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var unlink;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _uploadcontroller["default"].unlinkUrl(req.body.url);

          case 2:
            unlink = _context.sent;

            if (unlink) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", _basecontroller["default"].sendError(res, {}, "File not unlinked"));

          case 5:
            return _context.abrupt("return", _basecontroller["default"].sendResponse(res, {}, "File has been deleted"));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.use("*", function (req, res) {
  res.send("No resource found").status(404);
});
var _default = router;
exports["default"] = _default;