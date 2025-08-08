import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// @desc    Login Admin
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { username, password } = req.body;

  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      _id: admin._id,
      username: admin.username,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Check if user is authenticated (Protected Route)
// @route   GET /api/auth/check
// @access  Private
const checkAuth = async (req, res) => {
  try {
    // Admin is attached to req by protectRoute middleware
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { login, checkAuth };