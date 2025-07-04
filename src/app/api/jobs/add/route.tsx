// app/api/jobs/add/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongoose'; // or '../../../lib/mongoose' if not using alias
import Job from '../../../models/Jobs';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ success: false, message: 'Expected an array of jobs' }, { status: 400 });
    }

    const jobs = await Job.insertMany(body);
    return NextResponse.json({ success: true, jobs }, { status: 201 });
  } catch (err) {
    console.error('[ADD MANY JOBS ERROR]', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
