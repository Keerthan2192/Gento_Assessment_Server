const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "+05:30",
    logging: false,
  }
);

db.authenticate()
  .then(() => console.log("MySQL Connected"))
  .catch((err) => console.log("Database connection error:", err));

module.exports = db;
