import { connectToDatabase } from "@/utils/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const coordinators = await User.find({ role: "event_coordinator" })
      .select("_id name email college_id")
      .populate("college_id", "name");

    console.log(coordinators);

    return NextResponse.json(coordinators, { status: 200 });
  } catch (error) {
    console.error("Error fetching coordinators:", error);
    return NextResponse.json(
      { error: "Failed to fetch coordinators" },
      { status: 500 }
    );
  }
}
