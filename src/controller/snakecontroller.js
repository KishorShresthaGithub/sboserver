import BaseController from "./basecontroller";
import UploadController from "./uploadcontroller";
import Snaker from "../models/Snake";
import url from "../helpers/url";
import { Op } from "sequelize";
import Snake from "../models/Snake";

const SnakeController = {
  /**
   * Method to list all Snakes
   * can pass limit query to limit the number of Snakes
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async index(req, res) {
    try {
      const Snakes = await Snake.findAll({
        order: [["name", "ASC"]],
      });

      return BaseController.sendResponse(res, Snakes, "Snakes listing");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to show resource
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async show(req, res) {
    try {
      const { slug } = req.params;

      const ev = await Snake.findOne({
        where: {
          id: slug,
        },
      });

      if (!ev) return BaseController.sendError(res, {}, "Snake not found", 404);

      return BaseController.sendResponse(res, ev.toJSON(), "Snake listing");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to save Snakes to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async save(req, res) {
    try {
      const file = req.file || null;

      let imageUrl;

      if (file) {
        imageUrl = url;
        const ref = await UploadController.compressImage(file);
        //image url
        imageUrl += `/public/images/${ref}`;
      }

      const ev = await Snake.create({ ...req.body, image: imageUrl });

      if (!ev) throw Error();

      return BaseController.sendResponse(
        res,
        ev.toJSON(),
        "Snake successfully added"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },

  /**
   * Method to update Snakes to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async update(req, res) {
    try {
      //TODO move to validation middleware
      const { slug } = req.params;

      const ev = await Snake.findOne({
        where: {
          id: slug,
        },
      });

      if (!ev) return BaseController.sendError(res, {}, "Snake not found", 404);

      //   const { title, date, location, time, description } = req.body;
      const file = req.file || null;
      //TODO validation empty body;
      let updatedata = req.body;

      let imageUrl;

      if (file) {
        imageUrl = url;
        const ref = await UploadController.compressImage(file);
        //image url
        imageUrl += `/public/images/${ref}`;

        updatedata = { ...updatedata, image: imageUrl };
      }

      const updateConfirm = await ev.update(updatedata);

      if (!updateConfirm) throw Error();

      return BaseController.sendResponse(
        res,
        ev.toJSON(),
        "Snake successfully added"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to delete resource
   *
   * @param {Request} req
   * @param {Response} res
   */
  async destroy(req, res) {
    try {
      //TODO move to validation middleware
      const { slug } = req.params;

      const ev = await Snake.findOne({
        where: {
          id: slug,
        },
      });

      if (!ev) return BaseController.sendError(res, {}, "Snake not found", 404);

      let deleteData = await ev.destroy();

      if (!deleteData) throw Error("Something went wrong when deleteing item");

      return BaseController.sendResponse(
        res,
        ev.toJSON(),
        "Item Successfully deleted"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
};

export default SnakeController;
