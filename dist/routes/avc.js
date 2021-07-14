"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authenticate_token = _interopRequireDefault(require("../middleware/authenticate_token"));

var _avcenter = require("../middleware/requests/avcenter");

var _validation = require("../middleware/validation");

var _avccontroller = _interopRequireDefault(require("./../controller/avccontroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Routes for antivenom centers
var router = (0, _express.Router)();
router.get("/", _avccontroller["default"].index); //getting disctricts

router.get("/districts", _avccontroller["default"].districts);
router.get("/districts/:district", _avccontroller["default"].district);
router.get("/:slug", _avccontroller["default"].show);
router.post("/", _authenticate_token["default"], _avcenter.createValidation, _validation.validationMid, _avccontroller["default"].save);
router.put("/:slug", _authenticate_token["default"], _avcenter.updateValidation, _validation.validationMid, _avccontroller["default"].update);
router["delete"]("/:slug", _authenticate_token["default"], _avccontroller["default"].destroy);
var _default = router;
exports["default"] = _default;