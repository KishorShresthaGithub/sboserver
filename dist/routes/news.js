"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _Newscontroller = _interopRequireDefault(require("../controller/Newscontroller"));

var _upload = require("../helpers/upload");

var _authenticate_token = _interopRequireDefault(require("../middleware/authenticate_token"));

var _news = require("../middleware/requests/news");

var _validation = require("../middleware/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/", _Newscontroller["default"].index);
router.get("/:slug", _Newscontroller["default"].show);
router.post("/", _authenticate_token["default"], _upload.imageUpload.single("image"), _news.createValidation, _validation.validationMid, _Newscontroller["default"].save);
router.put("/:slug", _authenticate_token["default"], _upload.imageUpload.single("image"), _news.updateValidation, _validation.validationMid, _Newscontroller["default"].update);
router["delete"]("/:slug", _authenticate_token["default"], _Newscontroller["default"].destroy);
var _default = router;
exports["default"] = _default;