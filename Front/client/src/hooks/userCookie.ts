
import { UserAuthentication } from "@/models/UserAuthentication";

import Cookies from "js-cookie";

export function getUserCookie(){
    const userCookie = Cookies.get("user")
    if(userCookie != undefined){
        const user : UserAuthentication = JSON.parse(userCookie)
        return user
    }
    return null;
}
export function setUserCookie(user:UserAuthentication){
    const userJson = JSON.stringify(user);
    Cookies.set("user", userJson);
}
export function getTokenCookie(){
    const userCookie = Cookies.get("user")
    if(userCookie != undefined){
        const user : UserAuthentication = JSON.parse(userCookie)
        return user.token
    }
    return "";
}
export function removeUserCookie(){
    Cookies.remove("user")
}