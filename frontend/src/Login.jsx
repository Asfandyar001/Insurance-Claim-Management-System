import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login with:", email, password);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-xl shadow-md p-8"
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">LEAD</h1>
          <p className="text-sm text-gray-500 mt-1">Management System Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          LEAD © {new Date().getFullYear()} • Version 1.0.0
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
