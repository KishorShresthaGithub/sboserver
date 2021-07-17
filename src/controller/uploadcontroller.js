import sharp from "sharp";
import BaseController from "./basecontroller";
import path from "path";
import fs from "fs";
import siteurl from "./../helpers/url";

const UploadController = {
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
      const ref = await UploadController.compressImage(req.file);

      let url = siteurl;
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
          UploadController.unlinkFile(file.path);

          return;
        }
        //compress image
        await sharp(data)
          .webp({ quality: 20 })
          .toFile(path.resolve(destination, ref))
          .catch((err) => {
            fs.unlink(file.path, (err) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log(
                "Uploaded: File compressed and original file deleted"
              );
            });
          });
        //unlink original file
        UploadController.unlinkFile(file.path);
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
  async uploadImages(files) {
    try {
      if (!files) return;

      //mapping all compression promises
      const upload = files.map((file) => {
        return UploadController.compressImage(file);
      });

      const urls = await Promise.all(upload);

      let urlarray = urls.map((url) => `${siteurl}/public/images/${url}`);

      return urlarray;
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
  async uploadPDF(file) {
    try {
      if (!file) return;

      const { filename } = file;

      let url = siteurl;
      //pdf url
      url += `/public/pdf/${filename}`;

      return { pdf_url: url };
    } catch (error) {
      console.log(error);
      return BaseController.sendError(res, error);
    }
  },
  /**
   * Unlink file
   *
   * @param {*} file
   * @returns
   */
  async unlinkFile(file) {
    if (!fs.existsSync(file)) {
      console.log("File not found");
      return;
    }

    fs.unlink(file, (err) => {
      if (err) {
        console.log(err, " Something went wrong");
        return;
      }
      console.log("File has been deleted");
      return "File deleted";
    });

    return true;
  },
  /**
   * Method to delete files from file url
   *
   * @param {Url of model} url
   * @returns
   */
  async unlinkUrl(url) {
    let image = new URL(url);

    let imagepath = image.pathname.split("/").filter(Boolean);
    imagepath = [__dirname, "../", ...imagepath];

    let filepath = imagepath.reduce((a, i) => path.join(a, i));

    return await UploadController.unlinkFile(filepath).catch(console.log);
  },
};

export default UploadController;
