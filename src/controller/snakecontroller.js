import BaseController from "./basecontroller";
import UploadController from "./uploadcontroller";

import url from "../helpers/url";
import { Op } from "sequelize";
import Snake from "../models/snake";

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
      const { limit } = req.query;

      let options = {
        order: [["name", "ASC"]],
      };

      if (limit) options.limit = parseInt(limit);

      const Snakes = await Snake.findAll(options);

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
      const { id } = req.params;

      const ev = await Snake.findOne({
        where: {
          id,
        },
      });

      if (!ev) return BaseController.sendError(res, {}, "Snake not found", 404);

      //   const { title, date, location, time, description } = req.body;
      const file = req.file || null;

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
        "Snake successfully updated"
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
      const { id } = req.params;

      const ev = await Snake.findOne({
        where: {
          id,
        },
      });

      if (!ev) return BaseController.sendError(res, {}, "Snake not found", 404);

      if (!(await UploadController.unlinkUrl(ev.image)))
        console.log(ev.image + " not deleted");

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
