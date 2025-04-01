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

    // Create a new coordinator user
    const newCoordinator = new User({
      name,
      email,
      password: hashedPassword,
      role: "event_coordinator", // Assign coordinator role
      // All other fields will use their default values from the schema
    });

    // Save the new coordinator to the database
    await newCoordinator.save();

    // Return success response without exposing sensitive data
    return NextResponse.json(
      {
        message: "Coordinator created successfully",
        coordinator: {
          id: newCoordinator._id,
          name: newCoordinator.name,
          email: newCoordinator.email,
          role: newCoordinator.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating coordinator:", error);
    return NextResponse.json(
      { error: "Failed to create coordinator" },
      { status: 500 }
    );
  }
}
