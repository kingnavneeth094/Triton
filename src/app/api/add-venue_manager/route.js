import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export async function POST(request) {
  try {
    // Check if the request is from an authenticated admin
    const session = await getServerSession(authOptions);
    console.log(JSON.stringify(session));

    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { name, email, password } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new newVenueManager user
    const newVenueManager = new User({
      name,
      email,
      password: hashedPassword,
      role: "venue", // Assign newVenueManager role
      // All other fields will use their default values from the schema
    });

    // Save the new newVenueManager to the database
    await newVenueManager.save();

    // Return success response without exposing sensitive data
    return NextResponse.json(
      {
        message: "venue manager created successfully",
        venue: {
          id: newVenueManager._id,
          name: newVenueManager.name,
          email: newVenueManager.email,
          role: newVenueManager.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating newVenueManager:", error);
    return NextResponse.json(
      { error: "Failed to create newVenueManager" },
      { status: 500 }
    );
  }
}
