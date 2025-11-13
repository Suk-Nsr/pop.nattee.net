// src/config/db.js
// Handles connection to MongoDB using Mongoose

const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGO_URI is not defined in environment variables");
    throw new Error("MONGO_URI is missing");
  }

  try {
    // dbName is optional here; you can change "nattee_pop" later if you want
    await mongoose.connect(uri, {
      // options can be added here if needed
      dbName: "nattee_pop",
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    // Stop the app if DB fails (backend depends on DB)
    process.exit(1);
  }
}

module.exports = connectDB;