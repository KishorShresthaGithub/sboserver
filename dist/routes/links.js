"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _linkcontroller = _interopRequireDefault(require("../controller/linkcontroller"));

var _authenticate_token = _interopRequireDefault(require("../middleware/authenticate_token"));

var _link = require("../middleware/requests/link");

var _validation = require("../middleware/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/", _linkcontroller["default"].index);
router.get("/all", _linkcontroller["default"].index);
router.get("/:url", _linkcontroller["default"].show);
router.post("/", _authenticate_token["default"], _link.createValidation, _validation.validationMid, _linkcontroller["default"].save);
router.put("/:id", _authenticate_token["default"], _link.updateValidation, _validation.validationMid, _linkcontroller["default"].update);
router["delete"]("/:id", _linkcontroller["default"]["delete"]);
var _default = router;
exports["default"] = _default;