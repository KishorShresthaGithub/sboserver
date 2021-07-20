import BaseController from "./basecontroller";
import UploadController from "./uploadcontroller";
import Slider from "../models/Slider";
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
      const Sliders = await Slider.findAll({
        where: { position: { [Op.not]: null } },
        order: [["position", "ASC"]],
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
      const { id } = req.params;

      const ev = await Slider.findOne({
        where: {
          id,
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
      //TODO move to validation middleware
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
        "Slider successfully added"
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

      const ev = await Slider.findOne({
        where: {
          id,
        },
      });

      if (!ev)
        return BaseController.sendError(res, {}, "Slider not found", 404);

      if (!(await UploadController.unlinkUrl(ev.image)))
        throw new Error("File not deleted");

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
