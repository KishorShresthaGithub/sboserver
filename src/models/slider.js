import { Model, DataTypes } from "sequelize";
import slugify from "slugify";
import sqlize from "./../database/index";

class Slider extends Model {}

Slider.init(
  {
    image: { type: DataTypes.STRING, allowNull: false },
    caption: { type: DataTypes.STRING },
    position: { type: DataTypes.INTEGER, defaultValue: null },
  },
  {
    sequelize: sqlize,
    tableName: "sliders",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Slider.sync({ force: true });

export default Slider;
