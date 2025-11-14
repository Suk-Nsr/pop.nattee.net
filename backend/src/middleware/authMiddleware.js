// src/middleware/authMiddleware.js
// Middleware to protect routes using JWT

const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // Check if header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1]; // Get the part after "Bearer"

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info from token to request object
    req.user = {
      id: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    };

    // Move to next middleware/handler
    next();
  } catch (err) {
    console.error("Error in authMiddleware:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
