import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(req) {

  const path = req.nextUrl.pathname

  const isPublicPath = path ==='/login'|| path ==='/register'

  const nextCookies = cookies()

  const token = nextCookies.get('next-auth.session-token')

  if(isPublicPath&&token){
    return NextResponse.redirect(new URL('/', req.nextUrl))
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
    '/me'
  ]
}