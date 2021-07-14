"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _eventcontroller = _interopRequireDefault(require("../controller/eventcontroller"));

var _upload = require("../helpers/upload");

var _authenticate_token = _interopRequireDefault(require("../middleware/authenticate_token"));

var _events = require("../middleware/requests/events");

var _validation = require("../middleware/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/", _eventcontroller["default"].index);
router.get("/:slug", _eventcontroller["default"].show);
router.post("/", _authenticate_token["default"], _upload.imageUpload.single("image"), _events.createValidation, _validation.validationMid, _eventcontroller["default"].save);
router.put("/:slug", _authenticate_token["default"], _upload.imageUpload.single("image"), _events.updateValidation, _validation.validationMid, _eventcontroller["default"].update);
router["delete"]("/:slug", _authenticate_token["default"], _eventcontroller["default"].destroy);
var _default = router;
exports["default"] = _default;