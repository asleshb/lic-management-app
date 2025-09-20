import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cron from "node-cron"; // ➡️ NEW: Import the node-cron library

// Import the Client model from the models folder
import Client from "./models/Client.js";

// Import the notifications router
import notificationsRouter from "./routes/notifications.js";

// Get the current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly configure dotenv to load the .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lic-management-frontend.onrender.com",
    ],
  })
);
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;

// Check if the URI is correctly loaded
if (!mongoUri) {
  console.error("Error: MONGO_URI is not defined in the .env file.");
  console.error(
    "Please make sure the file exists and the variable is set correctly."
  );
  process.exit(1); // Exit the process to prevent the server from running without a database connection
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// ➡️ NEW: Scheduled Task to automatically update due dates
cron.schedule("0 0 * * *", async () => {
  console.log("Running scheduled task to update due dates...");

  // Get today's date
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Set time to midnight for comparison

  try {
    // Find all clients whose dueDate is in the past
    const overdueClients = await Client.find({ dueDate: { $lte: now } });

    for (const client of overdueClients) {
      let newDueDate = new Date(client.dueDate); // Start with the old due date

      // Calculate the next due date based on payment duration
      switch (client.paymentDuration) {
        case "monthly":
          newDueDate.setMonth(newDueDate.getMonth() + 1);
          break;
        case "quarterly":
          newDueDate.setMonth(newDueDate.getMonth() + 3);
          break;
        case "half-yearly":
          newDueDate.setMonth(newDueDate.getMonth() + 6);
          break;
        case "yearly":
          newDueDate.setFullYear(newDueDate.getFullYear() + 1);
          break;
        default:
          console.error(`Invalid payment duration for client ${client._id}`);
          continue; // Skip this client
      }

      // Update the client's record with the new due date
      client.dueDate = newDueDate;
      await client.save();
      console.log(
        `Updated due date for client ${
          client.name
        } to ${newDueDate.toLocaleDateString()}`
      );
    }

    console.log("Scheduled task finished.");
  } catch (error) {
    console.error("Error in scheduled task:", error);
  }
});

// API Route to Add a Client
app.post("/api/clients", async (req, res) => {
  try {
    // Destructure the request body, removing premiumAmount if it's there
    const { startDate, term, paymentDuration, ...rest } = req.body;

    // Calculate the dueDate based on startDate and paymentDuration
    const start = new Date(startDate);
    let dueDate;
    switch (paymentDuration) {
      case "monthly":
        dueDate = new Date(
          start.getFullYear(),
          start.getMonth() + 1,
          start.getDate()
        );
        break;
      case "quarterly":
        dueDate = new Date(
          start.getFullYear(),
          start.getMonth() + 3,
          start.getDate()
        );
        break;
      case "half-yearly":
        dueDate = new Date(
          start.getFullYear(),
          start.getMonth() + 6,
          start.getDate()
        );
        break;
      case "yearly":
        dueDate = new Date(
          start.getFullYear() + 1,
          start.getMonth(),
          start.getDate()
        );
        break;
      default:
        // Set a default or handle error if paymentDuration is invalid
        dueDate = new Date(start);
        break;
    }

    const newClientData = {
      ...rest,
      startDate,
      term,
      paymentDuration,
      dueDate, // Add the calculated due date
    };

    const newClient = new Client(newClientData);
    await newClient.save();
    res
      .status(201)
      .json({ message: "Client added successfully", client: newClient });
  } catch (error) {
    console.error("Error adding client:", error);
    res
      .status(500)
      .json({ message: "Error adding client", error: error.message });
  }
});

app.get("/api/clients", async (req, res) => {
  try {
    const clients = await Client.find({}); // Find all clients in the database
    res.status(200).json(clients); // Send the clients as a JSON response
  } catch (error) {
    console.error("Error fetching clients:", error);
    res
      .status(500)
      .json({ message: "Error fetching clients", error: error.message });
  }
});

// Use the notifications router for its specific routes
app.use("/api/notifications", notificationsRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
