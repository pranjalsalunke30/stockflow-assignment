const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");
const Warehouse = require("../models/Warehouse");

// Create product + inventory
router.post("/products", async (req, res) => {
  try {
    const { name, sku, price, warehouse_id, initial_quantity, warehouse_name, company_id } = req.body;

    // Validate required fields
    if (!name || !sku || !price || !warehouse_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check SKU uniqueness
    const existing = await Product.findOne({ where: { sku } });
    if (existing) {
      return res.status(400).json({ error: "SKU already exists" });
    }

    // Check if warehouse exists, create automatically if not
    let warehouse = await Warehouse.findByPk(warehouse_id);
    if (!warehouse) {
      if (!warehouse_name || !company_id) {
        return res.status(400).json({ error: "Warehouse does not exist. Provide warehouse_name and company_id to create it." });
      }
      warehouse = await Warehouse.create({
        id: warehouse_id,
        name: warehouse_name,
        company_id
      });
    }

    // Create product
    const product = await Product.create({ name, sku, price });

    // Create inventory
    await Inventory.create({
      product_id: product.id,
      warehouse_id: warehouse.id,
      quantity: initial_quantity || 0
    });

    res.json({ message: "Product created with inventory", product_id: product.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
