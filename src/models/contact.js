import { DataTypes, Model } from "sequelize";
import sqlize from "../database";

class Contact extends Model {}

Contact.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize: sqlize,
    paranoid: true,
    tableName: "contacts",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);
//Contact.sync({ force: true });

export default Contact;
