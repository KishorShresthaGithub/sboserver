import sqlize from "../database";
import BaseController from "./basecontroller";

const AuthController = {
  async login(req, res) {
    try {
      const { email, password, c_password } = req.body;


      return BaseController.sendResponse(res, [], "Login Successful");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, {}, "Something went wrong");
    }
  },

  async register(req, res) {
    const data = req.body;
  },
};

export default AuthController;
