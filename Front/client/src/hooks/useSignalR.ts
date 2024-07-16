import { HubConnection } from "@microsoft/signalr";
import { useState, useContext } from "react";
import { SignalContext } from "@/contexts/SignalRContext";

export const useSignalR = () =>{
    const context = useContext(SignalContext);
    return context;
}