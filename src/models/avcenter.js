import cryptoRandomString from "crypto-random-string";
import { DataTypes, Model } from "sequelize";
import slugify from "slugify";
import sqlize from "../database";

class AVCenter extends Model {}

AVCenter.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contact: {
      type: DataTypes.STRING,
    },
    map_location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sqlize,
    paranoid: true,
    tableName: "avcenters",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

const addSlug = (avc, options) => {
  let slug = slugify(avc.name, { replacement: "-", lower: true });

  slug +=
    "-" +
    cryptoRandomString({
      length: 5,
    });

  avc.slug = slug;
};

AVCenter.beforeCreate(addSlug);
AVCenter.beforeUpdate(addSlug);

// AVCenter.sync({ force: true });

export default AVCenter;
