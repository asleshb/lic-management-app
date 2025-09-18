import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css"; // Import the separate CSS file
import { FaUserCircle } from "react-icons/fa"; // Keep react-icons for the icon
import API_BASE_URL from "../config/api";

// The main WelcomePage component with CSS class names.
function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      {" "}
      <div className="welcome-box">
        {" "}
        <div className="user-icon">
          <FaUserCircle />{" "}
        </div>{" "}
        <div className="welcome-content">
          <h1>Welcome to Client Hub</h1>{" "}
          <p>
            Manage your clients, track license renewals, and stay organized with
            ease.{" "}
          </p>{" "}
          <button onClick={() => navigate("/main")} className="start-button">
            Get Started{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      <div className="welcome-footer">
        <p>Your business management solution.</p>{" "}
      </div>{" "}
    </div>
  );
}

export default WelcomePage;

// import React from "react";
// import "./Welcome.css";

// export default function Login() {
//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h1 className="title">Welcome Back</h1>
//         <p className="subtitle">Please login to your account</p>

//         <form className="login-form">
//           <input type="email" placeholder="Email" required />
//           <input type="password" placeholder="Password" required />
//           <button type="submit">Login</button>
//         </form>

//         <p className="signup-text">
//           Don’t have an account? <a href="#">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   );
// }
