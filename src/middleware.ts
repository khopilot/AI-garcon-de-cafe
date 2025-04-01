import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path is the admin panel route
  if (path.startsWith('/admin-panel')) {
    // In a real implementation, you'd check a proper session/auth cookie
    // This is a simple implementation using localStorage which is checked client-side
    // The actual security happens in the client component and API routes
    
    // For added security, you can add IP allowlisting or other checks here
    // This example redirects from admin panel to homepage if ADMIN_ENABLED env var is not set
    const adminEnabled = process.env.ADMIN_ENABLED === 'true';
    
    if (!adminEnabled) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  // API route protection
  if (path.startsWith('/api/admin')) {
    // For API routes, the auth is checked in the route handlers
    // We just do a basic check here to prevent access from unknown origins
    const referer = request.headers.get('referer') || '';
    const hostname = request.headers.get('host') || '';
    
    // Check if the request is coming from the same origin or an allowed origin
    if (!referer.includes(hostname) && !referer.includes('localhost')) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  return NextResponse.next();
}

// Only run middleware on admin routes
export const config = {
  matcher: ['/admin-panel/:path*', '/api/admin/:path*'],
} 