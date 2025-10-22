import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Phone, User as UserIcon } from "lucide-react";
import "./LoginModal.css";

const API_BASE = import.meta.env.VITE_API_URL || "";

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [tab, setTab] = useState("login");
  const [formData, setFormData] = useState({ email: "", password: "", name: "", phone: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTab("login");
      setFormData({ email: "", password: "", name: "", phone: "" });
      setError("");
      setLoading(false);
      setShowPassword(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const stopPropagation = (e) => e.stopPropagation();

  // ✅ Safe JSON parser to prevent "Unexpected end of JSON input"
  const safeJson = async (res) => {
    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    if (!res.ok) throw new Error(data?.message || data?.error || "Something went wrong");
    return data;
  };

  // ✅ LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
        credentials: "include",
      });

      const data = await safeJson(res);
      const loggedInUser = { name: data.name, email: data.email };
      onLoginSuccess?.(loggedInUser, data.token);
      onClose();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await safeJson(res);
      const loggedInUser = { name: data.name, email: data.email };
      onLoginSuccess?.(loggedInUser, data.token);
      onClose();
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/api/auth/google`;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        className="modal-container"
        onClick={stopPropagation}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="modal-tabs">
          <button
            className={tab === "login" ? "active" : ""}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={tab === "register" ? "active" : ""}
            onClick={() => setTab("register")}
          >
            Register
          </button>
        </div>

        {error && <div className="modal-error">{error}</div>}

        {tab === "login" ? (
          <form onSubmit={handleLogin} className="modal-form">
            <label>Email</label>
            <div className="input-group">
              <Mail />
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <label>Password</label>
            <div className="input-group">
              <Lock />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label="Toggle password"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <button type="button" className="google-btn" onClick={handleGoogleLogin}>
              Continue with Google
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="modal-form">
            <label>Name</label>
            <div className="input-group">
              <UserIcon />
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <label>Email</label>
            <div className="input-group">
              <Mail />
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <label>Phone</label>
            <div className="input-group">
              <Phone />
              <input
                name="phone"
                type="text"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <label>Password</label>
            <div className="input-group">
              <Lock />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            <button type="button" className="google-btn" onClick={handleGoogleLogin}>
              Continue with Google
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default LoginModal;
