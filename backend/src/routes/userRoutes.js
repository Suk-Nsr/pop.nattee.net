// ...existing code...
const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteOwnAccount, // added
} = require("../controllers/userController");

const authenticate = require("../middleware/authMiddleware"); // added

const router = express.Router();

// SIMPLE TEST ROUTE
// GET /api/users/test
router.get("/test", (req, res) => {
  res.json({ route: "users", status: "ok" });
});

// READ: get all users
// GET /api/users
router.get("/", getAllUsers);

// CREATE: create user (for admin/testing)
// POST /api/users
router.post("/", createUser);

// Delete own account (requires authentication)
// DELETE /api/users/me
// MUST be defined before routes that use :id to avoid route collision
router.delete("/me", authenticate, deleteOwnAccount);

// READ: get a user by id
// GET /api/users/:id
router.get("/:id", getUserById);

// UPDATE: update user
// PUT /api/users/:id
router.put("/:id", updateUser);

// DELETE: delete user
// DELETE /api/users/:id
router.delete("/:id", deleteUser);

module.exports = router;