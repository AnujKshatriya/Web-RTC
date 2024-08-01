import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const CreateRoom : React.FC = ()=>{
    const {socket} = useContext(SocketContext)

    const initRoom = ()=>{
        console.log("initialising room creattion")
        socket.emit("create-room")
    }

    return (
        <button className="btn btn-secondary" onClick={initRoom}>
            Start A New Meeting In A New Room
        </button>
    )
}

export default CreateRoom;