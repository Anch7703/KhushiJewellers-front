import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import  {jwtDecode} from "jwt-decode"; // fixed import
import WhatsAppFloating from "./components/whatsappFloating";
// Components
import Navbar from "./components/navbar";
import Footer from "./pages/footer";
import "./App.css";


// Pages
import Home from "./pages/Home";
import Silver from "./pages/Silver";
import Gold from "./pages/Gold";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import ProductListing from "./pages/ProductListing";
import axios from "/src/api/axios";
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);

      try {
        const decoded = jwtDecode(token);
        const user = { id: decoded.id, role: decoded.role, name: decoded.name || "" };
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }

      window.history.replaceState({}, document.title, "/");
      navigate("/"); // optional
    }
  }, [navigate]);

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/silver" element={<Silver />} />
          <Route path="/gold" element={<Gold />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/WhatsAppFloating" element={<WhatsAppFloating />} />
          <Route path="/axios" element={<axios />} />
        </Routes>
      </main>
      <Footer /> {/* Always visible at the bottom */}
    </div>
  );
}

export default AppWrapper;
