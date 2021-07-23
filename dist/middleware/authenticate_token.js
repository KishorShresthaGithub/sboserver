"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = authenticateToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _basecontroller = _interopRequireDefault(require("../controller/basecontroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * Method to verify the access token and add user to request
 *
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 * @returns
 */
function authenticateToken(req, res, next) {
  var authHeader = req.headers["authorization"];
  if (!authHeader) return _basecontroller["default"].sendError(res, {}, "No token provided", 401);
  var token = authHeader.split(" ")[1];
  if (token === null) return _basecontroller["default"].sendError(res, {}, "Not logged in", 401);

  _jsonwebtoken["default"].verify(token, process.env.JWT_TOKEN_SECRET, function (err, payload) {
    if (err) {
      console.log(err);
      return _basecontroller["default"].sendError(res, {}, "Invalid token", 403);
    }

    req.user = payload;
    next();
  });
}