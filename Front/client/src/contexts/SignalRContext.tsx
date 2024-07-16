import { createContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { mutate as mutateGlobal } from "swr";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
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
                .withUrl(`${host}/notifications`, { withCredentials: false })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();
            setConnection(connect);
            connect.start()
                .then(() => {
                    console.log("Connection started!")
                    connect.on("OnConnected", (message) => {
                        console.log(message);
                        mutateGlobal("/api/Post/List");
                    })
                    connect.on("CreatePost", (userId) => {
                        mutateGlobal("/api/Post/List");
                        mutateGlobal(`/api/Post/FindByUserId?userId=${userId}`);
                    })
                    connect.on("UpdatePost", (postId, userId) => {
                        mutateGlobal("/api/Post/List");
                        mutateGlobal(`/api/Post/FindById?id=${postId}`);
                        mutateGlobal(`/api/Post/FindByUserId?userId=${userId}`);
                    })
                    connect.on("DeletePost", (userId) => {
                        mutateGlobal("/api/Post/List");
                        mutateGlobal(`/api/Post/FindByUserId?userId=${userId}`);
                    })
                    connect.on("AddLike", (postId, userId) => {
                        console.log("AddLike triggered", { postId, userId });
                        try {
                            mutateGlobal("/api/Post/List");
                            mutateGlobal(`/api/Post/FindById?id=${postId}`);
                            mutateGlobal(`/api/Post/FindByUserId?userId=${userId}`);
                        } catch (error) {
                            console.error("Error in AddLike client handler:", error);
                        }
                    })
                    connect.on("RemoveLike", (postId, userId) => {
                        mutateGlobal("/api/Post/List");
                        mutateGlobal(`/api/Post/FindById?id=${postId}`);
                        mutateGlobal(`/api/Post/FindByUserId?userId=${userId}`);
                    })
                    connect.on("AddComment", (postId, userId) => {
                        mutateGlobal("/api/Post/List");
                        mutateGlobal(`/api/Post/FindById?id=${postId}`);
                        mutateGlobal(`/api/Post/FindByUserId?userId=${userId}`);
                    })
                    connect.on("RemoveComment", (postId, userId) => {
                        mutateGlobal("/api/Post/List");
                        mutateGlobal(`/api/Post/FindById?id=${postId}`);
                        mutateGlobal(`/api/Post/FindByUserId?userId=${userId}`);
                    })
                })
        }
    }
    const insertConnection = (_connection: HubConnection) => {
        setConnection(_connection);
    }
    const invokeGlobal = (nameFunction: string, ...args: any[]) => {
        if (connection) {
            connection.invoke(nameFunction, args)
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
