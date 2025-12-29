const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./Product");
const Warehouse = require("./Warehouse");

const Inventory = sequelize.define("Inventory", {
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
});

Product.hasMany(Inventory, { foreignKey: "product_id" });
Inventory.belongsTo(Product, { foreignKey: "product_id" });

Warehouse.hasMany(Inventory, { foreignKey: "warehouse_id" });
Inventory.belongsTo(Warehouse, { foreignKey: "warehouse_id" });

module.exports = Inventory;
