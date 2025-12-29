const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const Product = require("../models/Product");
const Warehouse = require("../models/Warehouse");
const Supplier = require("../models/Supplier");
const Sales = require("../models/Sales");
const { Op } = require("sequelize");

// Low-stock alerts
router.get("/companies/:company_id/alerts/low-stock", async (req, res) => {
  try {
    const { company_id } = req.params;

    const inventories = await Inventory.findAll({
      include: [
        { model: Product },
        { model: Warehouse, where: { company_id } },
        { model: Product, include: [Supplier] } // assuming each product has a supplier
      ]
    });

    const alerts = inventories
      .filter(inv => inv.quantity < inv.Product.low_stock_threshold)
      .map(inv => ({
        product_id: inv.Product.id,
        product_name: inv.Product.name,
        sku: inv.Product.sku,
        warehouse_id: inv.Warehouse.id,
        warehouse_name: inv.Warehouse.name,
        current_stock: inv.quantity,
        threshold: inv.Product.low_stock_threshold,
        supplier: inv.Product.Supplier ? {
          id: inv.Product.Supplier.id,
          name: inv.Product.Supplier.name,
          contact_email: inv.Product.Supplier.contact_email
        } : null
      }));

    res.json({ alerts, total_alerts: alerts.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// GET /api/companies/:company_id/alerts/low-stock
router.get("/companies/:company_id/alerts/low-stock", async (req, res) => {
  try {
    const { company_id } = req.params;

    // Step 1: Find all warehouses for the company
    const warehouses = await Warehouse.findAll({ where: { company_id } });
    const warehouseIds = warehouses.map(w => w.id);

    // Step 2: Find inventories in those warehouses
    const inventories = await Inventory.findAll({
      where: { warehouse_id: warehouseIds },
      include: [
        {
          model: Product,
          include: [Supplier]
        },
        {
          model: Warehouse
        }
      ]
    });

    const alerts = [];

    // Step 3: Filter low stock with recent sales (last 30 days)
    const THIRTY_DAYS_AGO = new Date();
    THIRTY_DAYS_AGO.setDate(THIRTY_DAYS_AGO.getDate() - 30);

    for (const inv of inventories) {
      const recentSale = await Sales.findOne({
        where: {
          product_id: inv.product_id,
          warehouse_id: inv.warehouse_id,
          sale_date: { [Op.gte]: THIRTY_DAYS_AGO }
        }
      });

      if (!recentSale) continue; // Skip products with no recent sales

      if (inv.quantity < inv.Product.low_stock_threshold) {
        const daysUntilStockout = inv.quantity / (recentSale.quantity / 30); // approx daily usage

        alerts.push({
          product_id: inv.product_id,
          product_name: inv.Product.name,
          sku: inv.Product.sku,
          warehouse_id: inv.warehouse_id,
          warehouse_name: inv.Warehouse.name,
          current_stock: inv.quantity,
          threshold: inv.Product.low_stock_threshold,
          days_until_stockout: Math.ceil(daysUntilStockout),
          supplier: inv.Product.Supplier
            ? {
                id: inv.Product.Supplier.id,
                name: inv.Product.Supplier.name,
                contact_email: inv.Product.Supplier.contact_email
              }
            : null
        });
      }
    }

    res.json({ alerts, total_alerts: alerts.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;