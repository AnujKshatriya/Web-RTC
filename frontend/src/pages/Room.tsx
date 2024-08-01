import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { SocketContext } from "../context/SocketContext";

const Room = () => {

  const {id} = useParams();
  const {socket, user} = useContext(SocketContext);

  useEffect(()=>{
    user && console.log("new user has joined room ->",id, "with peer id ->", user._id)
    if(user) socket.emit("joined-room",{roomId : id, peerId : user._id});
  },[id,user, socket])

  return (
    <div>
      Room : {id}
    </div>
  )
}

export default Room
