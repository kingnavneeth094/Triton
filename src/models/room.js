import mongoose, { Schema } from "mongoose";

const roomSchema = new mongoose.Schema({
  room_number: { type: String, required: true, unique: true },
  college_id: { type: Schema.Types.ObjectId, ref: "College", required: true },
  status: { 
    type: String, 
    enum: ["available", "taken"], 
    default: "available" 
  },
  capacity: { type: Number, default: 0 }, // Optional: max capacity
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const roomModel = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default roomModel;