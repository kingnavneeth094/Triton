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
      roomNumber: { type: Number, required: true, index: true },
    },
  ],
  numberOfRooms: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  events: [
    {
      event: { type: Schema.Types.ObjectId, ref: "Event" },
    },
  ],
  approvedEvents: [
    {
      event: { type: Schema.Types.ObjectId, ref: "Event" },
    },
  ],
  coordinatorPendingEvents: [
    {
      event: { type: Schema.Types.ObjectId, ref: "Event" },
    },
  ],
  adminPendingEvents: [
    {
      event: { type: Schema.Types.ObjectId, ref: "Event" },
    },
  ],
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
