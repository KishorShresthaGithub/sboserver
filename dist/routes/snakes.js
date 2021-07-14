"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _upload = require("../helpers/upload");

var _authenticate_token = _interopRequireDefault(require("../middleware/authenticate_token"));

var _snake = require("../middleware/requests/snake");

var _validation = require("../middleware/validation");

var _snakecontroller = _interopRequireDefault(require("./../controller/snakecontroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/", _snakecontroller["default"].index);
router.get("/:slug", _snakecontroller["default"].show);
router.post("/", _authenticate_token["default"], _upload.imageUpload.single("image"), _snake.createValidation, _validation.validationMid, _snakecontroller["default"].save);
router.put("/:slug", _authenticate_token["default"], _upload.imageUpload.single("image"), _snake.updateValidation, _validation.validationMid, _snakecontroller["default"].update);
router["delete"]("/:slug", _authenticate_token["default"], _snakecontroller["default"].destroy);
var _default = router;
exports["default"] = _default;