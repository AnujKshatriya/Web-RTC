import io from 'socket.io-client';
import React, { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const server = "http://localhost:5500";

export const SocketContext = createContext<any | null>(null);

const socket = io(server);

interface props {
    children: React.ReactNode;
}

export const SocketProvider : React.FC<props> = ({children}) => {

    const navigate = useNavigate();
    useEffect(()=>{
        const enterRoom = ({roomId} : {roomId : String})=>{
            navigate(`/room/${roomId}`)
        }

        socket.on("room-created", enterRoom);
    },[])

    return (
        <SocketContext.Provider value={{socket}}>
        {children}
        </SocketContext.Provider>
    )
}