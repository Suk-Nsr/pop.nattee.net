// src/controllers/authController.js
// Handles user registration and login

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper: create JWT
function generateToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // Payload we store in the token
  const payload = {
    userId: user._id,
    username: user.username,
    role: user.role,
  };

  // Sign the token (valid for 7 days; you can change later)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// POST /api/auth/register
async function registerUser(req, res) {
  try {
    const { username, password, role } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ error: "username and password are required" });
    }

    // Check if username already exists
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ error: "username already taken" });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Role: default to "student" if not provided or invalid
    let userRole = role === "teacher" ? "teacher" : "student";

    // Create new user
    const newUser = await User.create({
      username,
      passwordHash,
      role: userRole,
      bestScore: 0,
    });

    // Create a JWT for the new user
    const token = generateToken(newUser);

    // Respond with user info (no passwordHash)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
        bestScore: newUser.bestScore,
      },
      token,
    });
  } catch (err) {
    console.error("Error in registerUser:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// POST /api/auth/login
async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ error: "username and password are required" });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    // Generate JWT
    const token = generateToken(user);

    // Respond with user data + token
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        bestScore: user.bestScore,
      },
      token,
    });
  } catch (err) {
    console.error("Error in loginUser:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
