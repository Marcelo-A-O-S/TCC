"use client"
import React, { createContext, ReactNode, useState } from "react";
import { User } from "@/models/User";
interface UserDomain {
    user: User;
    logout:()=>Promise<void>;
    login:()=>Promise<void>;

}

interface UserDomainProps{
    children: ReactNode
}
export const UserContext = createContext<UserDomain>({} as UserDomain);

export const UserProvider = ({children}:UserDomainProps) =>{
    const [user, setUser] = useState<User>({} as User);
    async function Login(){

    }
    async function Logout(){

    }
    return(
        <UserContext.Provider value={{user, login: Login, logout: Logout}}>
            {children}
        </UserContext.Provider>
    )
}
