import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserCircle,
  FaCreditCard,
  FaCalendarAlt,
} from "react-icons/fa";
import API_BASE_URL from "../config/api";
import "./clientdetails.css";

function ClientDetails() {
  const { id } = useParams(); // Get client ID from URL
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/clients/${id}`);
        if (!response.ok) throw new Error("Failed to fetch client details");

        const data = await response.json();
        setClient(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  if (loading)
    return <p className="loading-message">Loading client details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!client) return <p className="error-message">No client found.</p>;

  return (
    <div className="client-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <div className="client-card-details">
        <div className="icon-section">
          <FaUserCircle className="client-icon" />
        </div>

        <div className="details-section">
          <h2>{client.name}</h2>
          <p>
            <FaCreditCard className="inline-icon" /> Policy: {client.policyName}
          </p>
          <p>
            <FaCalendarAlt className="inline-icon" /> Start Date:{" "}
            {new Date(client.startDate).toLocaleDateString()}
          </p>
          <p>
            <FaCalendarAlt className="inline-icon" /> Due Date:{" "}
            {new Date(client.dueDate).toLocaleDateString()}
          </p>
          <p>Policy Amount: ₹{client.policyAmount}</p>
          <p>Payment Duration: {client.paymentDuration}</p>
          <p>Term: {client.term} years</p>
        </div>
      </div>
    </div>
  );
}

export default ClientDetails;
