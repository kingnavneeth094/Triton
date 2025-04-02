import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import collegeModel from "@/models/college";
import festModel from "@/models/fest";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await dbConnect();

  // Get the logged-in user session
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Find the logged-in user
    const user = await userModel.findOne({ email: session.user.email });

    // Ensure the user is an admin and has a college linked
    if (!user || user.role !== "admin" || !user.college_id) {
      return res.status(404).json({ message: "Admin has no registered college" });
    }

    // Fetch the college linked to this admin
    const college = await collegeModel.findById(user.college_id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Fetch the fest linked to this college
    const fest = await festModel.findOne({ college_id: college._id });

    res.status(200).json({ college, fest });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
