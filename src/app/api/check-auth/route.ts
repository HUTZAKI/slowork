import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return NextResponse.json({ isAuthenticated: true, userId: decodedToken.userId }, { status: 200 });
  } catch {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
