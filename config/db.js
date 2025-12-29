require('dotenv').config(); // load .env variables
const { Sequelize } = require("sequelize");

// Use DATABASE_URL from .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: { rejectUnauthorized: false } // Required for Supabase
  }
});

module.exports = sequelize;
