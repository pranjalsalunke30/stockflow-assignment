const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Supplier = sequelize.define("Supplier", {
  name: { type: DataTypes.STRING, allowNull: false },
  contact_email: { type: DataTypes.STRING }
});

module.exports = Supplier;
