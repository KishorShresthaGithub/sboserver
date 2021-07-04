const BaseController = {
  sendResponse(res, data, message, status) {
    return res
      .json({
        data: data,
        message: message,
        success: true,
      })
      .status(status || 200);
  },

  sendError(res, data, error, status) {
    return res
      .json({ data: data, error: error, success: false })
      .status(status || 500);
  },
};

export default BaseController;
