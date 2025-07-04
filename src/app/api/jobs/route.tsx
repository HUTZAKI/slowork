import { connectDB } from '../../lib/mongoose';
import Job from '../../models/Jobs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const jobs = await Job.find();
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch jobs', error }, { status: 500 });
  }
}
