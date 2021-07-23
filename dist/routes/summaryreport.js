"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _upload = require("../helpers/upload");

var _authenticate_token = _interopRequireDefault(require("../middleware/authenticate_token"));

var _summaryreport = require("../middleware/requests/summaryreport");

var _validation = require("../middleware/validation");

var _SummaryReportcontroller = _interopRequireDefault(require("./../controller/SummaryReportcontroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/", _SummaryReportcontroller["default"].summaryReport);
router.get("/all", _SummaryReportcontroller["default"].index);
router.get("/:id/download", _SummaryReportcontroller["default"].download);
router.get("/:slug", _SummaryReportcontroller["default"].show);
router.post("/", _authenticate_token["default"], _upload.pdfUpload.single("pdf_link"), _summaryreport.createValidation, _validation.validationMid, _SummaryReportcontroller["default"].save);
router.put("/:id", _authenticate_token["default"], _upload.pdfUpload.single("pdf_link"), _summaryreport.updateValidation, _validation.validationMid, _SummaryReportcontroller["default"].update);
router["delete"]("/:id", _authenticate_token["default"], _SummaryReportcontroller["default"].destroy);
var _default = router;
exports["default"] = _default;