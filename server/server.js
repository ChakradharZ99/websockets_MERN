const express = require("express");
const {Server} = require("socket.io");
const {createServer} = require("http");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());

const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

io.on('connection',(socket)=>{
    console.log("User connected", socket.id);

    socket.on("send_message", (data)=>{
        socket.broadcast.emit("receive_message", data);
    })
})

server.listen(process.env.PORT, ()=>{
    console.log("Server is running on port "+ process.env.PORT);
})
