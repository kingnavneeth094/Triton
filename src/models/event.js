import mongoose, { Schema } from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  fee: { type: Number, default: 0 },
  date_time: { type: Date, required: true },
  venue: {
    room_id: { type: Schema.Types.ObjectId, ref: "Room" },
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected"], 
      default: "pending" 
    },
  },
  picture: { type: String, default: "" }, // URL or file path to event picture
  fest_id: { type: Schema.Types.ObjectId, ref: "Fest", required: true },
  coordinator_id: { type: Schema.Types.ObjectId, ref: "User" }, // Event Coordinator
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const eventModel = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default eventModel;