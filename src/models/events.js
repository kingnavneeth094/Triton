import mongoose, { Schema } from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  firstPrice: { type: Number, default: 0 },
  secondPrice: { type: Number, default: 0 },
  thirdPrice: { type: Number, default: 0 },
  maxParticipants: { type: Number, default: 0 },
  RoomLocation: { type: String, default: "" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
  participants: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      registeredAt: { type: Date, default: Date.now },
      pricePaid: { type: Number },
    },
  ],
  status: {
    type: String,
    enum: ["notApplied", "pending", "accepted", "rejected"],
    default: "notApplied",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Prevent duplicate model registration
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
