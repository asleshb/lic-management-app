import Client from "../models/Client.js";


import { addMonths, addYears } from "date-fns";

export async function updateDueDates() {
  const now = new Date();
  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );

  const overdueClients = await Client.find({dueDate: { $lte: todayUTC }});

  for (const client of overdueClients) {
    const clientDueUTC = new Date(
      Date.UTC(
        client.dueDate.getUTCFullYear(),
        client.dueDate.getUTCMonth(),
        client.dueDate.getUTCDate()
      )
    );
    if (clientDueUTC.getTime() <= todayUTC.getTime()) {
      let newDueDate;
      switch (client.paymentDuration) {
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
          continue;
      }
      client.dueDate = newDueDate;
      await client.save();
      console.log(
        `Updated due date for client ${
          client.name
        } to ${newDueDate.toLocaleDateString()}`
      );
    }
  }
}
