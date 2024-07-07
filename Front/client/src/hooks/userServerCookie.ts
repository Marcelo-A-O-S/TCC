'use server'
import { UserAuthentication } from "@/models/UserAuthentication";
import { cookies } from "next/headers";
export async function getServerTokenCookie(){
    const userCookie = cookies().get("user");
    if(userCookie != undefined ){
        const user: UserAuthentication = JSON.parse(userCookie.value)
        return user.token
    }
    return ""
}