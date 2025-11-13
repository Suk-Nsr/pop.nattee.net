// server.js
// Entry point of your backend app

const express = require("express");
const dotenv = require("dotenv");

// Load environment variables from .env file (will create later)
dotenv.config();

// Create Express app
const app = express();

// Middleware: allow JSON in request body (e.g. POST /api/user with JSON)
app.use(express.json());

// Simple test route to check server is working
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Nattee backend is running 🚀" });
});

// Choose port: use PORT from .env if exists, otherwise 3000
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});