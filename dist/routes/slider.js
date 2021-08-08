"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _slidercontroller = _interopRequireDefault(require("../controller/slidercontroller"));

var _upload = require("../helpers/upload");

var _authenticate_token = _interopRequireDefault(require("../middleware/authenticate_token"));

var _slider = require("../middleware/requests/slider");

var _validation = require("../middleware/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/", _slidercontroller["default"].index);
router.get("/hero", _slidercontroller["default"].hero);
router.get("/:slug", _slidercontroller["default"].show);
router.post("/", _authenticate_token["default"], _upload.imageUpload.single("image"), _slider.createValidation, _validation.validationMid, _slidercontroller["default"].save);
router.put("/:id", _authenticate_token["default"], _upload.imageUpload.single("image"), _slider.updateValidation, _validation.validationMid, _slidercontroller["default"].update);
router["delete"]("/:id", _authenticate_token["default"], _slidercontroller["default"].destroy);
var _default = router;
exports["default"] = _default;