import BaseController from "./basecontroller";
import UploadController from "./uploadcontroller";
import SummaryReport from "./../models/SummaryReport";
import url from "./../helpers/url";

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

  async summaryReport(req, res) {
    try {
      const ev = await SummaryReport.findOne({
        where: {
          show: true,
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
   * Method to show resource
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async show(req, res) {
    try {
      const { slug } = req.params;

      const ev = await SummaryReport.findOne({
        where: {
          id: slug,
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
      //TODO move to validation middleware
      const { slug } = req.params;

      const ev = await SummaryReport.findOne({
        where: {
          id: slug,
        },
      });

      if (!ev)
        return BaseController.sendError(
          res,
          {},
          "SummaryReport not found",
          404
        );

      //   const { title, date, location, time, description } = req.body;
      const file = req.file || null;
      //TODO validation empty body;
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
        "SummaryReport successfully added"
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

      const ev = await SummaryReport.findOne({
        where: {
          id: slug,
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
};

export default SummaryReportController;
