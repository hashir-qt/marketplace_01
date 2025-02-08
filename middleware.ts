import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Check if the request is for the Sanity Studio
  if (pathname.startsWith("/studio")) {
    const allowedHosts = ["localhost", "127.0.0.1"];

    // Get request hostname (works for local and deployed environments)
    const requestHost = req.nextUrl.hostname;

    if (!allowedHosts.includes(requestHost)) {
      // If the request is not from localhost, deny access
      return NextResponse.rewrite(new URL("/403", req.url)); // Redirect to a custom 403 page
    }
  }

  return NextResponse.next(); // Allow the request if from localhost
}

export const config = {
  matcher: ["/studio/:path*"], // Apply only to /studio and its subpaths
};
