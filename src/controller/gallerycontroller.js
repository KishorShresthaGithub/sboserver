import sharp from "sharp";
import BaseController from "./basecontroller";
import path from "path";
import fs from "fs";

const GalleryController = {
  /**
   * Method to upload image from controller
   *
   * @param {Request} req
   * @returns null|| image url
   */
  async uploadImage(req, res) {
    try {
      if (!req.file) return res.sendStatus(400);

      //upload image
      const ref = await GalleryController.compressImage(req.file);

      let url = `${req.protocol}://${req.hostname}${
        process.env.PORT ? `:${process.env.PORT}` : "80"
      }`;
      //image url
      url += `/public/images/${ref}`;

      return BaseController.sendResponse(
        res,
        { image_url: url },
        "Image uploaded"
      );
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },

  /**
   * Method to compress uploaded image
   * Deletes original file after compression
   *
   * @param {Multer File instance} file
   * @returns
   */
  async compressImage(file) {
    try {
      const { filename, destination } = file;
      const ref = `${filename.split(".")[0]}.webp`;

      /**
       * Performing readfile to extract buffer for sharp module
       * When using multer the file is already uploaded
       */
      fs.readFile(file.path, async (err, data) => {
        if (err) {
          console.error(err);
        }
        //compress image
        await sharp(data)
          .webp({ quality: 20 })
          .toFile(path.resolve(destination, ref))
          .catch((err) => {
            console.log(err);
          });

        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(err);
          }
          console.log("Uploaded: File compressed and original file deleted");
        });
      });

      return ref;
    } catch (error) {
      console.log(error);
      return;
    }
  },

  /**
   * Method to upload multiple image
   *
   * @param {Request} req
   * @returns null|| image url
   */
  async uploadImages(req, res) {
    try {
      if (!req.files) return res.sendStatus(400);

      //mapping all compression promises 
      const files = req.files.map((file) => {
        return GalleryController.compressImage(file);
      });

      const urls = await Promise.all(files);

      let host = `${req.protocol}://${req.hostname}${
        process.env.PORT ? `:${process.env.PORT}` : "80"
      }`;

      let urlarray = urls.map((url) => `${host}/public/images/${url}`);

      console.log(urlarray);

      return res.send("Check upload multiple image route");
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  },
};

export default GalleryController;
