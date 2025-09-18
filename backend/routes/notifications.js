import express from "express";
import Client from "../models/Client.js";
const router = express.Router();

router.get("/due-dates", async (req, res) => {
  try {
    // Get today's date, and set the time to the beginning of the day (midnight UTC)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get the date for 7 days from now, and set the time to the end of that day
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);
    sevenDaysFromNow.setHours(23, 59, 59, 999);

    // Find clients whose due date is within the next 7 days
    const dueSoonClients = await Client.find({
      dueDate: {
        $gte: today, // Greater than or equal to the beginning of today
        $lte: sevenDaysFromNow, // Less than or equal to the end of 7 days from now
      },
    });

    // Count clients based on their payment duration for the summary boxes
    const counts = {
      monthly: await Client.countDocuments({ paymentDuration: "monthly" }),
      quarterly: await Client.countDocuments({ paymentDuration: "quarterly" }),
      halfYearly: await Client.countDocuments({
        paymentDuration: "half-yearly",
      }),
      yearly: await Client.countDocuments({ paymentDuration: "yearly" }),
    };

    res.status(200).json({
      notifications: dueSoonClients,
      counts: counts,
    });
  } catch (error) {
    console.error("Error fetching due date notifications:", error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

export default router;
