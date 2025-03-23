import mongoose, { Schema } from "mongoose";
import { boolean } from "zod";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "coordinator", "organizer", "public"],
    default: "",
  },
  college: { type: String, default: "" },
  prefferedLocation: { type: String, default: "" },
  picture: { type: String, default: "" },
  descriptions: { type: String, default: "" },
  rooms: [
    {
      name: { type: String, required: true },
      roomNumber: { type: Number, required: true, unique: true, index: true },
    }
  ],
  createdAt: { type: Date, default: Date.now },
  events: [
    {
      event: { type: Schema.Types.ObjectId, ref: "Event" },
    },
  ],
});

// Prevent duplicate model registration
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
