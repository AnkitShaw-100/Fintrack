import React from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090a] text-gray-200">
      <Navbar />

      <div className="flex-1">
        {children}
      </div>

      <Footer />
    </div>
  );
}
