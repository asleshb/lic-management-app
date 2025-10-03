// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import cron from "node-cron";
// import { addMonths, addYears } from "date-fns"; // ➡️ NEW: Import functions from date-fns

// // Import the Client model from the models folder
// import Client from "./models/Client.js";

// // Import the notifications router
// import notificationsRouter from "./routes/notifications.js";

// // Get the current file and directory paths
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Explicitly configure dotenv to load the .env file
// dotenv.config({ path: path.resolve(__dirname, ".env") });

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
//   })
// );
// app.use(express.json());

// // MongoDB Connection
// const mongoUri = process.env.MONGO_URI;

// // Check if the URI is correctly loaded
// if (!mongoUri) {
//   console.error("Error: MONGO_URI is not defined in the .env file.");
//   console.error(
//     "Please make sure the file exists and the variable is set correctly."
//   );
//   process.exit(1); // Exit the process to prevent the server from running without a database connection
// }

// mongoose
//   .connect(mongoUri)
//   .then(() => console.log("Successfully connected to MongoDB!"))
//   .catch((err) => console.error("Could not connect to MongoDB:", err));

// // ➡️ UPDATED: Scheduled Task to automatically update due dates (UTC normalized)
// cron.schedule("0 0 * * *", async () => {
//   console.log("Running scheduled task to update due dates...");

//   try {
//     // Get today's date in UTC
//     const now = new Date();
//     const todayUTC = new Date(
//       Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
//     );

//     // Find all clients whose dueDate is in the past or today (UTC)
//     const overdueClients = await Client.find({ dueDate: { $lte: todayUTC } });

//     for (const client of overdueClients) {
//       // Normalize client's dueDate to UTC start of day
//       const clientDueUTC = new Date(
//         Date.UTC(
//           client.dueDate.getUTCFullYear(),
//           client.dueDate.getUTCMonth(),
//           client.dueDate.getUTCDate()
//         )
//       );

//       if (clientDueUTC.getTime() <= todayUTC.getTime()) {
//         // ➡️ Use date-fns for accurate date calculations
//         let newDueDate;
//         switch (client.paymentDuration) {
//           case "monthly":
//             newDueDate = addMonths(client.dueDate, 1);
//             break;
//           case "quarterly":
//             newDueDate = addMonths(client.dueDate, 3);
//             break;
//           case "half-yearly":
//             newDueDate = addMonths(client.dueDate, 6);
//             break;
//           case "yearly":
//             newDueDate = addYears(client.dueDate, 1);
//             break;
//           default:
//             console.error(`Invalid payment duration for client ${client._id}`);
//             continue; // Skip this client
//         }

//         // Update the client's record with the new due date
//         client.dueDate = newDueDate;
//         await client.save();
//         console.log(
//           `Updated due date for client ${
//             client.name
//           } to ${newDueDate.toLocaleDateString()}`
//         );
//       }
//     }

//     console.log("Scheduled task finished.");
//   } catch (error) {
//     console.error("Error in scheduled task:", error);
//   }
// });

// // API Route to Add a Client
// app.post("/api/clients", async (req, res) => {
//   try {
//     const { startDate, term, paymentDuration, ...rest } = req.body;

//     // ➡️ NEW: Use date-fns for accurate initial due date calculation
//     const start = new Date(startDate);
//     let dueDate;

//     switch (paymentDuration) {
//       case "monthly":
//         dueDate = addMonths(start, 1);
//         break;
//       case "quarterly":
//         dueDate = addMonths(start, 3);
//         break;
//       case "half-yearly":
//         dueDate = addMonths(start, 6);
//         break;
//       case "yearly":
//         dueDate = addYears(start, 1);
//         break;
//       default:
//         // Set a default or handle error if paymentDuration is invalid
//         dueDate = new Date(start);
//         break;
//     }

//     const newClientData = {
//       ...rest,
//       startDate,
//       term,
//       paymentDuration,
//       dueDate, // Add the calculated due date
//     };

