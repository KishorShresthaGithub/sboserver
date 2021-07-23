"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _url = _interopRequireDefault(require("../helpers/url"));

var _gallery = _interopRequireDefault(require("../models/gallery"));

var _galleryimage = _interopRequireDefault(require("../models/galleryimage"));

var _basecontroller = _interopRequireDefault(require("./basecontroller"));

var _uploadcontroller = _interopRequireDefault(require("./uploadcontroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var GalleryController = {
  index: function index(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var gallery;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _gallery["default"].findAll({
                include: [{
                  model: _galleryimage["default"]
                }]
              });

            case 3:
              gallery = _context.sent;
              return _context.abrupt("return", _basecontroller["default"].sendResponse(res, gallery, ""));

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", _basecontroller["default"].sendError(res, _context.t0));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }))();
  },
  show: function show(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var gallery;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _gallery["default"].findOne({
                where: {
                  id: req.params.gallery
                },
                include: _galleryimage["default"]
              });

            case 3:
              gallery = _context2.sent;

              if (gallery) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", _basecontroller["default"].sendError(res, {}, "Gallery not found", 404));

            case 6:
              return _context2.abrupt("return", _basecontroller["default"].sendResponse(res, gallery, ""));

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              return _context2.abrupt("return", _basecontroller["default"].sendError(res, _context2.t0));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }))();
  },
  save: function save(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _req$files, gallery, images, addImages;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              if ((_req$files = req.files) !== null && _req$files !== void 0 && _req$files.length) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", _basecontroller["default"].sendError(res, null, "Please upload images", 400));

            case 3:
              _context3.next = 5;
              return _gallery["default"].create(req.body, {
                skip: "slug"
              });

            case 5:
              gallery = _context3.sent;

              if (gallery) {
                _context3.next = 8;
                break;
              }

              throw new Error();

            case 8:
              _context3.next = 10;
              return _uploadcontroller["default"].uploadImages(req.files);

            case 10:
              images = _context3.sent;

              if (images !== null && images !== void 0 && images.length) {
                _context3.next = 13;
                break;
              }

              throw Error();

            case 13:
              addImages = images.map(function (image) {
                return _galleryimage["default"].create({
                  gallery_id: gallery.id,
                  image: image
                })["catch"](function (res) {
                  return console.log(res);
                });
              });
              _context3.next = 16;
              return Promise.all(addImages);

            case 16:
              return _context3.abrupt("return", _basecontroller["default"].sendResponse(res, gallery.toJSON(), "Gallery Saved"));

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              return _context3.abrupt("return", _basecontroller["default"].sendError(res, _context3.t0));

            case 23:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 19]]);
    }))();
  },
  update: function update(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var gallery, updateConfirm;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _gallery["default"].findOne({
                where: {
                  id: req.params.gallery
                }
              });

            case 3:
              gallery = _context4.sent;

              if (gallery) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", _basecontroller["default"].sendError(res, {}, "Gallery not found", 404));

            case 6:
              _context4.next = 8;
              return gallery.update(req.body);

            case 8:
              updateConfirm = _context4.sent;

              if (updateConfirm) {
                _context4.next = 11;
                break;
              }

              throw new Error();

            case 11:
              return _context4.abrupt("return", _basecontroller["default"].sendResponse(res, gallery, "Gallery updated"));

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              return _context4.abrupt("return", _basecontroller["default"].sendError(res, _context4.t0));

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 14]]);
    }))();
  },
  destroy: function destroy(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var gallery;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _gallery["default"].findOne({
                where: {
                  id: req.params.gallery
                }
              });

            case 3:
              gallery = _context5.sent;

              if (gallery) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", _basecontroller["default"].sendError(res, {}, "Gallery not found", 404));

            case 6:
              _context5.next = 8;
              return gallery.destroy();

            case 8:
              if (_context5.sent) {
                _context5.next = 10;
                break;
              }

              throw new Error();

            case 10:
              return _context5.abrupt("return", _basecontroller["default"].sendResponse(res, gallery, "Gallery deleted"));

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              return _context5.abrupt("return", _basecontroller["default"].sendError(res, _context5.t0));

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 13]]);
    }))();
  },
  addSingle: function addSingle(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var gallery, image, galleryImage;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _gallery["default"].findOne({
                where: {
                  id: req.params.gallery
                }
              });

            case 3:
              gallery = _context6.sent;

              if (gallery) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", _basecontroller["default"].sendError(res, {}, "Gallery not found", 404));

            case 6:
              if (req.file) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt("return", _basecontroller["default"].sendError(res, {}, "No image uploaded", 400));

            case 8:
              _context6.next = 10;
              return _uploadcontroller["default"].compressImage(req.file);

            case 10:
              image = _context6.sent;

              if (image) {
                _context6.next = 13;
                break;
              }

              throw Error("Image not compressed");

            case 13:
              image = "".concat(_url["default"], "/public/images/").concat(image);
              _context6.next = 16;
              return _galleryimage["default"].create({
                gallery_id: gallery.id,
                image: image
              });

            case 16:
              galleryImage = _context6.sent;

              if (galleryImage) {
                _context6.next = 19;
                break;
              }

              throw Error("Something went wrong when adding image");

            case 19:
              return _context6.abrupt("return", _basecontroller["default"].sendResponse(res, galleryImage, "Image Uploaded"));

            case 22:
              _context6.prev = 22;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);
              return _context6.abrupt("return", _basecontroller["default"].sendError(res, _context6.t0));

            case 26:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 22]]);
    }))();
  },
  updateSingle: function updateSingle(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var galleryImage, image;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _galleryimage["default"].findOne({
                where: {
                  id: req.params.gallery_id,
                  gallery_id: req.params.gallery
                }
              });

            case 3:
              galleryImage = _context7.sent;

              if (galleryImage) {
                _context7.next = 6;
                break;
              }

              return _context7.abrupt("return", _basecontroller["default"].sendError(res, {}, "Gallery not found", 404));

            case 6:
              if (req.file) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt("return", _basecontroller["default"].sendError(res, {}, "No image uploaded", 400));

            case 8:
              _context7.next = 10;
              return _uploadcontroller["default"].compressImage(req.file);

            case 10:
              image = _context7.sent;

              if (image) {
                _context7.next = 13;
                break;
              }

              throw Error("Image not compressed");

            case 13:
              image = "".concat(_url["default"], "/public/images/").concat(image);
              _context7.next = 16;
              return galleryImage.update({
                image: image
              });

            case 16:
              if (_context7.sent) {
                _context7.next = 18;
                break;
              }

              throw Error("Something went wrong when adding image");

            case 18:
              return _context7.abrupt("return", _basecontroller["default"].sendResponse(res, galleryImage, "Image Updated"));

            case 21:
              _context7.prev = 21;
              _context7.t0 = _context7["catch"](0);
              console.log(_context7.t0);
              return _context7.abrupt("return", _basecontroller["default"].sendError(res, _context7.t0));

            case 25:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 21]]);
    }))();
  },
  deleteSingle: function deleteSingle(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var galleryImage;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _galleryimage["default"].findOne({
                where: {
                  id: req.params.gallery_id,
                  gallery_id: req.params.gallery
                }
              });

            case 3:
              galleryImage = _context8.sent;

              if (galleryImage) {
                _context8.next = 6;
                break;
              }

              return _context8.abrupt("return", _basecontroller["default"].sendError(res, {}, "Gallery not found", 404));

            case 6:
              if (_uploadcontroller["default"].unlinkUrl(galleryImage.image)) {
                _context8.next = 8;
                break;
              }

              throw Error("File not deleted");

            case 8:
              if (galleryImage.destroy()) {
                _context8.next = 10;
                break;
              }

              throw new Error("Something went wrong when deleting");

            case 10:
              return _context8.abrupt("return", _basecontroller["default"].sendResponse(res, galleryImage, "image deleted"));

            case 13:
              _context8.prev = 13;
              _context8.t0 = _context8["catch"](0);
              console.log(_context8.t0);
              return _context8.abrupt("return", _basecontroller["default"].sendError(res, _context8.t0));

            case 17:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 13]]);
    }))();
  }
};
var _default = GalleryController;
exports["default"] = _default;