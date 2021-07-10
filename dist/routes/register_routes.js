"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authcontroller = _interopRequireDefault(require("../controller/authcontroller"));

var _authenticate_token = _interopRequireDefault(require("../middleware/authenticate_token"));

var _users = _interopRequireDefault(require("./users"));

var _events = _interopRequireDefault(require("./events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/", function (req, res) {
  return res.send("Snakebite org API server").status(200);
});
router.post("/login", _authcontroller["default"].login);
router.post("/register", _authcontroller["default"].register);
router.use("/users", _authenticate_token["default"], _users["default"]);
router.use("/events", _events["default"]); // router.use("/gallery", galleryRouter);

router.use("*", function (req, res) {
  res.send("No resource found").status(404);
});
var _default = router;
exports["default"] = _default;