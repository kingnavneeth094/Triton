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

    // For multipart form data
    const formData = await request.formData();
    
    // Get file and event ID from form data
    const file = formData.get('pdfFile');
    const eventId = formData.get('eventId');
    
    if (!file) {
      return NextResponse.json(
        { error: "No PDF file provided" },
        { status: 400 }
      );
    }

    if (!eventId) {
      return NextResponse.json(
        { error: "No event ID provided" },
        { status: 400 }
      );
    }

    // Read file as buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const contentType = file.type;

    // Get user from session
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update only the PDF file for the specific event using ID
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        pdfFile: {
          data: fileBuffer,
          contentType: contentType
        }
      },
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Rules PDF updated successfully",
        eventTitle: updatedEvent.title,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating rules PDF:", error);
    return NextResponse.json(
      { error: "Failed to update rules PDF" },
      { status: 500 }
    );
  }
}