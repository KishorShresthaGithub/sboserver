import Contact from "../models/contact";
import BaseController from "./basecontroller";

const ContactController = {
  /**
   * Method to display all contacts
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async index(req, res) {
    try {
      const contacts = await Contact.findAll({
        order: [["created_at", "DESC"]],
      });

      return BaseController.sendResponse(
        res,
        contacts,
        "Contact message listing"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to display single contact
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async show(req, res) {
    try {
      const contact = await Contact.findOne({ where: { id: req.params.id } });

      if (!contact)
        return BaseController.sendError(res, {}, "Contact not found", 404);

      return BaseController.sendResponse(
        res,
        contact.toJSON(),
        "Contact listing"
      );
    } catch (error) {
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Method to save contact to database
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async save(req, res) {
    try {
      //TODO validate contact

      const contact = await Contact.create(req.body);

      if (!contact) throw new Error();

      return BaseController.sendResponse(
        res,
        contact.toJSON(),
        "Contact message sent"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
};

export default ContactController;
