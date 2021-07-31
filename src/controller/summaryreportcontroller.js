import BaseController from "./basecontroller";
import UploadController from "./uploadcontroller";
import SummaryReport from "./../models/summaryreport";
import url from "./../helpers/url";
import path from "path";
import fs from "fs";

const SummaryReportController = {
  /**
   * Method to list all SummaryReports
   * can pass limit query to limit the number of SummaryReports
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async index(req, res) {
    try {
      const SummaryReports = await SummaryReport.findAll({
        order: [["created_at", "DESC"]],
      });

      return BaseController.sendResponse(
        res,
        SummaryReports,
        "SummaryReports listing"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to list summary report with show true
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async summaryReport(req, res) {
    try {
      const ev = await SummaryReport.findOne({
        where: {
          show: true,
        },
        order: [["created_at", "DESC"]],
      });

      if (!ev)
        return BaseController.sendError(
          res,
          {},
          "SummaryReport not found",
          404
        );

      return BaseController.sendResponse(
        res,
        ev.toJSON(),
        "SummaryReport listing"
      );
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

      const ev = await SummaryReport.findOne({
        where: {
          id,
        },
      });

      if (!ev)
        return BaseController.sendError(
          res,
          {},
          "SummaryReport not found",
          404
        );

      return BaseController.sendResponse(
        res,
        ev.toJSON(),
        "SummaryReport listing"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to save SummaryReports to database
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
        const ref = await UploadController.uploadPDF(file);
        input = { ...input, pdf_link: ref.pdf_url };
      } else {
        return BaseController.sendError(res, {}, "No pdf uploaded");
      }

      const ev = await SummaryReport.create(input);
      if (!ev) throw Error();

      return BaseController.sendResponse(
        res,
        ev.toJSON(),
        "SummaryReport successfully added"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },

  /**
   * Method to update SummaryReports to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const ev = await SummaryReport.findOne({
        where: {
          id,
        },
      });

      if (!ev)
        return BaseController.sendError(
          res,
          {},
          "SummaryReport not found",
          404
        );

      const file = req.file || null;
      let updatedata = req.body;

      if (file) {
        const ref = await UploadController.uploadPDF(file);
        updatedata = { ...updatedata, pdf_link: ref.pdf_url };
      }

      const updateConfirm = await ev.update(updatedata);

      if (!updateConfirm) throw Error();

      return BaseController.sendResponse(
        res,
        ev.toJSON(),
        "SummaryReport successfully updated"
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

      const ev = await SummaryReport.findOne({
        where: {
          id,
        },
      });

      if (!ev)
        return BaseController.sendError(
          res,
          {},
          "SummaryReport not found",
          404
        );

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

  async download(req, res) {
    try {
      const { id } = req.params;
      const ev = await SummaryReport.findOne({
        where: {
          id,
        },
      });

      if (!ev)
        return BaseController.sendError(
          res,
          {},
          "SummaryReport not found",
          404
        );

      let image = new URL(ev.pdf_link);
      let imagepath = image.pathname.split("/").filter(Boolean);
      imagepath = [__dirname, "../", ...imagepath];

      let filepath = imagepath.reduce((a, i) => path.join(a, i));

      if (!fs.existsSync(filepath)) {
        console.log("File not found");
        return BaseController.sendError(res, {}, "File not found", 500);
      }

      return res.download(filepath);
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
};

export default SummaryReportController;
