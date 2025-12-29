const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Warehouse = sequelize.define("Warehouse", {
  name: { type: DataTypes.STRING, allowNull: false },
  company_id: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Warehouse;
