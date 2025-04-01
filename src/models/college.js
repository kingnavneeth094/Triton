import mongoose, { Schema } from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const collegeModel = mongoose.models.College || mongoose.model("College", collegeSchema);

export default collegeModel;