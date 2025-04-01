import mongoose, { Schema } from "mongoose";

const festSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  date_time: { type: Date, required: true },
  fee: { type: Number, default: 0 },
  venue: { type: String, default: "" }, // General venue info (e.g., "Main Campus")
  college_id: { type: Schema.Types.ObjectId, ref: "College", required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const festModel = mongoose.models.Fest || mongoose.model("Fest", festSchema);

export default festModel;