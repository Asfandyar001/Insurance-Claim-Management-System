import express from "express";
import {
  login,
//   signup,
//   logout,
//   updateProfile,
  checkAuth,
} from "../controllers/authController.js";

import { protectRoute } from "../middleware/authmiddleware.js";
const router = express.Router();

router.post("/login", login);

// router.post("/signup", signup);

// router.get("/logout", logout);

// router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;