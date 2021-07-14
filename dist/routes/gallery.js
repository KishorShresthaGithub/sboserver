"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _gallerycontroller = _interopRequireDefault(require("../controller/gallerycontroller"));

var _upload = require("../helpers/upload");

var _authenticate_token = _interopRequireDefault(require("../middleware/authenticate_token"));

var _gallery = require("../middleware/requests/gallery");

var _validation = require("../middleware/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/", _gallerycontroller["default"].index);
router.get("/:gallery", _gallerycontroller["default"].show);
router.post("/", _authenticate_token["default"], _upload.imageUpload.array("images"), _gallery.createValidation, _validation.validationMid, _gallerycontroller["default"].save);
router.put("/:gallery", _authenticate_token["default"], _upload.imageUpload.single("image"), _gallery.updateValidation, _validation.validationMid, _gallerycontroller["default"].update);
router["delete"]("/:gallery", _authenticate_token["default"], _gallerycontroller["default"].destroy);
router.post("/:gallery/galleryImage", _authenticate_token["default"], _upload.imageUpload.single("image"), _gallerycontroller["default"].addSingle);
router.put("/:gallery/galleryImage/:gallery_id", _authenticate_token["default"], _upload.imageUpload.single("image"), _gallerycontroller["default"].updateSingle);
router["delete"]("/:gallery/galleryImage/:gallery_id", _authenticate_token["default"], _gallerycontroller["default"].deleteSingle);
var _default = router;
exports["default"] = _default;