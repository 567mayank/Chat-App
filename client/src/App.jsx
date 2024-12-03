import React, { useEffect, useMemo, useState } from 'react'
import {io} from "socket.io-client"

function App() {
  const [message,setMessage] = useState("")
  const [room,setRoom] = useState("")
  const [socketId,setSocketId] = useState("")
  const [listMessage,setListMessage] = useState([])
  const [roomName,setRoomName] = useState("")

  const socket = useMemo(()=>io("http://localhost:3000"),[])
  useEffect(()=>{
    socket.on("connect",()=>{
      setSocketId(socket.id)
      console.log("Socket Connected ",socket.id)
    })

    // sent from backend
    socket.on("welcome",(s)=>{
      console.log(s)
    })

    socket.on("recieved-msg",(msg)=>{
      setListMessage((prev) => [...prev, msg]);
    })

  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage("")
    // setRoom("")
    socket.emit("message",{message, room})
  }

  const handleRoomChange = (e) => {
    e.preventDefault()
    socket.emit("roomName",roomName)
    setRoomName("")
  }

  return (
    <div>
      <h4>{socketId}</h4>

      <form onSubmit={handleRoomChange}>
        <label >Join Room</label>
        <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)}  />
        <br/>
        <button type='submit'>Submit</button>
      </form>

      <br/>

      <form onSubmit={handleSubmit}>
        <label >Message</label>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}  />
        <br/>
        <label >Room No</label>
        <input type="text" value={room} onChange={(e) => setRoom(e.target.value)}  />
        <br/>
        <button type='submit'>Submit</button>
      </form>

      <div style={{
        display: "flex", 
        flexDirection: "column",   // Make items stack vertically
        gap: "10px",               // Add some space between the items
        padding: "10px",           // Optional: Add padding to the container
      }}>
        {listMessage && listMessage.map((msg, index) => (
          <div 
            key={index} 
            style={{
              backgroundColor: "#f0f0f0",  // Light gray background for each message
              padding: "10px",             // Padding inside each message box
              borderRadius: "5px",         // Rounded corners
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",  // Subtle shadow for depth
              fontSize: "16px",            // Font size
              color: "#333",               // Text color
            }}
          >
            {msg}
          </div>
        ))}
      </div>

    </div>
  )
}

export default App