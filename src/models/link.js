import { Model, DataTypes } from "sequelize";
import slugify from "slugify";
import sqlize from "./../database/index";

class Link extends Model {}

Link.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    link: { type: DataTypes.STRING, allowNull: false, unique: true },
    parent_link: { type: DataTypes.INTEGER },
    postion: { type: DataTypes.INTEGER },
    page: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "<h1>Page not created</h1>",
    },
  },
  {
    sequelize: sqlize,
    tableName: "links",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const slugTitle = (model, options) =>
  (model.link = slugify(model.link, { replacement: "-", lower: true }));

Link.beforeCreate(slugTitle);
Link.beforeUpdate(slugTitle);

//Link.sync({ force: true });

export default Link;
