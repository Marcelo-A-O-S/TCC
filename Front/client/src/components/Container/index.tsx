'use client'
import "../../app/globals.css";
import Header from "../Header"
import Footer from "../Footer"
import { UserProvider } from "@/contexts/UserContext";
import { SWRConfig } from "swr";
export default function Container({
    children,
  }: {
    children: React.ReactNode
  }){
    return(
        <>
        <SWRConfig>
          <UserProvider>
          <Header/>
          {children}
          <Footer/>
          </UserProvider>
        </SWRConfig>
        
        </>
    )
}