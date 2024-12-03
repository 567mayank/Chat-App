// socket.js
import { Server } from "socket.io";

// Define a function to setup the Socket.IO server
export default function setupSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Socket.IO connection handling
  io.on("connection", (socket) => {
    console.log(`User connected with ID: ${socket.id}`);

    // // Send a message to the client
    // socket.emit("welcome", `Welcome to the server!`);

    // // Example of room-based messaging
    // socket.on("joinRoom", (room) => {
    //   socket.join(room);
    //   console.log(`User ${socket.id} joined room: ${room}`);
    // });

    // socket.on("message", (message, room) => {
    //   // Send message to a specific room
    //   io.to(room).emit("received-message", message);
    // });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
