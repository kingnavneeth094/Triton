import dbConnect from "../../utils/dbConnect";
import User from "../../models/userModel";
import College from "../../models/collegeModel";
import Fest from "../../models/festModel";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  await dbConnect();

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await User.findOne({ email: session.user.email });

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can add college and fest" });
    }

    // Prevent duplicate college registration
    if (user.college_id) {
      return res.status(400).json({ error: "Admin is already linked to a college" });
    }

    const { collegeName, location, festName, startDate, endDate, description, fee } = req.body;

    if (!collegeName || !location || !festName || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create new college
    const newCollege = new College({
      name: collegeName,
      location,
    });
    await newCollege.save();

    // Create new fest linked to this college
    const newFest = new Fest({
      name: festName,
      description,
      date_time: startDate,
      fee: fee || 0,
      venue: location,
      college_id: newCollege._id,
    });
    await newFest.save();

    // Link this college to the admin
    user.college_id = newCollege._id;
    await user.save();

    res.status(201).json({ message: "College and Fest added successfully", college: newCollege, fest: newFest });
  } catch (error) {
    console.error("Error adding college and fest:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
