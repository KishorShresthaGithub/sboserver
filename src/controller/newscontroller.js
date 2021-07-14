import BaseController from "./basecontroller";
import UploadController from "./uploadcontroller";
import News from "../models/News";
import url from "../helpers/url";

const NewsController = {
  /**
   * Method to list all Newss
   * can pass limit query to limit the number of Newss
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
      const Newss = await News.findAll(options);

      return BaseController.sendResponse(res, Newss, "Newss listing");
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

      const ev = await News.findOne({
        where: {
          slug,
        },
      });

      if (!ev) return BaseController.sendError(res, {}, "News not found", 404);

      return BaseController.sendResponse(res, ev.toJSON(), "News listing");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to save Newss to database
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

      const ev = await News.create(
        { ...req.body, image: imageUrl },
        {
          skip: ["slug"],
        }
      );

      if (!ev) throw Error();

      return BaseController.sendResponse(
        res,
        ev.toJSON(),
        "News successfully added"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },

  /**
   * Method to update Newss to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async update(req, res) {
    try {
      //TODO move to validation middleware
      const { id } = req.params;

      const ev = await News.findOne({
        where: {
          id,
        },
      });

      if (!ev) return BaseController.sendError(res, {}, "News not found", 404);

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
        "News successfully added"
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

      const ev = await News.findOne({
        where: {
          id,
        },
      });

      if (!ev) return BaseController.sendError(res, {}, "News not found", 404);

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

export default NewsController;
