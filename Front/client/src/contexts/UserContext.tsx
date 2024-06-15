"use client"
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { IUserAuthentication, UserAuthentication } from "@/models/UserAuthentication";
import Cookies from "js-cookie";
import { getUserCookie } from "@/hooks/userCookie";

interface ProviderChildren{
    children: ReactNode
}
interface IUserDomain{
    user: UserAuthentication | null;
    isAuthenticated: boolean;
    logout:()=>void;
    login:(userAtuhentication: UserAuthentication)=>void;
}
export const UserContext = createContext<IUserDomain>({} as IUserDomain);
export const UserProvider = ({children}:ProviderChildren) =>{
    const [user, setUser] = useState<UserAuthentication | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    useEffect(()=>{
        ValidateUser();
    },[])
    async function Login(userBody: UserAuthentication){
        setUser(userBody)
        setIsAuthenticated(true);
        const userSession = JSON.stringify(userBody);
        Cookies.set("user", userSession);
    }
    const ValidateUser = async () =>{
        const userCookie = await getUserCookie();
        if(userCookie != null){
            setUser(userCookie)
            setIsAuthenticated(true)
        }
    }
    async function Logout(){
        setUser(null);
        setIsAuthenticated(false);
        Cookies.remove("user")

    }
    return(
        <UserContext.Provider value={{user,isAuthenticated, login: Login, logout: Logout}}>
            {children}
        </UserContext.Provider>
    )
}
