import mongoose, { Schema } from "mongoose";

const ticketSchema = new mongoose.Schema({
  event_id: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  fest_id: { type: Schema.Types.ObjectId, ref: "Fest", required: true },
  email: { type: String, required: true },
  unique_code: { type: String, required: true, unique: true }, // e.g., "TICKET-XYZ123"
  created_at: { type: Date, default: Date.now },
});

const ticketModel = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default ticketModel;