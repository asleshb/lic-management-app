// src/config.js

const API_URLS = {
  local: "http://localhost:5000",
  production: "https://lic-management-backend.onrender.com",
};

// Automatically detect environment
// NODE_ENV is set by React: 'development' for npm start, 'production' for build
//const CURRENT_ENV = process.env.NODE_ENV === "production" ? "production" : "local";

const CURRENT_ENV = "production";

const API_BASE_URL = API_URLS[CURRENT_ENV];

export default API_BASE_URL;
