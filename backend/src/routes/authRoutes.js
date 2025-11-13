// src/routes/authRoutes.js
// Routes for authentication: register, login

const express = require("express");
const router = express.Router();

// TEMP test route
router.get("/test", (req, res) => {
  res.json({ route: "auth", status: "ok" });
});

// IMPORTANT: export the router itself, not an object
module.exports = router;
