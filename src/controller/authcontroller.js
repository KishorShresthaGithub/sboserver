import sqlize from "../database";
import User from "../models/user";
import BaseController from "./basecontroller";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AuthController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      return BaseController.sendResponse(res, [], "Login Successful");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, {}, "Something went wrong");
    }
  },
  /**
   *
   * Method to register users
   *
   * @param {Request} req
   * @param {Response} res
   * @returns Response
   */
  async register(req, res) {
    try {
      const { first_name, last_name, email, password, c_password } = req.body;

      const passwordHash = await bcrypt.hash(password, 15);

      const user = await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: passwordHash,
      });

      const accessToken = AuthController.generateAccessToken(user.toJSON());

      return BaseController.sendResponse(
        res,
        {
          access_token: accessToken,
          email: user.email,
        },
        "User registered"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(
        res,
        error.errors,
        "Something went wrong",
        500
      );
    }
  },

  generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_TOKEN_SECRET, {
      expiresIn: 7 * 24 * 60 * 60,
    });
  },
};

export default AuthController;
