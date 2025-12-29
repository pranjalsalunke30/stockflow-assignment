// Load environment variables
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");

// Import routes
const productRoutes = require("./routes/products");
const alertRoutes = require("./routes/alerts");

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api", productRoutes);
app.use("/api", alertRoutes);

// Test DB connection
sequelize.authenticate()
  .then(() => console.log("Connected to Supabase DB!"))
  .catch(err => console.error("DB connection error:", err));

// Sync models
sequelize.sync({ alter: true })
  .then(() => console.log("Models synced"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