//     const newClient = new Client(newClientData);
//     await newClient.save();
//     res
//       .status(201)
//       .json({ message: "Client added successfully", client: newClient });
//   } catch (error) {
//     console.error("Error adding client:", error);
//     res
//       .status(500)
//       .json({ message: "Error adding client", error: error.message });
//   }
// });

// app.get("/api/clients", async (req, res) => {
//   try {
//     const clients = await Client.find({}); // Find all clients in the database
//     res.status(200).json(clients); // Send the clients as a JSON response
//   } catch (error) {
//     console.error("Error fetching clients:", error);
//     res
//       .status(500)
//       .json({ message: "Error fetching clients", error: error.message });
//   }
// });

// // Use the notifications router for its specific routes
// app.use("/api/notifications", notificationsRouter);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import cron from "node-cron";
// import { addMonths, addYears } from "date-fns"; // ➡️ NEW: Import functions from date-fns

// // Import the Client model from the models folder
// import Client from "./models/Client.js";

// // Import the notifications router
// import notificationsRouter from "./routes/notifications.js";

// // Get the current file and directory paths
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Explicitly configure dotenv to load the .env file
// dotenv.config({ path: path.resolve(__dirname, ".env") });

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
//   })
// );
// app.use(express.json());

// // MongoDB Connection
// const mongoUri = process.env.MONGO_URI;

// // Check if the URI is correctly loaded
// if (!mongoUri) {
//   console.error("Error: MONGO_URI is not defined in the .env file.");
//   console.error(
//     "Please make sure the file exists and the variable is set correctly."
//   );
//   process.exit(1); // Exit the process to prevent the server from running without a database connection
// }

// mongoose
//   .connect(mongoUri)
//   .then(() => console.log("Successfully connected to MongoDB!"))
//   .catch((err) => console.error("Could not connect to MongoDB:", err));

// // ➡️ UPDATED: Scheduled Task to automatically update due dates (UTC normalized)
// cron.schedule("0 0 * * *", async () => {
//   console.log("Running scheduled task to update due dates...");

//   try {
//     // Get today's date in UTC
//     const now = new Date();
//     const todayUTC = new Date(
//       Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
//     );

//     // Find all clients whose dueDate is in the past or today (UTC)
//     const overdueClients = await Client.find({ dueDate: { $lte: todayUTC } });

//     for (const client of overdueClients) {
//       // Normalize client's dueDate to UTC start of day
//       const clientDueUTC = new Date(
//         Date.UTC(
//           client.dueDate.getUTCFullYear(),
//           client.dueDate.getUTCMonth(),
//           client.dueDate.getUTCDate()
//         )
//       );

//       if (clientDueUTC.getTime() <= todayUTC.getTime()) {
//         // ➡️ Use date-fns for accurate date calculations
//         let newDueDate;
//         switch (client.paymentDuration) {
//           case "monthly":
//             newDueDate = addMonths(client.dueDate, 1);
//             break;
//           case "quarterly":
//             newDueDate = addMonths(client.dueDate, 3);
//             break;
//           case "half-yearly":
//             newDueDate = addMonths(client.dueDate, 6);
//             break;
//           case "yearly":
//             newDueDate = addYears(client.dueDate, 1);
//             break;
//           default:
//             console.error(`Invalid payment duration for client ${client._id}`);
//             continue; // Skip this client
//         }

//         // Update the client's record with the new due date
//         client.dueDate = newDueDate;
//         await client.save();
//         console.log(
//           `Updated due date for client ${
//             client.name
//           } to ${newDueDate.toLocaleDateString()}`
//         );
//       }
//     }

//     console.log("Scheduled task finished.");
//   } catch (error) {
//     console.error("Error in scheduled task:", error);
//   }
// });

// // API Route to Add a Client
// app.post("/api/clients", async (req, res) => {
//   try {
//     const { startDate, term, paymentDuration, ...rest } = req.body;

//     // ➡️ NEW: Use date-fns for accurate initial due date calculation
//     const start = new Date(startDate);
//     let dueDate;

