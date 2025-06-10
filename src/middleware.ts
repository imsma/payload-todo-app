import { NextRequest, NextResponse } from 'next/server'

// export const config = {
//   matcher: ['/', '/home', '/todo-create', '/todos/:path*', '/api/:path*'],
// }

export const config = {
  matcher: ['/', '/home', '/todo-create', '/todos/:path*', '/api/:path*'],
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const payloadToken = request.cookies.get('payload-token')
  if (!payloadToken) {
    // If the user is not authenticated, redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}
