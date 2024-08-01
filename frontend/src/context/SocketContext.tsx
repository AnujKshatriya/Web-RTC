import io from 'socket.io-client';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';
import { v4 } from 'uuid';

const server = "http://localhost:5500";

export const SocketContext = createContext<any | null>(null);

const socket = io(server);

interface props {
    children: React.ReactNode;
}

export const SocketProvider : React.FC<props> = ({children}) => {
    
    const [user, setUser] = useState<Peer>();
    const [stream, setStream] = useState<MediaStream>();
    const navigate = useNavigate();

    const fetchParticipantList = ({roomId, participants} : {roomId: string, participants: string[]})=>{
        console.log('Fetched room participants');
        console.log(roomId, participants)
    }

    const fetchUserFeed = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({video:true, audio:true});
        setStream(stream);
    }

    useEffect(()=>{
        const userId = v4();
        const newPeer = new Peer(userId);
        setUser(newPeer);

        fetchUserFeed();
        
        const enterRoom = ({roomId} : {roomId : String})=>{
            navigate(`/room/${roomId}`)
        }

        socket.on("room-created", enterRoom);
        socket.on("get-users",fetchParticipantList);
    },[])

    return (
        <SocketContext.Provider value={{socket, user, stream}}>
        {children}
        </SocketContext.Provider>
    )
}