import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/events";
import User from "@/models/user";

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Please sign in" },
        { status: 401 }
      );
    }

    // Connect to database
    await dbConnect();

    // Parse request body
    const data = await request.json();

    // Format dates properly
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    // Get user from session
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create new event
    const newEvent = new Event({
      title: data.title,
      description: data.description,
      firstPrice: parseFloat(data.firstPrice) || 0,
      secondPrice: parseFloat(data.secondPrice) || 0,
      thirdPrice: parseFloat(data.thirdPrice) || 0,
      totalParticipants: data.totalParticipants || 0,
      RoomLocation: data.prefferedLocation1 || data.prefferedLocation2 || "",
      startDate,
      endDate,
      organizer: user._id,
      participants: [],
      status: "pending", // Set initial status to pending for approval
    });

    // Save event to database
    await newEvent.save();

    // Add event reference to user's events array
    await User.findByIdAndUpdate(user._id, {
      $push: { events: { event: newEvent._id } },
    });

    return NextResponse.json(
      {
        message: "Event request submitted successfully",
        eventId: newEvent._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting event request:", error);
    return NextResponse.json(
      { error: "Failed to submit event request" },
      { status: 500 }
    );
  }
}
