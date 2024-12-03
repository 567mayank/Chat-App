import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middleware to parse JSON and CORS support
const corsOptions = {
  origin: "http://localhost:5173",  
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())


// HTTP route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Define Socket.IO server using the HTTP server
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true,
  }
});


// // Socket.IO connection handling
// io.on("connection", (socket) => {
//   console.log(`User connected with ID: ${socket.id}`);

//   // Send a message to the client
//   socket.emit("welcome", `Welcome to the server, ${socket.user.username}`);

//   // Example of room-based messaging
//   socket.on("joinRoom", (room) => {
//     socket.join(room);
//     console.log(`User ${socket.id} joined room: ${room}`);
//   });

//   socket.on("message", (message, room) => {
//     // Send message to a specific room
//     io.to(room).emit("received-message", message);
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

import userRouter from "./Route/user.route.js";

app.use("/user",userRouter)

// Start the server
export default server;
