import cryptoRandomString from "crypto-random-string";
import { DataTypes, Model } from "sequelize";
import slugify from "slugify";
import sqlize from "../database";
import url from "./../helpers/url";

class Event extends Model {}

Event.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    time: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: `${url}/public/placeholder_logo.svg`,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sqlize,
    paranoid: true,
    tableName: "events",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

const titleSlug = (ev, options) => {
  ev.slug = slugify(ev.title, { replacement: "-", lower: true });
  ev.slug += `-${cryptoRandomString({
    length: 5,
  })}`;
};

//adding slug to model
Event.beforeCreate(titleSlug);
Event.beforeUpdate(titleSlug);

//Event.sync({ force: true });

export default Event;
