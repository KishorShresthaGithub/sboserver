"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Role = void 0;

var _cryptoRandomString = _interopRequireDefault(require("crypto-random-string"));

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var User = /*#__PURE__*/function (_Model) {
  _inherits(User, _Model);

  var _super = _createSuper(User);

  function User() {
    _classCallCheck(this, User);

    return _super.apply(this, arguments);
  }

  _createClass(User, [{
    key: "toJSON",
    value: function toJSON() {
      var values = Object.assign({}, this.get());
      delete values.password;
      return values;
    }
  }]);

  return User;
}(_sequelize.Model);

var Role = Object.freeze({
  ADMIN: 1,
  USER: 2,
  get: function get(value) {
    var role = null;

    switch (value) {
      case "admin":
        role = this.ADMIN;
        break;

      case "user":
        role = this.USER;
        break;

      default:
        role = this.USER;
    }

    return role;
  },
  getString: function getString(value) {
    var role = null;

    switch (value) {
      case this.ADMIN:
        role = "admin";
        break;

      case this.USER:
        role = "user";
        break;

      default:
        role = "user";
    }

    return role;
  }
});
exports.Role = Role;
User.init({
  string_id: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  first_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: _sequelize.DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: Role.USER
  }
}, {
  sequelize: _database["default"],
  paranoid: true,
  tableName: "users",
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at"
});
User.beforeCreate(function (user, options) {
  user.string_id = (0, _cryptoRandomString["default"])({
    length: 10,
    type: "distinguishable"
  });
}); // User.sync({ force: true });

var _default = User;
exports["default"] = _default;