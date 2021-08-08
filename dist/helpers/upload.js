"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pdfUpload = exports.pdf_storage = exports.imageUpload = exports.image_storage = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _md = _interopRequireDefault(require("md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var image_storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    var pa = _path["default"].resolve(__dirname, "../public", "images");

    if (!_fs["default"].existsSync(pa)) {
      _fs["default"].mkdirSync(pa, {
        recursive: true
      });
    }

    cb(null, pa);
  },
  filename: function filename(req, file, cb) {
    var filename = (0, _md["default"])(file.fieldname + "" + Date.now());
    filename += ".".concat(file.originalname.split(".")[1]); //extension

    cb(null, filename);
  }
}); //image


exports.image_storage = image_storage;
var imageUpload = (0, _multer["default"])({
  storage: image_storage,
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

var pdf_storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    var pa = _path["default"].resolve(__dirname, "../public", "pdf");

    if (!_fs["default"].existsSync(pa)) {
      _fs["default"].mkdirSync(pa, {
        recursive: true
      });
    }

    cb(null, pa);
  },
  filename: function filename(req, file, cb) {
    var filename = (0, _md["default"])(file.originalname + "" + Date.now());
    filename += ".".concat(file.originalname.split(".")[1]); //extension

    cb(null, filename);
  }
}); //pdf


exports.pdf_storage = pdf_storage;
var pdfUpload = (0, _multer["default"])({
  storage: pdf_storage,
  limits: {
    fileSize: 8 * 1024 * 1024
  },
  fileFilter: function fileFilter(req, file, cb) {
    var filetype = file.mimetype === "application/pdf";

    if (!filetype) {
      cb(new Error("Please upload an pdf"), false);
    }

    cb(null, true);
  }
});
exports.pdfUpload = pdfUpload;