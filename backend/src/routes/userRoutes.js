// src/routes/userRoutes.js
// Routes for CRUD operations on users

const express = require("express");
const router = express.Router();

// TEMP test route
router.get("/test", (req, res) => {
  res.json({ route: "users", status: "ok" });
});

module.exports = router;
