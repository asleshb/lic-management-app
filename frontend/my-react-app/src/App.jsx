import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/Welcome.jsx";
import Main from "./pages/MainPage.jsx";
import AddClient from "./pages/AddClient.jsx";
import MyClients from "./pages/myclients.jsx";
import Notifications from "./pages/notifications.jsx";

function App() {
  useEffect(() => {
    // Pre-warm backend when app starts
    fetch("https://lic-management-backend.onrender.com/api/ping")
      .then((res) => res.json())
      .then((data) => console.log("Pre-warm success:", data))
      .catch((err) => console.error("Pre-warm failed:", err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/my-clients" element={<MyClients />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App;
