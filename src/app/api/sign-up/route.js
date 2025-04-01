import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import userModel from "@/models/user.js";
import dbConnect from "@/lib/dbConnect.js";

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