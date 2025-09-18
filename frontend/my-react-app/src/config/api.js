const API_URLS = {
  local: "http://localhost:5000", // when running on your laptop
  mobile: "http://192.168.1.10:5000", // replace with your PC IP for phone testing
  production: "https://your-backend.onrender.com", // when deployed to Render
};

const CURRENT_ENV = "local"; // change this to "mobile" or "production" when needed

const API_BASE_URL = API_URLS[CURRENT_ENV];

export default API_BASE_URL;
