import { Model, DataTypes } from "sequelize";
import slugify from "slugify";
import sqlize from "./../database/index";

class SummaryReport extends Model {}

SummaryReport.init(
  {
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    pdf_link: { type: DataTypes.STRING, allowNull: false },
    show: { type: DataTypes.BOOLEAN, defaultValue: false },
    description: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize: sqlize,
    tableName: "summary_reports",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// SummaryReport.sync({ force: true });

export default SummaryReport;
