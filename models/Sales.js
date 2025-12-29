// models/Sales.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./Product");
const Warehouse = require("./Warehouse");

const Sales = sequelize.define("Sales", {
  product_id: { type: DataTypes.INTEGER, references: { model: Product, key: "id" } },
  warehouse_id: { type: DataTypes.INTEGER, references: { model: Warehouse, key: "id" } },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  sale_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Sales;
