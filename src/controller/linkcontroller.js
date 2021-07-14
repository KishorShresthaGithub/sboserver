import { Op } from "sequelize";
import Link from "../models/link";
import BaseController from "./basecontroller";

const LinkController = {
  async index(req, res) {
    try {
      const dblinks = await Link.findAll({ raw: true });
      const links = [...dblinks];

      links.forEach((e) => {
        if (!e.parent_link) e.sub_links = [];
      });

      let temp = [];

      for (let i = 0; i < links.length; i++) {
        if (links[i].parent_link === null) temp.push(links[i]);
        else {
          let parent = links.find((res) => res.id === links[i].parent_link);
          parent.sub_links.push(links[i]);
        }
      }

      return BaseController.sendResponse(res, temp, "Navigation");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },

  async show(req, res) {
    try {
      const dblink = await Link.findOne({
        where: { id: req.params.id },
        raw: true,
      });

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

  async save(req, res) {
    try {
      const link = await Link.create(req.body);

      if (!link) throw Error("Somthing went wrong");

      return BaseController.sendResponse(res, link.toJSON(), "Link saved");
    } catch (error) {
      return BaseController.sendError(res, error);
    }
  },

  async update(req, res) {
    try {
      const link = await Link.findOne({
        where: { id: req.params.id, [Op.not]: { parent_link: null } },
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
