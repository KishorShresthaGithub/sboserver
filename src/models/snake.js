import { Model, DataTypes } from "sequelize";
import url from "../helpers/url";
import sqlize from "./../database/index";

class Snake extends Model {}
//todo snake

Snake.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scientific_name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: `${url}/public/placeholder_logo.svg`,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sqlize,
    tableName: "snakes",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Snake.sync();

export default Snake;
