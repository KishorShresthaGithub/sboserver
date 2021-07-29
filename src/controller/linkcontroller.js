import { Op } from "sequelize";
import Link from "../models/link";
import BaseController from "./basecontroller";

const LinkController = {
  /**
   *
   * Method to show all links with sub links
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async index(req, res) {
    try {
      const dblinks = await Link.findAll({
        order: [["parent_link", "ASC"]],
        raw: true,
      });

      let links = [...dblinks];

      links = links.map((e) => {
        e.sub_links = [];
        return e;
      });

      let temp = [];

      for (let i = 0; i < links.length; i++) {
        if (links[i].parent_link === null) temp.push(links[i]);
        else {
          let parent = links.find((res) => res.id === links[i].parent_link);
          links[i].link = `${parent.link}/${links[i].link}`;
          parent.sub_links.push(links[i]);
        }
      }

      temp = temp.sort((a, b) => parseInt(a.position) - parseInt(b.position));

      return BaseController.sendResponse(res, temp, "Navigation");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   *
   * Method to show all links
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async all(req, res) {
    try {
      const dblinks = await Link.findAll({
        order: [["parent_link", "ASC"]],
        raw: true,
      });
      const links = [...dblinks];

      let temp = [];

      for (let i = 0; i < links.length; i++) {
        if (links[i].parent_link !== null) {
          let parent = links.find((res) => res.id === links[i].parent_link);
          links[i].link = `${parent.link}/${links[i].link}`;
        }
        temp.push(links[i]);
      }

      temp = temp.sort((a, b) => parseInt(a.position) - parseInt(b.position));

      return BaseController.sendResponse(res, temp, "Navigation");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   *
   * Method to show single link data
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async show(req, res) {
    try {
      const dblink = await Link.findOne({
        where: { id: req.params.id },
        raw: true,
      });

      if (!dblink)
        return BaseController.sendError(res, null, "Link not found", 404);

      const link = { ...dblink };

      if (link.parent_link) {
        link.parent = await Link.findOne({
          where: { id: link.parent_link },
          raw: true,
        });

        delete link.parent_link;
      }

      return BaseController.sendResponse(res, link, "Single link listing");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   *
   * Method to save links
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async save(req, res) {
    try {
      const link = await Link.create(req.body);

      if (!link) throw Error("Somthing went wrong");

      return BaseController.sendResponse(res, link.toJSON(), "Link saved");
    } catch (error) {
      return BaseController.sendError(res, error);
    }
  },
  /**
   *
   * Method to updated links and link pages
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async update(req, res) {
    try {
      const link = await Link.findOne({
        where: { id: req.params.id },
      });

      if (!link) return BaseController.sendError(res, {}, 404);

      const update = await link.update(req.body);

      if (!update) throw new Error("Something went wrong");

      return BaseController.sendResponse(res, link.toJSON(), "Link updated");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   *
   * Method to delete and reset parent links
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  async delete(req, res) {
    try {
      const link = await Link.findOne({
        where: { id: req.params.id },
      }).catch(console.log);

      if (!link) return BaseController.sendError(res, {}, 404);

      const sub_linksLinks = await Link.findAll({
        where: { parent_link: link.id },
      }).catch(console.log);

      let updateParent;

      if (sub_linksLinks.length)
        updateParent = sub_linksLinks.map((res) =>
          res.update({ parent_link: null })
        );

      await Promise.all(updateParent).catch(console.log);

      if (!(await link.destroy())) throw new Error("Something went wrong");

      return BaseController.sendResponse(res, link.toJSON(), "Link deleted");
    } catch (error) {
      return BaseController.sendError(res, error);
    }
  },
};

export default LinkController;
