import { Model, DataTypes } from "sequelize";
import slugify from "slugify";
import sqlize from "./../database/index";

class Link extends Model {}

Link.init(
  {
    link: { type: DataTypes.STRING, allowNull: false, unique: true },
    parent_link: { type: DataTypes.INTEGER },
    page: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "<h1>Page not created</h1>",
    },
  },
  { sequelize: sqlize, createdAt: "created_at", updatedAt: "updated_at" }
);

const slugTitle = (model, options) =>
  (model.link = slugify(model.link, { replacement: "-", lower: true }));

Link.beforeCreate(slugTitle);
Link.beforeUpdate(slugTitle);

// Link.sync({ force: true });

export default Link;
