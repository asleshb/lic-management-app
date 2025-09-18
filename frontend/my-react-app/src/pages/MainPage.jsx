import React from "react";
import API_BASE_URL from "../config/api";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaBell,
  FaHistory,
  FaCalendarAlt,
  FaListAlt,
  FaMemory,
} from "react-icons/fa";
import "./MainPage.css";

// Header component with a professional and clean design.
const Header = () => (
  <header className="header">
    <div className="header-container">
      <h1 className="text-4xl font-extrabold tracking-tight">Client Hub</h1>
      <nav className="space-x-4">
        <a
          href="#"
          className="hover:text-white transition-colors duration-200 font-medium"
        >
          Home
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors duration-200 font-medium"
        >
          About
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors duration-200 font-medium"
        >
          Contact
        </a>
      </nav>
    </div>
  </header>
);

// Footer component with a simple copyright notice and branding.
const Footer = () => (
  <footer className="footer">
    <div className="container mx-auto">
      <p>&copy; 2024 Client Hub. All rights reserved.</p>
    </div>
  </footer>
);

// Main dashboard component with buttons for different functionalities.
function Main() {
  // Corrected function name
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <Header />
      <main className="main-content">
        {/* Main content container with a modern box design */}
        <div className="dashboard-card">
          <div className="dashboard-title">
            <h2>Main Dashboard</h2>
            <p>Manage your clients and view business information.</p>
          </div>

          {/* Responsive grid of buttons for different functionalities */}
          <div className="button-grid">
            <div
              className="button-card add-client"
              onClick={() => navigate("/add-client")} // Navigate to the new page
            >
              <FaPlus />
              <span>Add Client</span>
            </div>

            {/* NEW: My Clients Button */}
            <div
              className="button-card my-clients"
              onClick={() => navigate("/my-clients")} // Navigate to the new "My Clients" page
            >
              <FaListAlt />
              <span>My Clients</span>
            </div>

            <div
              className="button-card notifications"
              onClick={() => navigate("/notifications")}
            >
              <FaListAlt />
              <span>Notifications</span>
            </div>

            <div className="button-card history">
              <FaHistory />
              <span>Show History</span>
            </div>

            <div className="button-card due-dates">
              <FaCalendarAlt />
              <span>Due Dates</span>
            </div>

            <div className="button-card space">
              <FaMemory />
              <span>space</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Main;
