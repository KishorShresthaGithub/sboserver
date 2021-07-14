import { Sequelize } from "sequelize";

const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sqlize = new Sequelize(database, username, password, {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});

export default sqlize;
