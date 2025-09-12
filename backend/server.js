import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";

import { connectDB } from "./lib/database.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes);

// For unmatched API routes
app.use(/^\/api\//, (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Start server
app.listen(5000, () => {
  console.log("✅ Server is running on port 5000");
  connectDB();
});
