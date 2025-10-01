import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

export const protectRoute = async (req, res, next) => {
  let token;

  // ✅ First check cookie
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // Optionally: still allow Authorization header fallback
  else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
