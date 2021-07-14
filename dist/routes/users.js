"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _usercontroller = _interopRequireDefault(require("../controller/usercontroller"));

var _check_role = _interopRequireDefault(require("../middleware/check_role"));

var _auth = require("../middleware/requests/auth");

var _validation = require("../middleware/validation");

var _authcontroller = _interopRequireDefault(require("./../controller/authcontroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
/* GET users listing. */

router.get("/", (0, _check_role["default"])(["admin"]), _usercontroller["default"].getAllUsers);
router.get("/current", _usercontroller["default"].getCurrentUser);
router.put("/current", _auth.authUpdateValidation, _validation.validationMid, _usercontroller["default"].updateUser);
router.get("/:user_string_id", _usercontroller["default"].getUser);
router.put("/:user_string_id", (0, _check_role["default"])(["admin"]), _auth.authUpdateValidation, _validation.validationMid, _usercontroller["default"].updateUser);
router["delete"]("/:user_string_id", (0, _check_role["default"])(["admin"]), _usercontroller["default"].deleteUser);
router.put("/:user_string_id/change_role", (0, _check_role["default"])(["admin"]), _authcontroller["default"].changeUserRole);
var _default = router;
exports["default"] = _default;