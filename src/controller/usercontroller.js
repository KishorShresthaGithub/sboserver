import User, { Role } from "../models/user";
import BaseController from "./basecontroller";
import bcrypt from "bcrypt";

const UserController = {
  /**
   * Method to get all users from store
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Callback} _next
   * @returns
   */
  async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll({ order: [["created_at", "DESC"]] });

      return BaseController.sendResponse(res, users, "Users Listing");
    } catch (error) {
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to get user from string_id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Callback} _next
   * @returns
   */
  async getUser(req, res, next) {
    try {
      const { user_string_id } = req.params;

      const user = await User.findOne({
        where: {
          string_id: user_string_id,
        },
      });
      return BaseController.sendResponse(res, user.toJSON(), "User Listing");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to get current logged in user
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Callback} _next
   * @returns
   */
  async getCurrentUser(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          string_id: req.user.string_id,
        },
      });

      return BaseController.sendResponse(res, user.toJSON(), "Current User");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to update user details
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Callback} next
   */
  async updateUser(req, res, next) {
    try {
      //get string id from params and if params not defined get user string id
      const user_string_id = req.params.user_string_id || req.user.string_id;

      //TODO handle request body empty in validation
      //TODO handle email uniqueness when update
      //getting request except role
      const { role, password, email, ...request } = req.body;

      console.log(request);

      let passwordHash;

      if (password) {
        passwordHash = await bcrypt.hash(password, 15);
        request.password = passwordHash;
      }

      //find user
      const user = await User.findOne({
        where: {
          string_id: user_string_id,
        },
      });

      if (!user)
        return BaseController.sendError(res, {}, "User does not exist", 400);

      if (email !== user.email) {
        request.email = email;
      }
      //update user
      const update = await user.update(request);
      if (!update) throw Error({ errors: "Something went wrong" });

      return BaseController.sendResponse(res, user.toJSON(), "User updated");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(
        res,
        error.errors,
        "Something went wrong"
      );
    }
  },
  /**
   * Method to delete user
   *
   * @param {Request} req
   * @param {Response} res
   * @param {*} next
   * @returns
   */
  async deleteUser(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          string_id: req.params.user_string_id,
        },
      });

      const deletedUser = await user.destroy();

      if (!deletedUser) throw new Error({ errors: "Something went wrong" });

      return BaseController.sendResponse(
        res,
        user.toJSON(),
        "User successfully deleted"
      );
    } catch (error) {
      return BaseController.sendError(res, error.errors);
    }
  },
};

export default UserController;
