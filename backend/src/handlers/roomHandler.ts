import { Socket } from "socket.io";
import {v4} from "uuid";

const roomHandler = (socket : Socket) => {

    const createRoom = ()=>{
        const roomId = v4();
        socket.join(roomId);
        socket.emit("room-created",{roomId});
        console.log("room created with id = ",roomId);
    };

    const joinedRoom = ({roomId} : {roomId : String})=>{
        console.log("New user has joined the room, ", roomId);
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
};

export default roomHandler;