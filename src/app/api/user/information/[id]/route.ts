import { NextRequest, NextResponse } from "next/server";
// import connectDb from "@/app/lib/mongoose";
import{ connectDB } from "@/app/lib/mongoose";
import UserProfile from "@/app/models/UserProfile";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const userProfile = await UserProfile.findOne({ userId: params.id });
    if (!userProfile) {
      return NextResponse.json({ message: "User profile not found" }, { status: 404 });
    }
    return NextResponse.json(userProfile);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const userProfile = await UserProfile.findOneAndUpdate(
      { userId: params.id },
      { ...body, userId: params.id },
      { upsert: true, new: true }
    );
    return NextResponse.json(userProfile);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
