// src/routes/scoreRoutes.js
// Routes for saving score and getting leaderboards

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  updateScore,
  getLeaderboard,
} = require("../controllers/scoreController");

const router = express.Router();

// UNPROTECTED simple test route
// GET /api/test
router.get("/test", (req, res) => {
  res.json({ route: "score", status: "ok" });
});

// PROTECTED: update current user's score
// POST /api/score
router.post("/score", authMiddleware, updateScore);

// PUBLIC: get leaderboard (optionally filtered by role)
// GET /api/leaderboard?role=student|teacher
router.get("/leaderboard", getLeaderboard);

module.exports = router;
