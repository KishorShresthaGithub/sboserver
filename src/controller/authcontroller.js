import BaseController from "./basecontroller";

const AuthController = {
  async login(req, res) {
    const data = req.body;
    return BaseController.sendResponse(res, data, "Login Successful");
  },
};

export default AuthController;
