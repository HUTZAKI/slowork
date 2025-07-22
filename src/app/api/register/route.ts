import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongoose";
import User from "@/app/models/User";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password, detail } = await req.json();

    // Validate required fields
    if (!email || !password || !detail) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!detail.name || !detail.role || !detail.phoneNumber || !detail.university) {
      return NextResponse.json(
        { message: "Missing required detail fields." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate userID
    const userCount = await User.countDocuments();
    const userID = userCount + 1;

    await User.create({ 
      userID,
      email, 
      password: hashedPassword, 
      detail 
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
