// ─────────────────────────────────────────────────────────────
// Validation Utilities
// "The Gatekeeper Rule" from the PPT — Never Trust the Client!
// We validate both SYNTAX (format) and SEMANTICS (logic) here.
// ─────────────────────────────────────────────────────────────

/**
 * Validates a registration request body
 * @param {object} body - { name, email, password }
 * @returns {{ valid: boolean, message: string }}
 */
function validateRegister(body) {
  const { name, email, password } = body;

  // Check all fields are present
  if (!name || !email || !password) {
    return { valid: false, message: "name, email, and password are all required" };
  }

  // name must be a non-empty string
  if (typeof name !== "string" || name.trim().length < 2) {
    return { valid: false, message: "name must be at least 2 characters" };
  }

  // email format check (Syntactic Validation)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: "email format is invalid" };
  }

  // password must be strong enough (Semantic Validation)
  if (password.length < 6) {
    return { valid: false, message: "password must be at least 6 characters" };
  }

  return { valid: true, message: "OK" };
}

/**
 * Validates a login request body
 * @param {object} body - { email, password }
 * @returns {{ valid: boolean, message: string }}
 */
function validateLogin(body) {
  const { email, password } = body;

  if (!email || !password) {
    return { valid: false, message: "email and password are required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: "email format is invalid" };
  }

  return { valid: true, message: "OK" };
}

module.exports = { validateRegister, validateLogin };