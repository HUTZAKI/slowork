// app/api/jobs/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import Job from "@/app/models/Jobs"; // ✅ singular name

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const job = await Job.findById(id);

    if (!job) {
      return NextResponse.json({ message: "Job not found." }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching the job." },
      { status: 500 }
    );
  }
}
