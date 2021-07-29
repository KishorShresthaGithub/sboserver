import BaseController from "./basecontroller";
import UploadController from "./uploadcontroller";
import Slider from "../models/slider";
import url from "../helpers/url";
import { Op } from "sequelize";

const SliderController = {
  /**
   * Method to list all Sliders
   * can pass limit query to limit the number of Sliders
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async index(req, res) {
    try {
      const { limit } = req.query;

      let options = {
        order: [["position", "ASC"]],
      };

      if (limit) options.limit = parseInt(limit);

      const Sliders = await Slider.findAll(options);

      return BaseController.sendResponse(res, Sliders, "Sliders listing");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  async hero(req, res) {
    try {
      const { limit } = req.query;

      let options = {
        order: [["position", "ASC"]],
      };

      if (limit) options.limit = parseInt(limit);

      const Sliders = await Slider.findAll({
        where: { position: { [Op.and]: [{ [Op.not]: null }, { [Op.gt]: 0 }] } },
        ...options,
      });

      return BaseController.sendResponse(res, Sliders, "Sliders listing");
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
      const ev = await Slider.findOne({
        where: {
          id: slug,
        },
      });

      if (!ev)
        return BaseController.sendError(res, {}, "Slider not found", 404);

      return BaseController.sendResponse(res, ev.toJSON(), "Slider listing");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to save Sliders to database
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
      } else {
        return BaseController.sendError(
          res,
          {},
          "No image uploaded for slider",
          400
        );
      }

      const ev = await Slider.create({ ...req.body, image: imageUrl });

      if (!ev) throw Error();

      return BaseController.sendResponse(
        res,
        ev.toJSON(),
        "Slider successfully added"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },

  /**
   * Method to update Sliders to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async update(req, res) {
    try {
      const { id } = req.params;

      const ev = await Slider.findOne({
        where: {
          id,
        },
      });

      if (!ev)
        return BaseController.sendError(res, {}, "Slider not found", 404);

      //   const { title, date, location, time, description } = req.body;
      const file = req.file || null;

      if (file && !(await UploadController.unlinkUrl(ev.image)))
        console.log("File has not been deleted");

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
        "Slider successfully updated"
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
      const { id } = req.params;

      const ev = await Slider.findOne({
        where: {
          id,
        },
      });

      if (!ev)
        return BaseController.sendError(res, {}, "Slider not found", 404);

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

export default SliderController;
