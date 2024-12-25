import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsernameAsk from "../Component/UsernameAsk";
import ContactProfile from './ContactProfile';
import { useSocketUser } from '../SocketContext';
import { IoLogOut } from "react-icons/io5";
import axios from 'axios';
import { db } from '../Constant';
import Loading from './Loading';
import Notification from './Notification';
import { useSelector } from 'react-redux';

function Contact() {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState(false);
  const { user } = useSocketUser();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredContacts, setFilteredContacts] = useState([]); 
  const contacts = useSelector((state) => state.chat.contacts)[0];

  const handleNewChat = () => {
    setDialog(true);
  }

  const handleNewGroup = () => {
    // new group functionality
  }

  const handleLogout = async () => {
    sessionStorage.clear();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${db}/user/logout`,
        {},
        { withCredentials: true }
      );
      navigate('/');
    } catch (error) {
      console.error("Error in logging out user", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleNotification = () => {
    setNotification("");
  }

  // search function
  useEffect(() => {
    if (contacts) {
      const filtered = contacts.filter((contact) =>
        contact?.participants[0]?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact?.participants[0]?.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [searchQuery, contacts]);

  return (
    <div className="h-screen bg-[#3B1C32]">
      {/* Header */}
      {isLoading && <Loading />}
      {notification && <Notification message={notification} onClose={handleNotification} />}

      <div className="bg-[#1A1A1D] p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-x-2 space-x-2">
          <img
            src={user?.avatar}
            alt="UserName"
            className="rounded-full w-10 h-10 object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{user?.name}</h3>
            <h3 className="text-xs text-gray-200 font-semibold">@{user?.username}</h3>
          </div>
        </div>
        <button className=" px-4 py-2 rounded-full hover:bg-[#f089b6] transition-colors" onClick={handleLogout}>
          <IoLogOut size={25} />
        </button>
      </div>

      {/* Search and Buttons */}
      <div className="p-4 bg-[#3B1C32] border-t border-b border-zinc-500 flex flex-col items-center gap-y-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery} // Controlled input
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          className=" w-full flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#643954] focus:border-[#643954]"
        />
        <div className='flex w-full gap-x-2'>
          <button className=" w-1/2 bg-[#e782b5] text-white py-2 px-4 rounded-full hover:bg-[#e965a7] transition-colors" onClick={handleNewChat}>
            Start New Chat
          </button>
          <button className="w-1/2 bg-[#e782b5] text-white py-2 px-4 rounded-full hover:bg-[#e965a7] transition-colors" onClick={handleNewGroup}>
            Make A New Group
          </button>
        </div>
      </div>

      {/* Chat/People List */}
      <div className="overflow-auto p-4">
        <div className="space-y-3">
          {filteredContacts && filteredContacts.length > 0 ? (
            filteredContacts.map((chat, index) => (
              <ContactProfile key={index} data={chat.participants[0]} chat={chat} unreadCount={chat?.unreadCount} />
            ))
          ) : (
            <div className="text-white text-center border p-2 rounded-md">No contacts found</div>
          )}
        </div>
      </div>

      {dialog && <UsernameAsk setNotification={setNotification} setDialog={setDialog} />}
    </div>
  );
}

export default Contact;
