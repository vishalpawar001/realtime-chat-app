const express = require("express");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server( server ,{
    cors:{
        origin:"http://localhost:3000",
        methods: ["GET" , "POST" ]
    }
})

io.on("connection", (socket)=>{
     console.log(`socket.id ${socket.id}`);
    
     socket.on("join_room" , (room)=>{
         socket.join(room);
     })

     socket.on("send_message" , (data)=>{
         console.log(data);
         socket.to(data.room).emit("recieve_message" , data)
     })

     socket.on("disconnect" , ()=>{
         console.log("user disconnnectd");
     })   
})


server.listen(3100, ()=>{
    console.log("Happy birthday to you");
})