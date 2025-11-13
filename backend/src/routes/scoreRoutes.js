// src/routes/scoreRoutes.js
// Routes for saving score and getting leaderboards

const express = require("express");
const router = express.Router();

// TEMP test route
router.get("/test", (req, res) => {
  res.json({ route: "score", status: "ok" });
});

module.exports = router;
