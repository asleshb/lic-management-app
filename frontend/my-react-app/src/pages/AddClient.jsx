import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddClient.css"; // Import the CSS for styling
import API_BASE_URL from "../config/api";

// A list of random policy names to populate the dropdown
const policyOptions = [
  "Golden Shield",
  "Evergreen Plan",
  "Liberty Life",
  "Secure Future",
  "Summit Safeguard",
  "Prime Protection",
];

// A list of term years for the dropdown
const termOptions = [1, 5, 10, 15, 20, 25, 30];

// Main component for adding a new client
function AddClient() {
  const navigate = useNavigate();
  // State to hold form data
  const [clientData, setClientData] = useState({
    name: "",
    mobileNumber: "",
    policyAmount: "",
    policyName: "",
    startDate: "",
    term: "",
    paymentDuration: "",
    /*this also removed later */
    hasPaymentDurationUpdated: "false",
  });

  // State to hold validation errors for each field
  const [errors, setErrors] = useState({});

  // State for a top-level form error message
  const [formError, setFormError] = useState("");

  // Function to handle form input changes, including dropdowns
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  // Validation function to check if all required fields are filled
  const validateForm = () => {
    const newErrors = {};
    if (!clientData.name) newErrors.name = "Name is required";
    if (!clientData.mobileNumber)
      newErrors.mobileNumber = "Mobile number is required";
    if (!clientData.policyAmount)
      newErrors.policyAmount = "Policy amount is required";
    if (!clientData.policyName)
      newErrors.policyName = "Policy name is required";
    if (!clientData.startDate) newErrors.startDate = "Start date is required";
    if (!clientData.term) newErrors.term = "Policy term is required";
    if (!clientData.paymentDuration)
      newErrors.paymentDuration = "Payment duration is required";
    return newErrors;
  };

  // Function to handle form submission and send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      // Set the errors and display a general error message
      setErrors(validationErrors);
      setFormError("Please fill in all required fields.");
    } else {
      // Reset errors and send data to backend
      setErrors({});
      setFormError("");
      try {
        // this also removed later
        const payload = {
          ...clientData,
          hasPaymentDurationUpdated:
            clientData.hasPaymentDurationUpdated === "true",
        };
        //till here

        // Send a POST request to your backend API
        const response = await fetch(`${API_BASE_URL}/api/clients`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Client added successfully:", result.client);
          // Instead of alert, you might show a success message on the page
          setClientData({
            name: "",
            mobileNumber: "",
            policyAmount: "",
            policyName: "",
            startDate: "",
            term: "",
            paymentDuration: "",
            hasPaymentDurationUpdated: "false",
          });
          navigate("/main");
        } else {
          // Handle server errors
          const errorData = await response.json();
          console.error("Error from server:", errorData);
          setFormError(`Failed to add client. Error: ${errorData.message}`);
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error);
        setFormError("A network error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="add-client-container">
      <div className="add-client-form-card">
        <h2 className="form-title">Add New Client</h2>
        {formError && <p className="form-error-message">{formError}</p>}
        <form onSubmit={handleSubmit}>
          {/* Client Name Input */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={clientData.name}
              onChange={handleChange}
              className="form-input"
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          {/* Mobile Number Input */}
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={clientData.mobileNumber}
              onChange={handleChange}
              className="form-input"
            />
            {errors.mobileNumber && (
              <p className="error-message">{errors.mobileNumber}</p>
            )}
          </div>

          {/* Policy Amount Input */}
          <div className="form-group">
            <label htmlFor="policyAmount">Policy Amount</label>
            <input
              type="number"
              id="policyAmount"
              name="policyAmount"
              value={clientData.policyAmount}
              onChange={handleChange}
              className="form-input"
            />
            {errors.policyAmount && (
              <p className="error-message">{errors.policyAmount}</p>
            )}
          </div>

          {/* Policy Name Dropdown */}
          <div className="form-group">
            <label htmlFor="policyName">Policy Name</label>
            <select
              id="policyName"
              name="policyName"
              value={clientData.policyName}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select a Policy</option>
              {policyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.policyName && (
              <p className="error-message">{errors.policyName}</p>
            )}
          </div>

          {/* Start Date Input */}
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={clientData.startDate}
              onChange={handleChange}
              className="form-input"
            />
            {errors.startDate && (
              <p className="error-message">{errors.startDate}</p>
            )}
          </div>

          {/* Term Dropdown */}
          <div className="form-group">
            <label htmlFor="term">Term</label>
            <select
              id="term"
              name="term"
              value={clientData.term}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select a Term</option>
              {termOptions.map((option) => (
                <option key={option} value={option}>
                  {option} Years
                </option>
              ))}
            </select>
            {errors.term && <p className="error-message">{errors.term}</p>}
          </div>

          {/* Payment Duration Dropdown */}
          <div className="form-group">
            <label htmlFor="paymentDuration">Payment Duration</label>
            <select
              id="paymentDuration"
              name="paymentDuration"
              value={clientData.paymentDuration}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Payment Frequency</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="half-yearly">Half-Yearly</option>
              <option value="yearly">Yearly</option>
            </select>
            {errors.paymentDuration && (
              <p className="error-message">{errors.paymentDuration}</p>
            )}
          </div>

          {/* Has Payment Duration Updated (Checkbox)
             this is s anew part added for just a couple of time later it will removed*/}
          <div className="form-group">
            <label htmlFor="hasPaymentDurationUpdated">
              Has Payment Duration Already Updated?
            </label>
            <select
              id="hasPaymentDurationUpdated"
              name="hasPaymentDurationUpdated"
              value={clientData.hasPaymentDurationUpdated}
              onChange={handleChange}
              className="form-input"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          {/* till here*/}

          <div className="button-group">
            <button type="submit" className="submit-button">
              Add Client
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/main")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddClient;
