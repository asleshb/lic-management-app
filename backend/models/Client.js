import mongoose from "mongoose";

// Mongoose Schema and Model
const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    policyAmount: { type: Number, required: true },
    policyName: { type: String, required: true },
    startDate: { type: Date, required: true },
    term: { type: Number, required: true },
    paymentDuration: { type: String, required: true },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
