import { DataTypes, Model } from "sequelize";
import sqlize from "../database/index";
import Gallery from "./gallery";

class GalleryImage extends Model {}

GalleryImage.init(
  {
    gallery_id: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: sqlize,
    tableName: "gallery_images",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// GalleryImage.belongsTo(Gallery, {
//   as: "Gallery",
//   foreignKey: "gallery_id",
// });

// GalleryImage.sync({ force: true });

export default GalleryImage;
