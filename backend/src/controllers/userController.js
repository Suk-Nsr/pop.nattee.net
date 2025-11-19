// src/controllers/userController.js
// Full CRUD operations on User model

const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET /api/users
// Read: get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-passwordHash"); // don't send password hashes
    res.json(users);
  } catch (err) {
    console.error("Error in getAllUsers:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET /api/users/:id
// Read: get a single user by id
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error in getUserById:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// POST /api/users
// Create: create a user (for admin/testing – not using register flow)
async function createUser(req, res) {
  try {
    const { username, role } = req.body;

    if (!username) {
      return res.status(400).json({ error: "username is required" });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ error: "username already exists" });
    }

    // NOTE: this creates a user *without* password, just for CRUD demo.
    // Normal users should be created through /api/auth/register.
    const newUser = await User.create({
      username,
      role: role === "teacher" ? "teacher" : "student",
      bestScore: 0,
      passwordHash: "NO_PASSWORD", // placeholder, not used in app
    });

    const result = newUser.toObject();
    delete result.passwordHash;

    res.status(201).json(result);
  } catch (err) {
    console.error("Error in createUser:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// PUT /api/users/:id
// Update: update user's role or bestScore (for admin/testing)
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { role, bestScore } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (role === "student" || role === "teacher") {
      user.role = role;
    }

    if (typeof bestScore === "number") {
      user.bestScore = bestScore;
    }

    const updated = await user.save();
    const result = updated.toObject();
    delete result.passwordHash;

    res.json(result);
  } catch (err) {
    console.error("Error in updateUser:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// DELETE /api/users/:id
// Delete: remove a user
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error in deleteUser:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// DELETE /api/users/me
// Delete the authenticated user's own account after verifying password
async function deleteOwnAccount(req, res) {
  try {
    const userId = req.userId; // auth middleware must set this
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure account has a real password (skip if NO_PASSWORD placeholder)
    if (!user.passwordHash || user.passwordHash === "NO_PASSWORD") {
      return res.status(403).json({ error: "This account cannot be deleted without proper credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    await User.deleteOne({ _id: userId });

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error in deleteOwnAccount:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteOwnAccount,
};
