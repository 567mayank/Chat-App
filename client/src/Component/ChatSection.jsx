import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";
import { db } from '../Constant';
import { useSocketUser } from '../SocketContext';
import Messages from './Messages';

function ChatSection({
  isOpen,
  setChatSecOpen = false,
  reciever
}) {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(null);
  const { socket, user } = useSocketUser();
  const chatIdRef = useRef(null);

  useEffect(() => {
    if (isOpen) return;

    setMessageInput("");
    setMessages(null);
    chatIdRef.current = null;
  }, [isOpen]);

  // fetching messages
  useEffect(() => {
    if (!isOpen) return;

    const retrieveMsg = async () => {
      try {
        const response = await axios.get(
          `${db}/chat/getAllMsg/${reciever._id}`,
          { withCredentials: true }
        );

        setMessages(response.data.chat.messages);
        chatIdRef.current = response.data.chat._id; 

        startSocket()

        // Mark messages as seen
        await axios.put(
          `${db}/chat/markSeenAllMsg/${reciever._id}`,
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error in fetching messages", error);
      }
    };
    retrieveMsg();
  }, [isOpen, reciever, socket]);
  
  // intiating socket
  const startSocket = () => {
    if (!isOpen || !chatIdRef.current) return;

    const handleNewMessage = ({ msg, msgId }) => {
      if (!isOpen) return;
      msg.status = "Read"
      if (msg.conversationId === chatIdRef.current) {
        setMessages((prevMessages) => [...prevMessages, msg]);
        readMsg(msgId);
      }
    };

    socket.on("msg-backend", handleNewMessage);

    return () => {
      socket.off("msg-backend", handleNewMessage);
    };
  }

  // Marking a message as 'read' in the database
  const readMsg = async (msgId) => {
    try {
      await axios.put(
        `${db}/chat/markSeen/${msgId}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error in updating seen of single message", error);
    }
  };

  // Sending a message
  const handleSendMessage = (e) => {
    if (!isOpen || !chatIdRef.current) return;
    e.preventDefault();

    const msg = {
      msg: messageInput,
      sender: user._id,
      reciever: reciever._id,
      conversationId: chatIdRef.current, 
      createdAt: new Date(),
      status : "Sent"
    };

    socket.emit("msg", msg);
    setMessages((prevMessages) => [...prevMessages, msg]);
    setMessageInput("");
  };

  return (
    <div>
      {isOpen ? (
        <div className="flex flex-col h-screen bg-[#392a35]">
          {/* Heading (User's Name and Photo) */}
          <div className="bg-[#1A1A1D] text-white p-4 flex items-center space-x-3">
            <button className="text-white hover:text-gray-400 mr-4" onClick={() => setChatSecOpen(false)}>
              <FaArrowLeft size={20} />
            </button>
            <img
              src={reciever?.avatar}
              alt={reciever?.username}
              className="rounded-full w-10 h-10 object-cover"
            />
            <h3 className="text-lg font-semibold">{reciever?.name}</h3>
          </div>

          {/* Main Part - Chat Messages */}
          <Messages messages={messages} user={user} />

          {/* Input Field for Sending Message */}
          <form onSubmit={handleSendMessage} className="bg-[#1A1A1D] p-4 flex items-center space-x-3 border-t border-zinc-600">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#353592]"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-[#070105] text-white p-2 rounded-lg hover:bg-[#392a35] transition-colors border border-white"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-[#392a35] text-white">
          <div className="text-4xl font-semibold text-center mb-6">
            Start Your Chat
          </div>
          <div className="text-lg text-center mb-4">
            Connect with friends and start chatting now!
          </div>
          <div className="bg-[#e782b5] text-[#392a35] px-6 py-3 rounded-full text-xl hover:bg-[#e965a7] transition-all">
            Get Started
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatSection;
