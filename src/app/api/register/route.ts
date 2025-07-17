import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongoose";
import User from "@/app/models/User";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
