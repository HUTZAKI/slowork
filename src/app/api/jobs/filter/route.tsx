// app/api/jobs/filter/route.js

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { connectDB } from '../../../lib/mongoose';
import Job from '../../../models/Jobs';

export async function POST(req: NextRequest) {
  await connectDB();

  const filters = await req.json();
  const query: Record<string, unknown> = {};

  // Dropdown filters
  ['jobCategory', 'province', 'organizationType', 'workplace', 'workDays', 'salary'].forEach(field => {
    if (filters[field]) {
      query[field] = filters[field];
    }
  });

  // Checkbox filters
  if (filters.onlineInterview) {
    query.onlineInterview = true;
  }

  if (filters.acceptNewGrad) {
    query.acceptNewGrad = true;
  }

  // Benefits (nested object fields)
  if (filters.benefits) {
    Object.entries(filters.benefits).forEach(([key, value]) => {
      if (value === true) {
        query[`benefits.${key}`] = true;
      }
    });
  }

  // Fetch matching jobs
  const jobs = await Job.find(query);

  return NextResponse.json(jobs);
}
