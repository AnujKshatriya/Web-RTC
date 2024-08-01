import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { SocketContext } from "../context/SocketContext";

const Room = () => {

  const {id} = useParams();
  const {socket} = useContext(SocketContext);

  useEffect(()=>{
    socket.emit("joined-room",{roomId : id})
  },[])

  return (
    <div>
      Room : {id}
    </div>
  )
}

export default Room