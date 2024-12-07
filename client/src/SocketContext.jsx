import React, { createContext, useContext, useMemo, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { db, isLoggedIn } from "./Constant";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(`${db}`, { 
    reconnection: false,
    transports: ["websocket"],
    withCredentials: true 
  }), []);

  const [user,setUser] = useState(null)

  const connectSocket = () => {
    
  }

  useEffect(() => {
    if(!isLoggedIn()) return
    socket.on("connect", async() => {
      console.log("connect")
      try {
        const response = await axios.put(
          `${db}/user/updateSocketId`,
          {socketId : socket.id},
          {withCredentials : true}
        )
        console.log(response.data)
      } catch (error) {
        console.error("error in updating socketId",error)
      }
      
    });

    // Cleanup when the component is unmounted
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket,isLoggedIn,user]);

  useEffect(()=>{
    const local = sessionStorage.getItem("user")
    if(local) {
      checkUser(JSON.parse(local))
    }
  },[])

  const checkUser = async(username) => {
    const userInfo = await axios.get(
      `${db}/user/getUserInfo/${username}`,
      {withCredentials : true}
    )
    setUser(userInfo.data.user)
  }

  return (
    <SocketContext.Provider value={{socket,user,setUser}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketUser = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketUser must be used within a SocketUserProvider");
  }
  return context;
};