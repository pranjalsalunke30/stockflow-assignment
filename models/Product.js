const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Supplier = require("./Supplier"); // ← Import Supplier model

const Product = sequelize.define("Product", {
  name: { type: DataTypes.STRING, allowNull: false },
  sku: { type: DataTypes.STRING, allowNull: false, unique: true },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  supplier_id: { type: DataTypes.INTEGER },
}, {});

Product.belongsTo(Supplier, { foreignKey: "supplier_id" }); // ← Now works
Supplier.hasMany(Product, { foreignKey: "supplier_id" });

module.exports = Product;
