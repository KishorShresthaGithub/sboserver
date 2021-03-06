import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { Role } from "../models/user";
import BaseController from "./basecontroller";
import { validationResult } from "express-validator";

const AuthController = {
  /**
   * Method to login user
   *
   * @param {Request} req
   * @param {Response} res
   * @returns Response
   */

  async login(req, res) {
    //TODO: add login validation
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user)
        return BaseController.sendError(
          res,
          { errors: ["User not found"] },
          "User not found",
          401
        );

      if (!(await bcrypt.compare(password, user.password)))
        return BaseController.sendError(
          res,
          { errors: " User Credentials do not match " },
          "User Credentials do not match",
          401
        );

      const token = AuthController.generateAccessToken(user.toJSON());

      return BaseController.sendResponse(res, token, "Login Successful");
    } catch (error) {
      return BaseController.sendError(res, error.errors);
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
    //TODO: add login validation and sanitize strings
    try {
      const { first_name, last_name, email, password } = req.body;

      const passwordHash = await bcrypt.hash(password, 15);

      const user = await User.create(
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: passwordHash,
        },
        { skip: ["string_id"] }
      );

      const accessToken = AuthController.generateAccessToken(user.toJSON());

      return BaseController.sendResponse(res, accessToken, "User registered");
    } catch (error) {
      return BaseController.sendError(res, error.errors);
    }
  },

  generateAccessToken(user) {
    const token = jwt.sign(user, process.env.JWT_TOKEN_SECRET, {
      expiresIn: 7 * 24 * 60 * 60,
    });

    return {
      access_token: token,
    };
  },

  /**
   * Method to change user role
   *
   * @param {Request} req
   * @param {Response} res
   * @returns  Resoponse
   */
  async changeUserRole(req, res) {
    try {
      const { user_string_id } = req.params;
      const { role } = req.body;

      const userDb = await User.findOne({
        where: {
          string_id: user_string_id,
        },
      });

      const updated = await userDb.update({
        role: Role.get(role),
      });

      if (!updated)
        return BaseController.sendError(res, {}, "Something went wrong", 500);

      return BaseController.sendResponse(
        res,
        userDb.toJSON(),
        "Changed User Role"
      );
    } catch (error) {
      return BaseController.sendError(res, error.errors);
    }
  },
};

export default AuthController;
