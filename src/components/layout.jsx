import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/auth/LoginModal";
import Navbar from "./navbar";
import Footer from "../footer";
export default function Layout() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Khushi Jewellers
          </Link>

          {/* Nav Links */}
         
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4">
        <p className="text-sm text-gray-600">© 2025 Khushi Jewellers</p>
      </footer>
</div>
  );
}
