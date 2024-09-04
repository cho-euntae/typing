'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
}

const SocketContextType = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
})

export const useSocket = () => {
    return useContext(SocketContextType);
}

export const SocketProvider = ({ children }: {children: React.ReactNode}) => {
    const [socket, setSocket] = useState<any | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    
    useEffect(()=> {
        if(!socket){
            return;
        }
        socket.on("disconnect", async ()=> {
            setIsConnected(false);
        });
    },[]);

    useEffect(()=> {
        const socketInstance = new(ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL, {
            path: "/api/socket/io",
            addTrailingSlash: false
        })

        socketInstance.on("connect", async()=> {
            setIsConnected(true);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        }
    },[])

    return (
        <SocketContextType.Provider value={{socket, isConnected}}>
            {children}
        </SocketContextType.Provider>
    )
}
