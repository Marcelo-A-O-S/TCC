"use client"
import React, { ReactNode, createContext } from "react";

interface ThemeProviders{
    children:ReactNode
}
export const ThemeContext = createContext({})


export default function ThemeProvider({children}: ThemeProviders){
    return (
        <ThemeContext.Provider value={{}}>
            {children}
        </ThemeContext.Provider>
    )
}
