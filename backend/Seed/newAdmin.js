import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../models/admin.js"; // ✅ FIXED: default import

dotenv.config();

// Replace this with your MongoDB URI from .env or hardcode for test
const MONGO_URI = process.env.MONGODB_URI;

await mongoose.connect(MONGO_URI);

console.log("✅ MongoDB connected");

// Create a new admin
const admin = new Admin({
  username: "admin",
  password: "admin123", // Will be hashed due to pre-save hook
});

await admin.save();
console.log("✅ Admin created successfully");

await mongoose.disconnect();
console.log("✅ MongoDB disconnected");
