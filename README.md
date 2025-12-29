# StockFlow – Inventory Management System

## Overview
StockFlow is a backend inventory management system built using Node.js, Express, Sequelize, and PostgreSQL (Supabase).  
This project was developed as part of a technical assignment to demonstrate database design, relationships, and inventory logic.

---

## Tech Stack
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL (Supabase)
- dotenv
- Nodemon

---

## Project Structure
stockflow-assignment/
├── config/
│   └── db.js
├── models/
│   ├── Product.js
│   ├── Supplier.js
│   ├── Warehouse.js
│   ├── Inventory.js
│   └── Sale.js
├── routes/
│   ├── products.js
│   ├── suppliers.js
│   ├── warehouses.js
│   ├── inventories.js
│   └── alerts.js
├── server.js
├── .env
└── README.md

---

## Part 2 – Backend & Database Implementation

### Tech Stack
- Node.js
- Express.js
- PostgreSQL (Supabase)
- Sequelize ORM

### Features Implemented
- Database schema for Products, Warehouses, Inventories, Suppliers, Sales
- Proper foreign key relationships
- SKU uniqueness validation
- Inventory tracking per warehouse
- Low stock threshold support
- REST APIs implemented and tested using Postman

### Setup Instructions
1. Clone repository
2. Run `npm install`
3. Create `.env` file:
