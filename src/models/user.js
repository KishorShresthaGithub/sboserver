import cryptoRandomString from "crypto-random-string";
import { Model, DataTypes } from "sequelize";
import sqlize from "../database";

class User extends Model {
  toJSON() {
    let values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
}

export const Role = Object.freeze({
  ADMIN: 1,
  USER: 2,

  get(value) {
    let role = null;
    switch (value) {
      case "admin":
        role = this.ADMIN;
        break;
      case "user":
        role = this.USER;
        break;
      default:
        role = this.USER;
    }
    return role;
  },

  getString(value) {
    let role = null;
    switch (value) {
      case this.ADMIN:
        role = "admin";
        break;
      case this.USER:
        role = "user";
        break;
      default:
        role = "user";
    }
    return role;
  },
});

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
    role: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: Role.USER,
    },
  },
  {
    sequelize: sqlize,
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

User.beforeCreate((user, options) => {
  user.string_id = cryptoRandomString({
    length: 10,
    type: "distinguishable",
  });
});

export default User;
