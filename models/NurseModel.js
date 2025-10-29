const db = require("../config/db_config");
const Sequelize = require("sequelize");

const Nurse = db.define(
  "nurses_md",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    license_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: "TIMESTAMP",
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Nurse;
