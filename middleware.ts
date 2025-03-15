import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt' // Import getToken from next-auth/jwt

export async function middleware(request: NextRequest) {
  // Retrieve the JWT token using next-auth's getToken
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET})

  // Define the paths that require authentication
  const protectedPaths = ['/pages/blog/create', '/pages']

  // Check if the requested path is in the protectedPaths array
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath) {
    // If the path is protected and the user is not authenticated, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/pages/login', request.url))
    }
  }

  // Allow access to the requested path if the user is authenticated or the path is not protected
  return NextResponse.next()
}

export const config = {
  matcher: [],
}