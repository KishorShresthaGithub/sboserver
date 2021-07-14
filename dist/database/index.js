"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var database = process.env.DB_NAME;
var username = process.env.DB_USERNAME;
var password = process.env.DB_PASSWORD;
var sqlize = new _sequelize.Sequelize(database, username, password, {
  dialect: "mysql",
  host: "localhost",
  logging: false
});
var _default = sqlize;
exports["default"] = _default;