//     switch (paymentDuration) {
//       case "monthly":
//         dueDate = addMonths(start, 1);
//         break;
//       case "quarterly":
//         dueDate = addMonths(start, 3);
//         break;
//       case "half-yearly":
//         dueDate = addMonths(start, 6);
//         break;
//       case "yearly":
//         dueDate = addYears(start, 1);
//         break;
//       default:
//         // Set a default or handle error if paymentDuration is invalid
//         dueDate = new Date(start);
//         break;
//     }

//     const newClientData = {
//       ...rest,
//       startDate,
//       term,
//       paymentDuration,
//       dueDate, // Add the calculated due date
//     };

//     const newClient = new Client(newClientData);
//     await newClient.save();
//     res
//       .status(201)
//       .json({ message: "Client added successfully", client: newClient });
//   } catch (error) {
//     console.error("Error adding client:", error);
//     res
//       .status(500)
//       .json({ message: "Error adding client", error: error.message });
//   }
// });

// // ➡️ NEW: API Route to Update a Client's Payment Duration
// app.put("/api/clients/:id", async (req, res) => {
//   const { id } = req.params;
//   const { paymentDuration } = req.body;

//   try {
//     const client = await Client.findById(id);

//     if (!client) {
//       return res.status(404).json({ message: "Client not found." });
//     }

//     if (client.hasPaymentDurationUpdated) {
//       return res.status(400).json({
//         message: "Payment duration can only be updated once.",
//       });
//     }

//     let newDueDate;
//     const today = new Date();

//     switch (paymentDuration.toLowerCase()) {
//       case "monthly":
//         newDueDate = addMonths(today, 1);
//         break;
//       case "quarterly":
//         newDueDate = addMonths(today, 3);
//         break;
//       case "half-yearly":
//         newDueDate = addMonths(today, 6);
//         break;
//       case "yearly":
//         newDueDate = addYears(today, 1);
//         break;
//       default:
//         return res.status(400).json({
//           message: "Invalid payment duration provided.",
//         });
//     }

//     client.paymentDuration = paymentDuration;
//     client.dueDate = newDueDate;
//     client.hasPaymentDurationUpdated = true;

//     await client.save();
//     res.status(200).json({ message: "Payment duration updated successfully." });
//   } catch (error) {
//     console.error("Error updating client:", error);
//     res
//       .status(500)
//       .json({ message: "Error updating client", error: error.message });
//   }
// });

// app.get("/api/clients", async (req, res) => {
//   try {
//     const clients = await Client.find({}); // Find all clients in the database
//     res.status(200).json(clients); // Send the clients as a JSON response
//   } catch (error) {
//     console.error("Error fetching clients:", error);
//     res
//       .status(500)
//       .json({ message: "Error fetching clients", error: error.message });
//   }
// });

// // Use the notifications router for its specific routes
// app.use("/api/notifications", notificationsRouter);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import cron from "node-cron";
// import { addMonths, addYears } from "date-fns"; // ➡️ NEW: Import functions from date-fns

// // Import the Client model from the models folder
// import Client from "./models/Client.js";

// // Import the notifications router
// import notificationsRouter from "./routes/notifications.js";

// // Get the current file and directory paths
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Explicitly configure dotenv to load the .env file
// dotenv.config({ path: path.resolve(__dirname, ".env") });

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://lic-management.netlify.app"],
//   })
// );
// app.use(express.json());
// // MongoDB Connection
// const mongoUri = process.env.MONGO_URI;

// // Check if the URI is correctly loaded
// if (!mongoUri) {
//   console.error("Error: MONGO_URI is not defined in the .env file.");
//   console.error(
//     "Please make sure the file exists and the variable is set correctly."
//   );
//   process.exit(1); // Exit the process to prevent the server from running without a database connection
// }

// mongoose
//   .connect(mongoUri)
//   .then(() => console.log("Successfully connected to MongoDB!"))
//   .catch((err) => console.error("Could not connect to MongoDB:", err));

// // ➡️ UPDATED: Scheduled Task to automatically update due dates (UTC normalized)
// cron.schedule("0 0 * * *", async () => {
//   console.log("Running scheduled task to update due dates...");

//   try {
//     // Get today's date in UTC
//     const now = new Date();
//     const todayUTC = new Date(
//       Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
//     );

