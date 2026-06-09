// ─────────────────────────────────────────────────────────────
// Auth Middleware
// This is the "Authentication Gate" from the PPT.
// It checks: WHO ARE YOU? (AuthN)
// Protected routes call this before allowing access.
// ─────────────────────────────────────────────────────────────

const jwt = require("jsonwebtoken");
const JWT_SECRET = "decodelabs_secret_key_2026"; // In production, use environment variable

function authenticate(req, res, next) {
  // Token must come in the header: Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided. Please login first.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();             // Allow the request to continue
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token.",
    });
  }
}

module.exports = { authenticate, JWT_SECRET };