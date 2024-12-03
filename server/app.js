import express from "express"
import {Server} from 'socket.io'
import {createServer} from "http"
import cors from "cors"

const app = express()
const server = createServer(app)
const io = new Server(server,{
  cors : {
    origin : "http://localhost:5173",
    methods:["GET", "POST"],
    credentials : true
  }
})

app.use(cors())

app.get("/",(req,res) => {
  res.send("hello")
})

io.on("connection",(socket) => {
  // console.log("User Connected")
  console.log("Connected Socket ID",socket.id)

  // sent to frontend
  // socket.emit("welcome",`Welcome to Server ${socket.id}`) 
  // socket.broadcast.emit("welcome",`${socket.id} joined the server`)

  socket.on("message",({message,room})=>{
    // console.log(msg)
    // io.emit("recieved-msg",msg)
    io.to(room).emit("recieved-msg",message)
  })

  socket.on("roomName",(room) => {
    socket.join(room)
  })

})

server.listen(3000,()=>{
  console.log("server is listening on 3000")
})