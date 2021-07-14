"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _uploadcontroller = _interopRequireDefault(require("../controller/uploadcontroller"));

var _upload = require("../helpers/upload");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post("/", _upload.imageUpload.single("image"), _uploadcontroller["default"].uploadImage);
router.post("/multiple", _upload.imageUpload.array("images"), _uploadcontroller["default"].uploadImages);
router.post("/pdf", _upload.pdfUpload.single("pdf"), _uploadcontroller["default"].uploadPDF);
var _default = router;
exports["default"] = _default;