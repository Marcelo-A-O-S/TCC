'use client'
import "../../app/globals.css";
import Header from "../../app/components/Header"
import Footer from "../Footer"
import { UserProvider } from "@/contexts/UserContext";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
export default function Container({
    children,
  }: {
    children: React.ReactNode
  }){
    return(
        <>
        <SWRConfig>
          <SessionProvider>
          <UserProvider>
            <Header/>
            {children}
            <Footer/>
          </UserProvider>
          </SessionProvider>
        </SWRConfig>
        
        </>
    )
}