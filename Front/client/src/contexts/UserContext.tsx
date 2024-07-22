"use client"
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { IUserAuthentication, UserAuthentication } from "@/models/UserAuthentication";
import Cookies from "js-cookie";
import userServices from "@/services/userServices";
import { getUserCookie } from "@/hooks/userCookie";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
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
    const {data} = useSession()
    const [user, setUser] = useState<UserAuthentication | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    useEffect(()=>{
        if(data && data.user){
            ValidateUser()
        }
    },[data])
    async function Login(userBody: UserAuthentication){
        setUser(userBody)
        setIsAuthenticated(true);
        const userSession = JSON.stringify(userBody);
        Cookies.set("user", userSession);
    }
    const ValidateUser = async () =>{
        const useData = getUserCookie()
        if(useData){
            const user = await userServices.GetByEmail(useData.email);
            
            const userAuthentication = new UserAuthentication()
            if(user){
                userAuthentication.id = user.id;
                userAuthentication.email = user.email;
                userAuthentication.token = user.token;
                userAuthentication.username = user.username;
                setUser(user)
            }
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
