import cryptoRandomString from "crypto-random-string";
import { Sequelize, Model, DataTypes } from "sequelize";
import sqlize from "../database";

class User extends Model {
  toJSON() {
    let values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
}

User.init(
  {
    string_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sqlize,
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

User.beforeValidate((user, options) => {
  user.string_id = cryptoRandomString({ length: 10, type: "distinguishable" });
});

export default User;
