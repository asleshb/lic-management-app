// import React, { useState, useEffect } from "react";
// import API_BASE_URL from "../config/api";
// import { useNavigate } from "react-router-dom";
// import {
//   FaCalendar,
//   FaCalendarCheck,
//   FaCalendarAlt,
//   FaCalendarDay,
//   FaSpinner,
//   FaTimes, // Import this for the close icon
// } from "react-icons/fa";
// import "./Notifications.css";

// // A simple component to display a summary box
// const SummaryBox = ({ title, count, icon, color }) => (
//   <div className="summary-box" style={{ backgroundColor: color }}>
//     <div className="box-icon">{icon}</div>
//     <div className="box-content">
//       <h3 className="box-title">{title}</h3>
//       <p className="box-count">{count}</p>
//     </div>
//   </div>
// );

// // New component for the Update Modal/Popup
// const UpdateModal = ({ isOpen, onClose, client, onUpdatePayment }) => {
//   if (!isOpen || !client) return null; // Conditional rendering for the modal

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="modal-close" onClick={onClose}>
//           <FaTimes />
//         </button>
//         <h3 className="modal-title">Update Payment for {client.name}</h3>
//         <p className="modal-subtitle">Select the new payment frequency:</p>
//         <div className="update-options">
//           <button
//             className="update-option-button"
//             onClick={() => onUpdatePayment(client._id, "Monthly")}
//           >
//             Monthly
//           </button>
//           <button
//             className="update-option-button"
//             onClick={() => onUpdatePayment(client._id, "Quarterly")}
//           >
//             Quarterly
//           </button>
//           <button
//             className="update-option-button"
//             onClick={() => onUpdatePayment(client._id, "Half-Yearly")}
//           >
//             Half-Yearly
//           </button>
//           <button
//             className="update-option-button"
//             onClick={() => onUpdatePayment(client._id, "Yearly")}
//           >
//             Yearly
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// function Notifications() {
//   const navigate = useNavigate();

//   const [counts, setCounts] = useState({
//     monthly: 0,
//     quarterly: 0,
//     halfYearly: 0,
//     yearly: 0,
//   });

