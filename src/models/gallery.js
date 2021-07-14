import { Model, DataTypes } from "sequelize";
import slugify from "slugify";
import sqlize from "./../database/index";
import GalleryImage from "./galleryimage";

class Gallery extends Model {}

Gallery.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT },
  },
  {
    sequelize: sqlize,
    tableName: "gallery",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const slugTitle = (model, options) =>
  (model.slug = slugify(model.title, { replacement: "-", lower: true }));

Gallery.beforeCreate(slugTitle);
Gallery.beforeUpdate(slugTitle);

Gallery.hasMany(GalleryImage, { foreignKey: "gallery_id" });

export default Gallery;
