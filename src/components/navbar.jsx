import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../components/auth/LoginModal";
import "./navbar.css";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage or token
  const loadUserFromStorage = () => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserFromStorage();

    // Sync login state across tabs
    const handleStorageChange = () => loadUserFromStorage();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
  };

  const handleLoginSuccess = (loggedInUser, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setShowModal(false);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">Khushi Jewellers</Link>
          <p className="tagline">Gold and Silver Jewellery Works</p>
        </div>

        <div className="navbar-center">
          <Link to="/">Home</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="navbar-right">
          {!user ? (
            <button className="auth-btn" onClick={() => setShowModal(true)}>Login / Signup</button>
          ) : (
            <div className="user-section">
              <span className="username">Hi, {user?.name || user?.email?.split("@")[0] || "User"} ✨</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>

      {showModal && (
        <LoginModal isOpen={showModal} onClose={() => setShowModal(false)} onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

export default Navbar;

