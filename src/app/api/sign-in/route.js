import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import userModel from "@/models/user.js";
import dbConnect from "@/lib/dbConnect.js";

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    // Log the received data for debugging
    console.log("Received data:", { email, password });

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not registered" },
        { status: 404 }
      );
    }

    // Log the user object to check if password exists
    console.log("Fetched user:", user);

    // Check password
    if (!user.password) {
      return NextResponse.json(
        { success: false, message: "Password not set for this user" },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // User exists and password is valid, return user role
    return NextResponse.json(
      { success: true, role: user.role },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}