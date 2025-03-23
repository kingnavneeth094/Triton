import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import userModel from "@/models/user.js";
import dbConnect from "@/lib/dbConnect.js";
import Event from "@/models/events";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password, role, college, numberOfRooms } = await req.json();
    console.log(numberOfRooms);

    // Check if user already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with all fields from the schema
    const userData = {
      name,
      email,
      password: hashedPassword,
      role: role || "",
      college: college || "",
      picture: "",
      descriptions: "",
      numberOfRooms: 0, // Add default value
    };
    
    // Set numberOfRooms if provided
    if (numberOfRooms !== undefined && numberOfRooms !== null) {
      userData.numberOfRooms = Number(numberOfRooms);
    }
    
    const newUser = new userModel(userData);
    console.log("User to be saved:", newUser);
    
    await newUser.save();

    return NextResponse.json(
      { success: true, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    // Fetch all events with status "approved"
    const events = await Event.find({ status: "approved" })
      .sort({ startDate: 1 }) // Sort by start date in ascending order
      .select('title description startDate endDate RoomLocation maxParticipants totalParticipants'); // Select only needed fields

    if (!events || events.length === 0) {
      return NextResponse.json(
        { success: false, message: "No approved events found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, events },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}