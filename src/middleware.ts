// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // If usser is logged in, token will exist
    const token = await getToken({
        req: request, 
        secret: process.env.NEXTAUTH_SECRET
    })

    const {pathname} = request.nextUrl; 
    // Allow request if 
    // (1) token exists 
    // or (2) it is a request for nextAuth session & provider
    // or (3) it is a request to '/_next/' (/_next/static)

    if(token || pathname.includes('/api/auth') || pathname.includes('api/auth') || pathname.includes("/_next")){
        if(pathname === "/login"){
            //Prevent login if logged in
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next();
    }

    // Redirect to login if (1) user doesn't have a token and (2) is requesting protected route
    if(!token && pathname !== '/login'){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();
}