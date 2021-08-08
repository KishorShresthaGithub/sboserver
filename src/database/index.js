import { Sequelize } from "sequelize";

const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sqlize = new Sequelize(database, username, password, {
  dialect: process.env.DB_DIALECT || "mysql",
  host: process.env.DB_HOST || "localhost",
  protocol: process.env.DB_PROTOCOL || "mysql",
  // logging: false,
  // dialectOptions: {
  //   ssl: { require: true, rejectUnauthorized: false },
  // },
});

export default sqlize;
