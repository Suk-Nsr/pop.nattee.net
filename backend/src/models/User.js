// src/models/User.js
// Mongoose model for users of Nattee Pop app

const mongoose = require("mongoose");

// Define the schema (shape of a User document)
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,      // no duplicate usernames
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,    // we will store bcrypt-hashed password
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      required: true,
      default: "student",
    },
    bestScore: {
      type: Number,
      default: 0,        // highest score the user has ever reached
    },
  },
  {
    timestamps: true,     // adds createdAt and updatedAt automatically
  }
);

// Create the model from the schema
const User = mongoose.model("User", userSchema);

// Export the model so controllers can use it
module.exports = User;
