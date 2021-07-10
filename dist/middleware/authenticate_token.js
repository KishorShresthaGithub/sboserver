"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = authenticateToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

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
  var token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  _jsonwebtoken["default"].verify(token, process.env.JWT_TOKEN_SECRET, function (err, payload) {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }

    req.user = payload;
    next();
  });
}