// src/controllers/scoreController.js
// Handle saving scores and returning leaderboards

const User = require("../models/User");

// POST /api/score
// Body: { score: number }
// Requires authMiddleware (req.user is set)
async function updateScore(req, res) {
  try {
    const { score } = req.body;

    if (typeof score !== "number") {
      return res.status(400).json({ error: "score must be a number" });
    }

    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Only update if new score is higher than previous best
    if (score > (user.bestScore || 0)) {
      user.bestScore = score;
      await user.save();
    }

    res.json({
      message: "Score updated",
      bestScore: user.bestScore,
    });
  } catch (err) {
    console.error("Error in updateScore:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET /api/leaderboard?role=student|teacher
// Returns top users sorted by bestScore
async function getLeaderboard(req, res) {
  try {
    const { role } = req.query;

    const filter = {};
    if (role === "student" || role === "teacher") {
      filter.role = role;
    }

    const topUsers = await User.find(filter)
      .select("-passwordHash")
      .sort({ bestScore: -1, createdAt: 1 });

    res.json(topUsers);
  } catch (err) {
    console.error("Error in getLeaderboard:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  updateScore,
  getLeaderboard,
};
