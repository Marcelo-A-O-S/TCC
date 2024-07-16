'use client'
import "../../app/globals.css";
import Header from "../../app/components/Header"
import Footer from "../Footer"
import { UserProvider } from "@/contexts/UserContext";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import { SignalRProvider } from "@/contexts/SignalRContext";
export default function Container({
    children,
  }: {
    children: React.ReactNode
  }){
    return(
        <>
        <SWRConfig>
          <SessionProvider>
          <SignalRProvider>
          <UserProvider>
            <Header/>
            {children}
            <Footer/>
          </UserProvider>
          </SignalRProvider>
          </SessionProvider>
        </SWRConfig>
        
        </>
    )
}