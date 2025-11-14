// src/routes/authRoutes.js
// Routes for authentication: register, login

const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Test route (optional, you can keep or remove later)
router.get("/test", (req, res) => {
  res.json({ route: "auth", status: "ok" });
});

// Register a new user
// POST /api/auth/register
router.post("/register", registerUser);

// Login user
// POST /api/auth/login
router.post("/login", loginUser);

module.exports = router;
