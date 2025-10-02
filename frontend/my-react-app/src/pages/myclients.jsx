import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCreditCard, FaCalendarAlt } from "react-icons/fa";
import "./myclients.css";
import API_BASE_URL from "../config/api";

function MyClients() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/clients`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setClients(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClients();
  }, []); // empty dependency array → runs once on mount

  if (loading) {
    return (
      <div className="my-clients-container">
        <p className="loading-message">Loading clients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-clients-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="my-clients-container">
      <div className="header-section">
        <h2 className="title">My Clients</h2>
        <p className="subtitle">Select a client to view their details.</p>
      </div>

      <div className="client-list-grid">
        {clients.length > 0 ? (
          clients.map((client) => (
            <div
              key={client._id}
              className="client-card"
              onClick={() => navigate(`/client/${client._id}`)} // Navigate to details page
            >
              <div className="card-icon">
                <FaUserCircle />
              </div>
              <div className="card-content">
                <h3 className="client-name">{client.name}</h3>
                <p className="policy-info">
                  <FaCreditCard className="inline-icon" /> {client.policyName}
                </p>
                <p className="due-date-info">
                  <FaCalendarAlt className="inline-icon" /> Due:{" "}
                  {new Date(client.dueDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-clients-message">You don't have any clients yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyClients;
