import dotenv from "dotenv";
dotenv.config(); // ✅ Load env vars early

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Uncomment when route is ready
import authRoutes from "./routes/authRoutes.js";
import claimRoutes from "./routes/claimRoutes.js"

import { connectDB } from "./lib/database.js";

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
 app.use("/api/auth", authRoutes);
 app.use("/api/claims", claimRoutes);

// Optional health check
app.get("/", (req, res) => {
  res.send("API is working");
});

// Start server
app.listen(5000, () => {
  console.log("✅ Server is running on port 5000");
  connectDB();
});
