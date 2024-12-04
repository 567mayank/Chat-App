import React, { createContext, useContext, useMemo, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { db } from "./Constant";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:3000", { 
    reconnection: false,
    transports: ["websocket"],
    withCredentials: true 
  }), []);

  const [user,setUser] = useState(null)

  useEffect(() => {
    socket.on("connect", async() => {
      try {
        await axios.put(
          `${db}/user/updateSocketId`,
          {socketId : socket.id},
          {withCredentials : true}
        )
      } catch (error) {
        console.error("error in updating socketId",error)
      }
      
    });

    // On disconnection, notify backend to remove socketId
    // socket.on("disconnect", async() => {
    //   try {
    //     const response = await axios.put(
    //       `${db}/user/removeSocketId`,
    //       {socketId : socket.id},
    //       {withCredentials : true}
    //     )
    //     console.log(response.data)
    //   } catch (error) {
    //     console.error("error in removing socketId",error)
    //   }
    // });

    // Cleanup when the component is unmounted
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  useEffect(()=>{
    const local = localStorage.getItem("user")
    if(local) {
      setUser(JSON.parse(local))
    }
  },[])

  return (
    <SocketContext.Provider value={{socket,user}}>
      {children}
    </SocketContext.Provider>
  );
};

// export const useSocket = () => {
//   const {socket} = useContext(SocketContext);
//   if (!socket) {
//     throw new Error("useSocket must be used within a SocketProvider");
//   }
//   return socket;
// };

export const useSocketUser = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketUser must be used within a SocketUserProvider");
  }
  return context;
};