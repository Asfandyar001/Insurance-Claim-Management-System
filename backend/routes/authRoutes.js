import express from "express";
import {
  login,
//   signup,
//   logout,
//   updateProfile,
  checkAuth,
} from "../controllers/authController.js";

import { protectRoute } from "../middleware/authmiddleware.js";
import { updatePassword } from "../controllers/authController.js";
import { logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.put("/update-password", protectRoute, updatePassword);
router.post("/logout", logout);

// router.post("/signup", signup);

// router.get("/logout", logout);

// router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;