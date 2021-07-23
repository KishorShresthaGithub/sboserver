"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _Slidercontroller = _interopRequireDefault(require("../controller/Slidercontroller"));

var _upload = require("../helpers/upload");

var _authenticate_token = _interopRequireDefault(require("../middleware/authenticate_token"));

var _slider = require("../middleware/requests/slider");

var _validation = require("../middleware/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/", _Slidercontroller["default"].index);
router.get("/:slug", _Slidercontroller["default"].show);
router.post("/", _authenticate_token["default"], _upload.imageUpload.single("image"), _slider.createValidation, _validation.validationMid, _Slidercontroller["default"].save);
router.put("/:id", _authenticate_token["default"], _upload.imageUpload.single("image"), _slider.updateValidation, _validation.validationMid, _Slidercontroller["default"].update);
router["delete"]("/:id", _authenticate_token["default"], _Slidercontroller["default"].destroy);
var _default = router;
exports["default"] = _default;