//   const [notifications, setNotifications] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // New state variables for the modal
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentClient, setCurrentClient] = useState(null);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/notifications/due-dates`
//         );
//         if (!response.ok) throw new Error("Failed to fetch notifications");
//         const data = await response.json();
//         setNotifications(data.notifications);
//         setCounts(data.counts);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchNotifications();
//   }, []);

//   const handleUpdate = (client) => {
//     setCurrentClient(client);
//     setIsModalOpen(true);
//   };

//   const handleUpdatePayment = async (clientId, newFrequency) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/clients/${clientId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ paymentDuration: newFrequency }),
//       });
//       if (!response.ok) throw new Error("Failed to update payment duration.");

//       // After a successful update, close the modal and refresh the data
//       setIsModalOpen(false);
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="notifications-container loading-state">
//         <FaSpinner className="spinner" />
//         <p>Loading notifications...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="notifications-container error-state">
//         <p>Error: {error}</p>
//         <p>Please check your backend server.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="notifications-container">
//       <div className="notifications-header">
//         <h2 className="notifications-title">Payment Due Dates</h2>
//         <p className="notifications-subtitle">
//           Get a quick overview of upcoming payments.
//         </p>
//       </div>

//       <div className="summary-boxes-grid">
//         <SummaryBox
//           title="Monthly"
//           count={counts.monthly}
//           icon={<FaCalendarDay />}
//           color="#38a169"
//         />
//         <SummaryBox
//           title="Quarterly"
//           count={counts.quarterly}
//           icon={<FaCalendar />}
//           color="#805ad5"
//         />
//         <SummaryBox
//           title="Half-Yearly"
//           count={counts.halfYearly}
//           icon={<FaCalendarCheck />}
//           color="#dd6b20"
//         />
//         <SummaryBox
//           title="Yearly"
//           count={counts.yearly}
//           icon={<FaCalendarAlt />}
//           color="#3182ce"
//         />
//       </div>

//       <div className="notifications-list-section">
//         <h3 className="section-title">Upcoming Due Dates</h3>
//         {notifications.length > 0 ? (
//           <div className="notification-list-scroll">
//             {notifications.map((client) => (
//               <div key={client._id} className="notification-item">
//                 <div className="notification-content">
//                   <p className="client-name">{client.name}</p>
//                   <p className="due-date-text">
//                     Due on:{" "}
//                     {new Date(client.dueDate).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "numeric",
//                     })}
//                   </p>
//                   <p className="payment-frequency">{client.paymentDuration}</p>
//                 </div>
//                 <div className="notification-actions">
//                   <a
//                     href={`tel:${client.mobileNumber}`}
//                     className="client-phone"
//                   >
//                     {client.mobileNumber}
//                   </a>
//                   <button
//                     className="update-button"
//                     onClick={() => handleUpdate(client)}
//                   >
//                     Update
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="placeholder-text">
//             No clients have a due date in the next 7 days.
//           </p>
//         )}
//       </div>

//       {/* The new modal component is rendered here */}
//       <UpdateModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         client={currentClient}
//         onUpdatePayment={handleUpdatePayment}
//       />
//     </div>
//   );
// }

// export default Notifications;

import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config/api";
import { useNavigate } from "react-router-dom";
import {
  FaCalendar,
  FaCalendarCheck,
  FaCalendarAlt,
  FaCalendarDay,
  FaSpinner,
  FaTimes, // Import this for the close icon
} from "react-icons/fa";
import "./Notifications.css";

// A simple component to display a summary box
const SummaryBox = ({ title, count, icon, color }) => (
  <div className="summary-box" style={{ backgroundColor: color }}>
    <div className="box-icon">{icon}</div>
    <div className="box-content">
      <h3 className="box-title">{title}</h3>
      <p className="box-count">{count}</p>
    </div>
  </div>
);

// New component for the Update Modal/Popup
const UpdateModal = ({ isOpen, onClose, client, onUpdatePayment }) => {
  if (!isOpen || !client) return null; // Conditional rendering for the modal

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <h3 className="modal-title">Update Payment for {client.name}</h3>
        <p className="modal-subtitle">Select the new payment frequency:</p>
        <div className="update-options">
          <button
            className="update-option-button"
            onClick={() => onUpdatePayment(client._id, "monthly")}
          >
            Monthly
          </button>
          <button
            className="update-option-button"
            onClick={() => onUpdatePayment(client._id, "quarterly")}
          >
            Quarterly
          </button>
          <button
            className="update-option-button"
            onClick={() => onUpdatePayment(client._id, "half-yearly")}
          >
            Half-Yearly
          </button>
          <button
            className="update-option-button"
            onClick={() => onUpdatePayment(client._id, "yearly")}
          >
            Yearly
          </button>
        </div>
      </div>
    </div>
  );
};

function Notifications() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    monthly: 0,
    quarterly: 0,
    halfYearly: 0,
    yearly: 0,
  });

  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state variables for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/notifications/due-dates`
        );
        if (!response.ok) throw new Error("Failed to fetch notifications");
        const data = await response.json();
        setNotifications(data.notifications);
        setCounts(data.counts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleUpdate = (client) => {
    setCurrentClient(client);
    setIsModalOpen(true);
  };

  const handleUpdatePayment = async (clientId, newFrequency) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clients/${clientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentDuration: newFrequency }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update payment duration."
        );
      }

      // After a successful update, close the modal and refresh the data
      setIsModalOpen(false);
      // Refresh the page to show the updated state (without the button)
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err.message); // Show the error message to the user
    }
  };

  if (isLoading) {
    return (
      <div className="notifications-container loading-state">
        <FaSpinner className="spinner" />
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notifications-container error-state">
        <p>Error: {error}</p>
        <p>Please check your backend server.</p>
      </div>
    );
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2 className="notifications-title">Payment Due Dates</h2>
        <p className="notifications-subtitle">
          Get a quick overview of upcoming payments.
        </p>
      </div>

      <div className="summary-boxes-grid">
        <SummaryBox
          title="Monthly"
          count={counts.monthly}
          icon={<FaCalendarDay />}
          color="#38a169"
        />
        <SummaryBox
          title="Quarterly"
          count={counts.quarterly}
          icon={<FaCalendar />}
          color="#805ad5"
        />
        <SummaryBox
          title="Half-Yearly"
          count={counts.halfYearly}
          icon={<FaCalendarCheck />}
          color="#dd6b20"
        />
        <SummaryBox
          title="Yearly"
          count={counts.yearly}
          icon={<FaCalendarAlt />}
          color="#3182ce"
        />
      </div>

      <div className="notifications-list-section">
        <h3 className="section-title">Upcoming Due Dates</h3>
        {notifications.length > 0 ? (
          <div className="notification-list-scroll">
            {notifications.map((client) => (
              <div key={client._id} className="notification-item">
                <div className="notification-content">
                  <p className="client-name">{client.name}</p>
                  <p className="due-date-text">
                    Due on:{" "}
                    {new Date(client.dueDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <p className="payment-frequency">{client.paymentDuration}</p>
                </div>
                <div className="notification-actions">
                  {/* The conditional check is added here */}
                  {!client.hasPaymentDurationUpdated && (
                    <button
                      className="update-button"
                      onClick={() => handleUpdate(client)}
                    >
                      Update
                    </button>
                  )}
                  <a
                    href={`tel:${client.mobileNumber}`}
                    className="client-phone"
                  >
                    {client.mobileNumber}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="placeholder-text">
            No clients have a due date in the next 7 days.
          </p>
        )}
      </div>

      {/* The new modal component is rendered here */}
      <UpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        client={currentClient}
        onUpdatePayment={handleUpdatePayment}
      />
    </div>
  );
}

export default Notifications;
