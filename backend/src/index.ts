import express from "express";
import http from "http";
import { Server } from "socket.io";
import serverConfig from "./config/serverConfig";
import cors from "cors";
import roomHandler from "./handlers/roomHandler";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
    console.log("new user connected ", socket.id);

    roomHandler(socket);

    socket.on("disconnect",()=>{
        console.log("user disconnected ", socket.id);
    });
});

server.listen(serverConfig.PORT,()=>{
    console.log("Server is up at : ", serverConfig.PORT);
});