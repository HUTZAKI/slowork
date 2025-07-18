import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import UserProfile from "@/app/models/UserProfile";
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const userProfile = await UserProfile.findOne({ userId: params.id });
    if (!userProfile) {
      return NextResponse.json({ message: "User profile not found" }, { status: 404 });
    }
    return NextResponse.json(userProfile);
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const formData = await req.formData();
    const file = formData.get('resume') as File | null;
    const profileData = JSON.parse(formData.get('profileData') as string);

    let resumeUrl = profileData.resume?.url || null;
    let resumeFileName = profileData.resume?.fileName || null;
    let resumeUploadDate = profileData.resume?.uploadDate || null;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uniqueFileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(process.cwd(), 'public/resumes', uniqueFileName);
      await writeFile(filePath, buffer);

      resumeUrl = `/resumes/${uniqueFileName}`;
      resumeFileName = file.name;
      resumeUploadDate = new Date();
    }

    const updatedProfileData = {
      ...profileData,
      resume: {
        url: resumeUrl,
        fileName: resumeFileName,
        uploadDate: resumeUploadDate,
      },
    };

    const userProfile = await UserProfile.findOneAndUpdate(
      { userId: params.id },
      { ...updatedProfileData, userId: params.id },
      { upsert: true, new: true }
    );
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
