"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sharp = _interopRequireDefault(require("sharp"));

var _basecontroller = _interopRequireDefault(require("./basecontroller"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _url = _interopRequireDefault(require("./../helpers/url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UploadController = {
  /**
   * Method to upload image from controller
   *
   * @param {Request} req
   * @returns null|| image url
   */
  uploadImage: function uploadImage(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var ref, url;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (req.file) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.sendStatus(400));

            case 3:
              _context.next = 5;
              return UploadController.compressImage(req.file)["catch"](console.log);

            case 5:
              ref = _context.sent;
              url = _url["default"]; //image url

              url += "/public/images/".concat(ref);
              return _context.abrupt("return", _basecontroller["default"].sendResponse(res, {
                image_url: url
              }, "Image uploaded"));

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", _basecontroller["default"].sendError(res, _context.t0));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 11]]);
    }))();
  },

  /**
   * Method to compress uploaded image
   * Deletes original file after compression
   *
   * @param {Multer File instance} file
   * @returns
   */
  compressImage: function compressImage(file) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var filename, destination, ref;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              filename = file.filename, destination = file.destination;
              ref = "".concat(filename.split(".")[0], ".webp");
              /**
               * Performing readfile to extract buffer for sharp module
               * When using multer the file is already uploaded
               */

              _fs["default"].readFile(file.path, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, data) {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!err) {
                            _context2.next = 3;
                            break;
                          }

                          UploadController.unlinkFile(file.path)["catch"](console.log);
                          return _context2.abrupt("return");

                        case 3:
                          _context2.next = 5;
                          return (0, _sharp["default"])(data).webp({
                            quality: 20
                          }).toFile(_path["default"].resolve(destination, ref))["catch"](function (err) {
                            _fs["default"].unlink(file.path, function (err) {
                              if (err) {
                                console.log(err);
                                return;
                              }

                              console.log("Uploaded: File compressed and original file deleted");
                            });
                          });

                        case 5:
                          //unlink original file
                          UploadController.unlinkFile(file.path)["catch"](console.log);

                        case 6:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x, _x2) {
                  return _ref.apply(this, arguments);
                };
              }());

              return _context3.abrupt("return", ref);

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              return _context3.abrupt("return");

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }))();
  },

  /**
   * Method to upload multiple image
   *
   * @param {Request} req
   * @returns null|| image url
   */
  uploadImages: function uploadImages(files) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var upload, urls, urlarray;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;

              if (files) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return");

            case 3:
              //mapping all compression promises
              upload = files.map(function (file) {
                return UploadController.compressImage(file)["catch"](console.log);
              });
              _context4.next = 6;
              return Promise.all(upload);

            case 6:
              urls = _context4.sent;
              urlarray = urls.map(function (url) {
                return "".concat(_url["default"], "/public/images/").concat(url);
              });
              return _context4.abrupt("return", urlarray);

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              return _context4.abrupt("return");

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 11]]);
    }))();
  },

  /**
   * Method to upload multiple image
   *
   * @param {Request} req
   * @returns null|| image url
   */
  uploadPDF: function uploadPDF(file) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var filename, url;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;

              if (file) {
                _context5.next = 3;
                break;
              }

              return _context5.abrupt("return");

            case 3:
              filename = file.filename;
              url = _url["default"]; //pdf url

              url += "/public/pdf/".concat(filename);
              return _context5.abrupt("return", {
                pdf_url: url
              });

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              return _context5.abrupt("return", _basecontroller["default"].sendError(res, _context5.t0));

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
    }))();
  },

  /**
   * Unlink file
   *
   * @param {*} file
   * @returns
   */
  unlinkFile: function unlinkFile(file) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;

              if (_fs["default"].existsSync(file)) {
                _context6.next = 4;
                break;
              }

              console.log("File not found");
              return _context6.abrupt("return");

            case 4:
              _fs["default"].unlink(file, function (err) {
                if (err) {
                  console.log(err, " Something went wrong");
                  return;
                }

                console.log(file + " File has been deleted");
                return "File deleted";
              });

              return _context6.abrupt("return", true);

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);
              return _context6.abrupt("return");

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 8]]);
    }))();
  },

  /**
   * Method to delete files from file url
   *
   * @param {Url of model} url
   * @returns
   */
  unlinkUrl: function unlinkUrl(url) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var image, imagepath, filepath;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              image = new URL(url);

              if (!(image.pathname === "/public/placeholder_logo.svg")) {
                _context7.next = 4;
                break;
              }

              return _context7.abrupt("return", true);

            case 4:
              //remove empty strings
              imagepath = image.pathname.split("/").filter(Boolean);
              imagepath = [__dirname, "../"].concat(_toConsumableArray(imagepath));
              filepath = imagepath.reduce(function (a, i) {
                return _path["default"].join(a, i);
              });
              _context7.next = 9;
              return UploadController.unlinkFile(filepath);

            case 9:
              return _context7.abrupt("return", _context7.sent);

            case 12:
              _context7.prev = 12;
              _context7.t0 = _context7["catch"](0);
              console.log(_context7.t0);
              return _context7.abrupt("return", null);

            case 16:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 12]]);
    }))();
  }
};
var _default = UploadController;
exports["default"] = _default;