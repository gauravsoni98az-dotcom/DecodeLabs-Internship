// ─────────────────────────────────────────────────────────────
// Auth Routes
// These are PUBLIC routes — no token needed.
// POST /api/auth/register  → Create a new account
// POST /api/auth/login     → Login and get a token
// ─────────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;