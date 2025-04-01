import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }, // Added password field
  role: { 
    type: String, 
    enum: ["admin", "venue", "event_coordinator"], 
    required: true 
  },
  college_id: { type: Schema.Types.ObjectId, ref: "College" }, // Optional for Admin
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;