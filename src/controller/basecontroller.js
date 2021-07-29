const BaseController = {
  sendResponse(res, data, message, status) {
    return res.status(status || 200).json({
      data: data,
      message: message,
      success: true,
    });
  },

  sendError(res, error, errorMessage, status) {
    return res.status(status || 500).json({
      error: error,
      message: errorMessage || "Something went wrong",
      success: false,
    });
  },
};

export default BaseController;
