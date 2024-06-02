import { NextRequest, NextResponse } from "next/server";
import useSessionStorage from "./hooks/useSessionStorage";
import { User } from "./models/User";
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
    }else if(pathname.startsWith("/login") && !userSession){
        return NextResponse.redirect(new URL("/login",request.url))
    }
    return response;
}
export const config  = {
    matcher: ["/", "/login", "/about", "/dashboard", '/dashboard/:path*']
}
