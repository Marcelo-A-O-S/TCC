import { createContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { mutate as mutateGlobal } from "swr";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ROUTE_POST, ROUTE_NOTIFICATION } from "@/utils/constants";
type ProviderProps = {
    children: ReactNode
}
type SignalRProps = {
    connection: HubConnection | null,
    insertConnection: (connection: HubConnection) => void,
    invokeGlobal: (nameFunction: string, ...args: any[]) => void,
}
export const SignalContext = createContext<SignalRProps>({} as SignalRProps)
export const SignalRProvider = ({ children }: ProviderProps) => {
    const host = process.env.NEXT_PUBLIC_HOST
    const { data } = useSession()
    const [connection, setConnection] = useState<HubConnection | null>(null);
    useEffect(() => {
        InitializeConnection()
    }, [data?.user])
    const InitializeConnection = () => {
        if (host != undefined && !connection && data && data.user) {
            const connect = new HubConnectionBuilder()
                .withUrl(`${host}/notifications`, { 
                    withCredentials: false,
                 })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();
            setConnection(connect);
            connect.start()
                .then(() => {
                    console.log("Connection started!")
                    connect.on("OnConnected", (message) => {
                        mutateGlobal(ROUTE_POST.LIST);
                    })
                    connect.on("CreatePost", (userId) => {
                        console.log("CreatePost:",userId)
                        mutateGlobal(ROUTE_POST.LIST);
                        mutateGlobal(ROUTE_POST.FIND_BY_USERID + userId);
                    })
                    connect.on("UpdatePost", (postId, userId) => {
                        mutateGlobal(ROUTE_POST.LIST);
                        mutateGlobal(ROUTE_POST.FIND_BY_ID + postId);
                        mutateGlobal(ROUTE_POST.FIND_BY_USERID + userId);
                    })
                    connect.on("DeletePost", (userId) => {
                        mutateGlobal(ROUTE_POST.LIST);
                        mutateGlobal(ROUTE_POST.FIND_BY_USERID + userId);
                    })
                    connect.on("AddLike", (postId, userId) => {
                        try {
                            console.log(postId, userId)
                            mutateGlobal(ROUTE_POST.LIST);
                            mutateGlobal(ROUTE_POST.FIND_BY_ID + postId);
                            mutateGlobal(ROUTE_POST.FIND_BY_USERID + userId);
                            mutateGlobal(ROUTE_NOTIFICATION.LIST_BY_USERID+ userId);
                            
                        } catch (error) {
                            console.error("Error in AddLike client handler:", error);
                        }
                    })
                    connect.on("RemoveLike", (postId, userId) => {
                        console.log(postId, userId)
                        mutateGlobal(ROUTE_POST.LIST);
                        mutateGlobal(ROUTE_POST.FIND_BY_ID + postId);
                        mutateGlobal(ROUTE_POST.FIND_BY_USERID + userId);
                        mutateGlobal(ROUTE_NOTIFICATION.LIST_BY_USERID+ userId);
                    })
                    connect.on("AddComment", (postId, userId) => {
                        console.log(postId, userId)
                        mutateGlobal(ROUTE_POST.LIST);
                        mutateGlobal(ROUTE_POST.FIND_BY_ID + postId);
                        mutateGlobal(ROUTE_POST.FIND_BY_USERID + userId);
                        mutateGlobal(ROUTE_NOTIFICATION.LIST_BY_USERID+ userId);
                    })
                    connect.on("RemoveComment", (postId, userId) => {
                        console.log(postId, userId)
                        mutateGlobal(ROUTE_POST.LIST);
                        mutateGlobal(ROUTE_POST.FIND_BY_ID + postId);
                        mutateGlobal(ROUTE_POST.FIND_BY_USERID + userId);
                        mutateGlobal(ROUTE_NOTIFICATION.LIST_BY_USERID+ userId);
                    })
                    connect.on("UpdateNotification", (userId) => {
                        mutateGlobal(ROUTE_NOTIFICATION.LIST_BY_USERID+ userId);
                    })
                })
        }
    }
    const insertConnection = (_connection: HubConnection) => {
        setConnection(_connection);
    }
    const invokeGlobal = async (nameFunction: string, ...args: any[]) => {
        if (connection) {
            try{
                await connection.invoke(nameFunction, ...args)
            }catch(err){
                console.log(err)
            }
        }
    }
    return (
        <SignalContext.Provider value={{
            connection,
            insertConnection,
            invokeGlobal,
        }}>
            {children}
        </SignalContext.Provider>
    )
}
