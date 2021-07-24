import { Sequelize } from "sequelize";

const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sqlize = new Sequelize(database, username, password, {
  dialect: process.env.DB_DIALECT || "mysql",
  host: "116.203.126.233",
  // logging: false,
  ssl: true,
});

export default sqlize;
