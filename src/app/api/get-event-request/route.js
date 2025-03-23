import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/events";
import User from "@/models/user";

export async function GET(request) {
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

    // Get user from session
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the event ID from the URL query parameters
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    if (eventId) {
      // If eventId is provided, get specific event
      const event = await Event.findById(eventId).populate("organizer", "name email");
      
      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
      
      // Check if user is the organizer or has admin/coordinator role
      if (
        event.organizer._id.toString() !== user._id.toString() && 
        !["admin", "coordinator"].includes(user.role)
      ) {
        return NextResponse.json(
          { error: "Unauthorized: You don't have permission to view this event" },
          { status: 403 }
        );
      }
      
      return NextResponse.json({ event }, { status: 200 });
    } else {
      // If no eventId provided, get the most recently submitted event
      const latestEvent = await Event.findOne({ organizer: user._id })
        .sort({ createdAt: -1 })
        .populate("organizer", "name email");
      
      if (!latestEvent) {
        return NextResponse.json({ error: "No events found" }, { status: 404 });
      }
      
      return NextResponse.json({ event: latestEvent }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching event request:", error);
    return NextResponse.json(
      { error: "Failed to fetch event request" },
      { status: 500 }
    );
  }
}
