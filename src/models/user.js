import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  picture: { type: String, default: "" }, // AWS S3 Link
  descriptions: { type: [String], default: [] }, // Array of descriptions
  createdAt: { type: Date, default: Date.now },
});

// Prevent duplicate model registration
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
