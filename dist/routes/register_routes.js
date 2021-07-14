"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authcontroller = _interopRequireDefault(require("../controller/authcontroller"));

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
router.use("/upload_file", _upload.imageUpload.single("image"), _uploadcontroller["default"].uploadImage);
router.use("*", function (req, res) {
  res.send("No resource found").status(404);
});
var _default = router;
exports["default"] = _default;