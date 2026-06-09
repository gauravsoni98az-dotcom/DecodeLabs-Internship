// ─────────────────────────────────────────────────────────────
// User Routes
// These are PROTECTED routes — token required (AuthN middleware).
// GET /api/users          → Get all users
// GET /api/users/profile  → Get my own profile
// GET /api/users/:id      → Get a specific user by ID
// ─────────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, getMyProfile } = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");

// All routes below require a valid JWT token
router.get("/", authenticate, getAllUsers);
router.get("/profile", authenticate, getMyProfile);
router.get("/:id", authenticate, getUserById);

module.exports = router;