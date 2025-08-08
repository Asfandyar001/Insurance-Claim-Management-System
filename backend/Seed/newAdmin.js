// newAdmin.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Properly configure dotenv with the correct path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import mongoose from "mongoose";
import Admin from "../models/admin.js"; // Adjust path as needed

// Custom connection function for the seed script
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB for seeding");
  } catch (err) {
    console.error("MongoDB connection error: ", err);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    // Connect to database
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: "Bilal321" });
    if (existingAdmin) {
      console.log("Admin already exists with username Bilal321");
      await mongoose.disconnect();
      return;
    }

    // Create new admin
    const admin = new Admin({
      username: "Bilal321",
      password: "claimsystem321", // This will be hashed by the pre-save hook
    });

    await admin.save();
    console.log("✅ Admin seeded successfully!");
    
    // Disconnect from database
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();