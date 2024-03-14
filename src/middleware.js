import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { headers } from 'next/headers'
import { verifyJwtToken } from './lib/jwt'
import { getToken } from 'next-auth/jwt'


export async function middleware(req) {


  const path = req.nextUrl.pathname

  const isPublicPath = path ==='/login'|| path ==='/register'

  const nextCookies = cookies()

  const session = await getToken({req})

  const token = nextCookies.get('next-auth.session-token')


  if(isPublicPath&&token){
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  if(!isPublicPath && token)
  {
    const userRole = session?.user?.role;

    if (path?.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/me", req.url));
    }
  }

  if(!isPublicPath && !token){
   
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/register',
    '/me/:path*',
    '/admin/:path*',
    '/shipping'
  ]
}