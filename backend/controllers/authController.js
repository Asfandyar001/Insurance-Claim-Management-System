import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// @desc    Login Admin
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { username, password } = req.body;

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

    // ✅ Set token in httpOnly cookie instead of sending in JSON
    res.cookie("jwt", token, {
      httpOnly: true,                      // ❌ not accessible by JS
      secure: process.env.NODE_ENV === "production", // ✅ only over HTTPS in production
      sameSite: "strict",                  // prevents CSRF
      maxAge: 60 * 60 * 1000,              // 1 hour
    });

    res.status(200).json({
      _id: admin._id,
      username: admin.username,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
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

// @desc    Update admin password
// @route   PUT /api/auth/update-password
// @access  Private
const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findById(req.admin.id); // req.admin comes from protectRoute middleware

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update password
    admin.password = newPassword; // pre-save hook will hash it
    await admin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Logout Admin
// @route   POST /api/auth/logout
// @access  Public
const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};


export { login, checkAuth, updatePassword, logout };