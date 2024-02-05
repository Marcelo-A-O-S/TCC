import { NextRequest, NextResponse } from "next/server";
import useSessionStorage from "./hooks/useSessionStorage";
import { User } from "./models/User";
export default function middleware(request: NextRequest){
    const response = NextResponse.next()
    const pathname = request.nextUrl.pathname;
    console.log(pathname);
    if(pathname.startsWith("/dashboard")){
        const userSession = request.cookies.get("user");

        if(userSession == null){
            return NextResponse.redirect(new URL("/login",request.url))
        }
    }
    console.log("Middeware funcionando...")
    return null;
}

export const config  = {
    matcher: ["/", "/login", "/about", "/dashboard", '/dashboard/:path*']
}
