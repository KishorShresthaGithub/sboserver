import BaseController from "./basecontroller";
import UploadController from "./uploadcontroller";
import Event from "./../models/event";
import url from "./../helpers/url";
import { Op } from "sequelize";

const EventController = {
  /**
   * Method to list all events
   * can pass limit query to limit the number of events
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async index(req, res) {
    try {
      const { limit } = req.query;

      let options = {
        order: [["created_at", "DESC"]],
      };

      if (limit) options.limit = parseInt(limit);
      const events = await Event.findAll(options);

      return BaseController.sendResponse(res, events, "Events listing");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to list all events
   * can pass limit query to limit the number of events
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async upcoming(req, res) {
    try {
      const { limit } = req.query;

      let options = {
        order: [["start_date", "ASC"]],
      };

      if (limit) options.limit = parseInt(limit);

      const events = await Event.findAll({
        where: {
          start_date: { [Op.gte]: new Date() },
        },
        ...options,
      });

      return BaseController.sendResponse(res, events, "Events listing");
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

      const ev = await Event.findOne({
        where: {
          slug,
        },
      });

      if (!ev) return BaseController.sendError(res, {}, "Event not found", 404);

      return BaseController.sendResponse(res, ev.toJSON(), "Event listing");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to save Events to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async save(req, res) {
    try {
      const file = req.file || null;
      let input = req.body;

      if (file) {
        let imageUrl = url;
        const ref = await UploadController.compressImage(file);
        //image url
        imageUrl += `/public/images/${ref}`;
        input = { ...input, image: imageUrl };
      }

      const ev = await Event.create(input, {
        skip: ["slug"],
      });

      if (!ev) throw Error();

      return BaseController.sendResponse(
        res,
        ev.toJSON(),
        "Event successfully added"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },

  /**
   * Method to update Events to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async update(req, res) {
    try {
      //TODO move to validation middleware
      const { id } = req.params;

      const ev = await Event.findOne({
        where: {
          id,
        },
      });

      if (!ev) return BaseController.sendError(res, {}, "Event not found", 404);

      //   const { title, date, location, time, description } = req.body;
      const file = req.file || null;

      if (file && !(await UploadController.unlinkUrl(ev.image)))
        console.log("File not replaced");

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
        "Event successfully updated"
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

      const ev = await Event.findOne({
        where: {
          id,
        },
      });

      if (!ev) return BaseController.sendError(res, {}, "Event not found", 404);

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

export default EventController;
