"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageUpload = exports.storage = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _md = _interopRequireDefault(require("md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    var pa = _path["default"].resolve(__dirname, "../public", "images");

    if (!_fs["default"].existsSync(pa)) {
      _fs["default"].mkdirSync(pa);
    }

    cb(null, pa);
  },
  filename: function filename(req, file, cb) {
    var filename = (0, _md["default"])(file.fieldname + "" + Date.now());
    filename += ".".concat(file.originalname.split(".")[1]); //extension

    cb(null, filename);
  }
}); //image


exports.storage = storage;
var imageUpload = (0, _multer["default"])({
  storage: storage,
  fileFilter: function fileFilter(req, file, cb) {
    var filetype = file.mimetype === "image/jpeg";
    filetype |= file.mimetype === "image/png";
    filetype |= file.mimetype === "image/svg";
    filetype |= file.mimetype === "image/webp";

    if (!filetype) {
      cb(new Error("Please upload an image"), false);
    }

    cb(null, true);
  }
});
exports.imageUpload = imageUpload;