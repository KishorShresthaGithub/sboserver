import BaseController from "./basecontroller";
import UploadController from "./uploadcontroller";
import Event from "./../models/event";
import url from "./../helpers/url";

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
      console.error(error);
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
      //   const { title, date, location, time, description } = req.body;
      const file = req.file || null;

      let imageUrl;
      if (file) {
        imageUrl = url;
        const ref = await UploadController.compressImage(file);
        //image url
        imageUrl += `/public/images/${ref}`;
      }

      const ev = await Event.create(
        { ...req.body, image: imageUrl },
        {
          skip: ["slug"],
        }
      );

      if (!ev) throw Error();

      return BaseController.sendResponse(res, ev, "Event successfully added");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
};

export default EventController;
