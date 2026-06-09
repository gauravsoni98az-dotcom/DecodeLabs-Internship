// ─────────────────────────────────────────────────────────────
// Auth Controller
// Handles the BUSINESS LOGIC for register and login.
// Controller = the brain that processes requests.
// ─────────────────────────────────────────────────────────────

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const users = require("../utils/db");
const { validateRegister, validateLogin } = require("../utils/validation");
const { JWT_SECRET } = require("../middleware/auth");

// ─── POST /api/auth/register ──────────────────────────────────
async function register(req, res) {
  try {
    // Step 1: Validate the input (Gatekeeper Rule!)
    const { valid, message } = validateRegister(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message }); // 400 Bad Request
    }

    const { name, email, password } = req.body;

    // Step 2: Check if email already exists (Semantic Validation)
    const existingUser = users.find((u) => u.email === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    // Step 3: Hash the password (never store plain text passwords!)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create new user object
    const newUser = {
      id: uuidv4(),
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    // Step 5: Save to our in-memory DB
    users.push(newUser);

    // Step 6: Return 201 Created (never send back the password!)
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// ─── POST /api/auth/login ─────────────────────────────────────
async function login(req, res) {
  try {
    // Step 1: Validate input
    const { valid, message } = validateLogin(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message });
    }

    const { email, password } = req.body;

    // Step 2: Find user by email
    const user = users.find((u) => u.email === email.toLowerCase());
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password", // Vague on purpose for security
      });
    }

    // Step 3: Compare password with hashed version
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Step 4: Generate JWT token (expires in 1 hour)
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Step 5: Return 200 OK with token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = { register, login };