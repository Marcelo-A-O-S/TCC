import { NextRequest, NextResponse } from "next/server";
import { getUserCookie } from "./hooks/userCookie";
export default function middleware(request: NextRequest){
    const response = NextResponse.next()
    const pathname = request.nextUrl.pathname;
    const userSession = request.cookies.get("user");
    if(pathname.startsWith("/dashboard")){  
        if(userSession == null){
            return NextResponse.redirect(new URL("/login",request.url))
        }
    }else if(pathname.startsWith("/") && userSession){
        return NextResponse.redirect(new URL("/dashboard",request.url))
    } else if(pathname === "/login" && userSession){
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return response;
}
export const config  = {
    matcher: ["/", "/login", "/about", "/dashboard", '/dashboard/:path*']
}