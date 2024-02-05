"use client"
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "@/models/User";
import { IUserDomain } from "@/models/interfaces/IUserDomain";
import Cookies from "js-cookie";

interface UserDomainProps{
    children: ReactNode
}
export const UserContext = createContext<IUserDomain>({} as IUserDomain);

export const UserProvider = ({children}:UserDomainProps) =>{

    useEffect(()=>{
        const GetUserCookie = async ()=>{
            const userCookie = Cookies.get("user");
            return userCookie;
        }
        const ValidateUser = async () =>{
            const userCookie = await GetUserCookie();
            if(userCookie != null){
                setUser(JSON.parse(userCookie))
            }
        }
        ValidateUser();
    },[])
    const [user, setUser] = useState<User | null>(null);

    async function Login(userBody: User){
        setUser(userBody)
        const userSession = JSON.stringify(userBody);
        Cookies.set("user", userSession);
    }
    async function Logout(){
        setUser(null);
        Cookies.remove("user")
    }
    return(
        <UserContext.Provider value={{user, login: Login, logout: Logout}}>
            {children}
        </UserContext.Provider>
    )
}
