import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Use bcryptjs for better Next.js compatibility
import userModel from "@/models/user.js";
import dbConnect from "@/lib/dbConnect.js";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json(); // ✅ Fix: Use req.json()

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

    // Create new user
    const newUser = new userModel({ name, email, password: hashedPassword });
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
