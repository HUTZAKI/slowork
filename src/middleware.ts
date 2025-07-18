import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  console.log('Middleware - Token:', token);

  const protectedPaths = ['/user', '/jobs/add'];

  const isProtectedRoute = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!token && isProtectedRoute) {
    console.log('Middleware - No token, redirecting to login.');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token) {
    try {
      await jwtVerify(token, secret);
      console.log('Middleware - Token verified successfully.');
    } catch (error) {
      console.error('Middleware - Token verification failed:', error);
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/jobs/add', '/api/jobs/:path*'],
};
