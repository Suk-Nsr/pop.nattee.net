// server.js
// Entry point of your backend app

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

const cors = require("cors");

// Import routes
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const scoreRoutes = require("./src/routes/scoreRoutes");

console.log("authRoutes typeof:", typeof authRoutes);
console.log("userRoutes typeof:", typeof userRoutes);
console.log("scoreRoutes typeof:", typeof scoreRoutes);

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware: allow JSON in request body
app.use(express.json());

// Enable CORS — set origin to where you serve frontend (Live Server / static host).
// For quick local dev you can allow all origins, but restrict in production.
app.use(cors({
  origin: "http://localhost:3221", // change to your frontend origin or use "*" for dev
  credentials: true
}));

// Mount routes with base paths
app.use("/api/auth", authRoutes);   // /api/auth/...
app.use("/api/users", userRoutes);  // /api/users/...
app.use("/api", scoreRoutes);       // /api/score, /api/leaderboard later

// Simple test route to check server is working
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Nattee backend is running 🚀" });
});

// Choose port: use PORT from .env if exists, otherwise 3000
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
