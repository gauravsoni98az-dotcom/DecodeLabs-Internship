const express = require("express");
const userRoutes = require("./src/routes/userRoutes.js");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
const PORT = 3000;

// ─── Middleware ───────────────────────────────────────────────
app.use(express.json()); // Parse incoming JSON requests

// ─── Routes ──────────────────────────────────────────────────
app.use("/api/auth", authRoutes);   // POST /api/auth/register, /api/auth/login
app.use("/api/users", userRoutes);  // GET  /api/users, /api/users/:id

// ─── Health Check ────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "User Management API is running!",
    version: "1.0.0",
  });
});

// ─── 404 Handler (unknown routes) ────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

module.exports = app;