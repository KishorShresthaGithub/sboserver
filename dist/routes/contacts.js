"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _contactcontroller = _interopRequireDefault(require("../controller/contactcontroller"));

var _authenticate_token = _interopRequireDefault(require("../middleware/authenticate_token"));

var _contact = require("../middleware/requests/contact");

var _validation = require("../middleware/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/", _authenticate_token["default"], _contactcontroller["default"].index);
router.get("/:id", _authenticate_token["default"], _contactcontroller["default"].show);
router.post("/", _contact.createValidation, _validation.validationMid, _contactcontroller["default"].save);
var _default = router;
exports["default"] = _default;