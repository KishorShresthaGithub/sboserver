"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _path = _interopRequireDefault(require("path"));

var _upload = require("../helpers/upload");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();

var pa = _path["default"].resolve(__dirname, "../public", "images");

router.post("/", _upload.imageUpload.single("image"), GalleryController.uploadImage);
router.post("/multiple", _upload.imageUpload.array("images"), GalleryController.uploadImages);
var _default = router;
exports["default"] = _default;