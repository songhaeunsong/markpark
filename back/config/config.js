require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "parkings",
  "root",
  process.env.MYSQL_PASSWORD,
  {
    host: "127.0.0.1",
    dialect: "mysql",
  }
);

module.exports = sequelize;