//     // Find all clients whose dueDate is in the past or today (UTC)
//     const overdueClients = await Client.find({ dueDate: { $lte: todayUTC } });

//     for (const client of overdueClients) {
//       // Normalize client's dueDate to UTC start of day
//       const clientDueUTC = new Date(
//         Date.UTC(
//           client.dueDate.getUTCFullYear(),
//           client.dueDate.getUTCMonth(),
//           client.dueDate.getUTCDate()
//         )
//       );

//       if (clientDueUTC.getTime() <= todayUTC.getTime()) {
//         // ➡️ Use date-fns for accurate date calculations
//         let newDueDate;
//         switch (client.paymentDuration) {
//           case "monthly":
//             newDueDate = addMonths(client.dueDate, 1);
//             break;
//           case "quarterly":
//             newDueDate = addMonths(client.dueDate, 3);
//             break;
//           case "half-yearly":
//             newDueDate = addMonths(client.dueDate, 6);
//             break;
//           case "yearly":
//             newDueDate = addYears(client.dueDate, 1);
//             break;
//           default:
//             console.error(`Invalid payment duration for client ${client._id}`);
//             continue; // Skip this client
//         }

//         // Update the client's record with the new due date
//         client.dueDate = newDueDate;
//         await client.save();
//         console.log(
//           `Updated due date for client ${
//             client.name
//           } to ${newDueDate.toLocaleDateString()}`
//         );
//       }
//     }

//     console.log("Scheduled task finished.");
//   } catch (error) {
//     console.error("Error in scheduled task:", error);
//   }
// });

// // API Route to Add a Client
// app.post("/api/clients", async (req, res) => {
//   try {
//     const { startDate, term, paymentDuration, ...rest } = req.body;

//     // ➡️ NEW: Use date-fns for accurate initial due date calculation
//     const start = new Date(startDate);
//     let dueDate;

//     switch (paymentDuration) {
//       case "monthly":
//         dueDate = addMonths(start, 1);
//         break;
//       case "quarterly":
//         dueDate = addMonths(start, 3);
//         break;
//       case "half-yearly":
//         dueDate = addMonths(start, 6);
//         break;
//       case "yearly":
//         dueDate = addYears(start, 1);
//         break;
//       default:
//         // Set a default or handle error if paymentDuration is invalid
//         dueDate = new Date(start);
//         break;
//     }

//     const newClientData = {
//       ...rest,
//       startDate,
//       term,
//       paymentDuration,
//       dueDate, // Add the calculated due date
//     };

//     const newClient = new Client(newClientData);
//     await newClient.save();
//     res
//       .status(201)
//       .json({ message: "Client added successfully", client: newClient });
//   } catch (error) {
//     console.error("Error adding client:", error);
//     res
//       .status(500)
//       .json({ message: "Error adding client", error: error.message });
//   }
// });

// // ➡️ UPDATED: API Route to Update a Client's Payment Duration
// app.put("/api/clients/:id", async (req, res) => {
//   const { id } = req.params;
//   const { paymentDuration } = req.body;

//   try {
//     const client = await Client.findById(id);

//     if (!client) {
//       return res.status(404).json({ message: "Client not found." });
//     }

//     if (client.hasPaymentDurationUpdated) {
//       return res.status(400).json({
//         message: "Payment duration can only be updated once.",
//       });
//     }

//     let newDueDate;

//     // ✅ Use existing dueDate as the base (not today)
//     switch (paymentDuration.toLowerCase()) {
//       case "monthly":
//         newDueDate = addMonths(client.dueDate, 1);
//         break;
//       case "quarterly":
//         newDueDate = addMonths(client.dueDate, 3);
//         break;
//       case "half-yearly":
//         newDueDate = addMonths(client.dueDate, 6);
//         break;
//       case "yearly":
//         newDueDate = addYears(client.dueDate, 1);
//         break;
//       default:
//         return res.status(400).json({
//           message: "Invalid payment duration provided.",
//         });
//     }

//     client.paymentDuration = paymentDuration;
//     client.dueDate = newDueDate;
//     client.hasPaymentDurationUpdated = true;

