require("dotenv").config();
// require("dotenv").config({ path: "../.env" });

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.RDS_DB_NAME,
  process.env.RDS_USERNAME,
  process.env.RDS_PASSWORD,
  {
    host: process.env.RDS_HOSTNAME,
    port: 3306,
    dialect: "mysql",
  }
);

module.exports = sequelize;
