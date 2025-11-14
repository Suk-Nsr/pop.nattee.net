// src/routes/userRoutes.js
// Routes for CRUD operations on users

const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// SIMPLE TEST ROUTE
// GET /api/users/test
router.get("/test", (req, res) => {
  res.json({ route: "users", status: "ok" });
});

// READ: get all users
// GET /api/users
router.get("/", getAllUsers);

// READ: get a user by id
// GET /api/users/:id
router.get("/:id", getUserById);

// CREATE: create user (for admin/testing)
// POST /api/users
router.post("/", createUser);

// UPDATE: update user
// PUT /api/users/:id
router.put("/:id", updateUser);

// DELETE: delete user
// DELETE /api/users/:id
router.delete("/:id", deleteUser);

module.exports = router;