//     await client.save();
//     res.status(200).json({ message: "Payment duration updated successfully." });
//   } catch (error) {
//     console.error("Error updating client:", error);
//     res
//       .status(500)
//       .json({ message: "Error updating client", error: error.message });
//   }
// });

// app.get("/api/clients", async (req, res) => {
//   try {
//     const clients = await Client.find({}); // Find all clients in the database
//     res.status(200).json(clients); // Send the clients as a JSON response
//   } catch (error) {
//     console.error("Error fetching clients:", error);
//     res
//       .status(500)
//       .json({ message: "Error fetching clients", error: error.message });
//   }
// });

// // Use the notifications router for its specific routes
// app.use("/api/notifications", notificationsRouter);

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
// Node-cron removed, we replaced it with GitHub Actions/manual trigger
import { addMonths, addYears } from "date-fns";
import Client from "./models/Client.js";
import notificationsRouter from "./routes/notifications.js";
import { updateDueDates } from "./tasks/updateDueDates.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://lic-management.netlify.app"],
  })
);
app.use(express.json());






// -------------------------
// API Route: Add a Client
// -------------------------
app.post("/api/clients", async (req, res) => {
  try {
    const { startDate, term, paymentDuration,hasPaymentDurationUpdated, ...rest } = req.body;

    const start = new Date(startDate);
    let dueDate;

    switch (paymentDuration) {
      case "monthly":
        dueDate = addMonths(start, 1);
        break;
      case "quarterly":
        dueDate = addMonths(start, 3);
        break;
      case "half-yearly":
        dueDate = addMonths(start, 6);
        break;
      case "yearly":
        dueDate = addYears(start, 1);
        break;
      default:
        dueDate = new Date(start);
        break;
    }

    const newClientData = {
      ...rest,
      startDate,
      term,
      paymentDuration,
      dueDate,
      //removed later
      hasPaymentDurationUpdated: hasPaymentDurationUpdated ?? false,
      //till here
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









// -------------------------
// API Route: Update Client Payment Duration
// -------------------------
app.put("/api/clients/:id", async (req, res) => {
  const { id } = req.params;
  const { paymentDuration } = req.body;

  try {
    const client = await Client.findById(id);

    if (!client) return res.status(404).json({ message: "Client not found." });
    if (client.hasPaymentDurationUpdated)
      return res
        .status(400)
        .json({ message: "Payment duration can only be updated once." });

    let newDueDate;
    switch (paymentDuration.toLowerCase()) {
      case "monthly":
        newDueDate = addMonths(client.dueDate, 1);
        break;
      case "quarterly":
        newDueDate = addMonths(client.dueDate, 3);
        break;
      case "half-yearly":
        newDueDate = addMonths(client.dueDate, 6);
        break;
      case "yearly":
        newDueDate = addYears(client.dueDate, 1);
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid payment duration provided." });
    }

    client.paymentDuration = paymentDuration;
    client.dueDate = newDueDate;
    client.hasPaymentDurationUpdated = true;

    await client.save();
    res.status(200).json({ message: "Payment duration updated successfully." });
  } catch (error) {
    console.error("Error updating client:", error);
    res
      .status(500)
      .json({ message: "Error updating client", error: error.message });
  }
});

// -------------------------
// API Route: Get All Clients
// -------------------------
app.get("/api/clients", async (req, res) => {
  try {
    const clients = await Client.find({});
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res
      .status(500)
      .json({ message: "Error fetching clients", error: error.message });
  }
});

// -------------------------
// Notifications Routes
// -------------------------
app.use("/api/notifications", notificationsRouter);

// -------------------------
// Manual Trigger Endpoint for Due Date Update
// -------------------------
app.post("/api/run-due-date-update", async (req, res) => {
  try {
    console.log("Manual trigger: Updating due dates...");
    await updateDueDates();
    res.status(200).json({ message: "Due dates updated successfully." });
  } catch (error) {
    console.error("Error updating due dates:", error);
    res.status(500).json({ message: "Error updating due dates", error });
  }
});

// -------------------------
// Connect MongoDB & Start Server
// -------------------------
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("Error: MONGO_URI is not defined in the .env file.");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
