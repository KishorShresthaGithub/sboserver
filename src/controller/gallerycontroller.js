import url from "../helpers/url";
import Gallery from "../models/gallery";
import GalleryImage from "../models/galleryimage";
import BaseController from "./basecontroller";
import UploadController from "./uploadcontroller";

const GalleryController = {
  async index(req, res) {
    try {
      const gallery = await Gallery.findAll({
        include: [{ model: GalleryImage }],
      });

      return BaseController.sendResponse(res, gallery, "");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  async show(req, res) {
    try {
      const gallery = await Gallery.findOne({
        where: { id: req.params.gallery },
        include: GalleryImage,
      });

      if (!gallery)
        return BaseController.sendError(res, {}, "Gallery not found", 404);

      return BaseController.sendResponse(res, gallery, "");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  async save(req, res) {
    try {
      if (!req.files?.length)
        return BaseController.sendError(res, null, "Please upload images", 400);

      const gallery = await Gallery.create(req.body, {
        skip: "slug",
      });

      if (!gallery) throw new Error();

      const images = await UploadController.uploadImages(req.files);

      if (!images?.length) throw Error();

      const addImages = images.map((image) =>
        GalleryImage.create({
          gallery_id: gallery.id,
          image: image,
        }).catch((res) => console.log(res))
      );

      await Promise.all(addImages);

      return BaseController.sendResponse(
        res,
        gallery.toJSON(),
        "Gallery Saved"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  async update(req, res) {
    try {
      const gallery = await Gallery.findOne({
        where: { id: req.params.gallery },
      });

      if (!gallery)
        return BaseController.sendError(res, {}, "Gallery not found", 404);

      const updateConfirm = await gallery.update(req.body);

      if (!updateConfirm) throw new Error();

      return BaseController.sendResponse(res, gallery, "Gallery updated");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  async destroy(req, res) {
    try {
      const gallery = await Gallery.findOne({
        where: { id: req.params.gallery },
      });

      if (!gallery)
        return BaseController.sendError(res, {}, "Gallery not found", 404);

      if (!(await gallery.destroy())) throw new Error();

      return BaseController.sendResponse(res, gallery, "Gallery deleted");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  async addSingle(req, res) {
    try {
      const gallery = await Gallery.findOne({
        where: { id: req.params.gallery },
      });

      if (!gallery)
        return BaseController.sendError(res, {}, "Gallery not found", 404);

      if (!req.file)
        return BaseController.sendError(res, {}, "No image uploaded", 400);

      let image = await UploadController.compressImage(req.file);
      if (!image) throw Error("Image not compressed");

      image = `${url}/public/images/${image}`;

      const galleryImage = await GalleryImage.create({
        gallery_id: gallery.id,
        image: image,
      });

      if (!galleryImage) throw Error("Something went wrong when adding image");

      return BaseController.sendResponse(res, galleryImage, "Image Uploaded");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  async updateSingle(req, res) {
    try {
      const galleryImage = await GalleryImage.findOne({
        where: { id: req.params.gallery_id, gallery_id: req.params.gallery },
      });

      if (!galleryImage)
        return BaseController.sendError(res, {}, "Gallery not found", 404);

      if (!req.file)
        return BaseController.sendError(res, {}, "No image uploaded", 400);

      let image = await UploadController.compressImage(req.file);

      if (!image) throw Error("Image not compressed");

      image = `${url}/public/images/${image}`;

      if (
        !(await galleryImage.update({
          image: image,
        }))
      )
        throw Error("Something went wrong when adding image");

      return BaseController.sendResponse(res, galleryImage, "Image Updated");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  async deleteSingle(req, res) {
    try {
      const galleryImage = await GalleryImage.findOne({
        where: { id: req.params.gallery_id, gallery_id: req.params.gallery },
      });

      if (!galleryImage)
        return BaseController.sendError(res, {}, "Gallery not found", 404);

      if (!galleryImage.destroy())
        throw new Error("Something went wrong when deleting");

      return BaseController.sendResponse(res, galleryImage, "image deleted");
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
};

export default GalleryController;
