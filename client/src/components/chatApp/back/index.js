const express = require('express');
const app= express();
const cors= require('cors');
app.use(cors())
const http = require('http');
const { Server} = require("socket.io")
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT"]
    }
})

// http.listen(PORT, () => console.log(`listening on ${PORT}`))

let a=app.listen(3002, () => console.log(`listening on port 3002 `));
io.listen(a)



io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    let room ;
    socket.on("join-room", (id) =>{
        room = id
        socket.join(id)
    })
    socket.on("disconnect", () =>{
        console.log("User disconnected");
    })
    socket.on("send-message", (data)=>{
        socket.to(room).emit("receive-message",data)
    })
});
