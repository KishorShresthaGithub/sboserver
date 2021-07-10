"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var BaseController = {
  sendResponse: function sendResponse(res, data, message, status) {
    return res.status(status || 200).json({
      data: data,
      message: message,
      success: true
    });
  },
  sendError: function sendError(res, error, errorMessage, status) {
    return res.status(status || 500).json({
      error: error,
      message: errorMessage || "Something went wrong",
      success: false
    });
  }
};
var _default = BaseController;
exports["default"] = _default;