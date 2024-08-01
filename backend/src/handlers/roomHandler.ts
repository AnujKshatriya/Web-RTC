import { Socket } from "socket.io";
import {v4} from "uuid";
import IRoomParam from "../interfaces/IRoomParams";

const rooms : Record<string,string[]> = {};

const roomHandler = (socket : Socket) => {

    const createRoom = ()=>{
        const roomId = v4();
        socket.join(roomId);

        rooms[roomId] = [];

        socket.emit("room-created",{roomId});
        console.log("room created with id = ",roomId);
    };

    const joinedRoom = ({roomId, peerId} : IRoomParam)=>{
        if(rooms[roomId]){
            console.log("New user has joined the room-> ", roomId, " and with peer id -> ", peerId);
            rooms[roomId].push(peerId);
            socket.join(roomId);

            socket.emit("get-users",{
                roomId,
                participants : rooms[roomId]
            });
        }

        socket.on("disconnect",()=>{
            rooms[roomId] = rooms[roomId].filter((id : string)=> id!==peerId);
        });
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);

};

export default roomHandler;