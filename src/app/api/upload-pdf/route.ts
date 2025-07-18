import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import {connectDB } from '../../lib/mongoose';
import PDFModel from '../../models/PDF'; // Mongoose model

export const config = {
  api: {
    bodyParser: false, // important!
  },
};

export async function POST(req) {
  const form = formidable({ keepExtensions: true });

  const [fields, files] = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve([fields, files]);
    });
  });

  await connectDB();

  const fileData = fs.readFileSync(files.pdf[0].filepath);

  // Save PDF as binary buffer to MongoDB
  await PDFModel.create({
    filename: files.pdf[0].originalFilename,
    data: fileData,
    contentType: files.pdf[0].mimetype,
  });

  return NextResponse.json({ message: 'PDF uploaded successfully!' });
}
