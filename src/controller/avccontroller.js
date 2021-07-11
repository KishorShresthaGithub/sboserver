//controller for antivenom centers

import AVCenter from "../models/avcenter";
import BaseController from "./basecontroller";

const AVCcontroller = {
  /**
   * Method to list all AVCenters
   * can pass limit query to limit the number of AVCenters
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

      const avc = await AVCenter.findAll(options);

      return BaseController.sendResponse(res, avc, "AVCenters listing");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to return districts from antivenom centers with number of centers
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async districts(req, res) {
    try {
      const districts = await AVCenter.count({
        attributes: ["district"],
        group: "district",
      });

      console.log(districts);

      return BaseController.sendResponse(res, districts, "District listing");
    } catch (error) {
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to return antivenom centers from one district
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async district(req, res) {
    try {
      const avc = await AVCenter.findAll({
        where: { district: req.params.district },
      });

      console.log("disctricts");
      return BaseController.sendResponse(res, avc, "District listing");
    } catch (error) {
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

      const ev = await AVCenter.findOne({
        where: {
          slug,
        },
      });
      console.log(ev);

      if (!ev)
        return BaseController.sendError(res, {}, "AVCenter not found", 404);

      return BaseController.sendResponse(res, ev.toJSON(), "AVCenter listing");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to save AVCenters to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async save(req, res) {
    try {
      const ev = await AVCenter.create(req.body, {
        skip: ["slug"],
      });

      if (!ev) throw Error();

      return BaseController.sendResponse(
        res,
        ev.toJSON(),
        "AVCenter successfully added"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },

  /**
   * Method to update AVCenters to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async update(req, res) {
    try {
      //TODO move to validation middleware
      const { slug } = req.params;

      const ev = await AVCenter.findOne({
        where: {
          slug,
        },
      });

      if (!ev)
        return BaseController.sendError(res, {}, "AVCenter not found", 404);

      const updateConfirm = await ev.update(req.body);

      if (!updateConfirm) throw Error();

      return BaseController.sendResponse(
        res,
        ev.toJSON(),
        "AVCenter successfully added"
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

      const ev = await AVCenter.findOne({
        where: {
          slug,
        },
      });

      if (!ev)
        return BaseController.sendError(res, {}, "AVCenter not found", 404);

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

export default AVCcontroller;
