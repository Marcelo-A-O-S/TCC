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
export async function setServerTokenCookie(user: UserAuthentication){
    const userJson = JSON.stringify(user);
    cookies().set("user",userJson);
}
export async function getServerUserCoookie(){
    const userCookie = cookies().get("user");
    if(userCookie != undefined){
        const user : UserAuthentication = JSON.parse(userCookie.value)
        return user
    }
    return null;
}
/* export function getUserCookie(){
    const userCookie = Cookies.get("user")
    if(userCookie != undefined){
        const user : UserAuthentication = JSON.parse(userCookie)
        return user
    }
    return null;
} */