import React, { useState } from 'react';
import UsernameAsk from "../Component/UsernameAsk"
import ContactProfile from './ContactProfile';
function Contact({
  data=null,
  setChatSecOpen,
  setChatUser
}) {
  const [dialog,setDialog] = useState(false)
  const handleNewChat = () => {
    setDialog(true)
  }

  const handleNewGroup = () => {

  }

  const handleContactClick = (contact) => {
    // console.log(contact)
    setChatSecOpen(true)
    setChatUser(contact)
  }

  return (
    <div className="h-screen bg-[#3B1C32]">
      {/* Header */}
      <div className="bg-[#1A1A1D] p-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40"
            alt="UserName"
            className="rounded-full w-10 h-10 object-cover"
          />
          <h3 className="text-lg font-semibold">UserName</h3>
        </div>
        <button className="bg-[#48222e] px-4 py-2 rounded-full hover:bg-[#128C7E] transition-colors">
          <i className="fas fa-phone"></i>
        </button>
      </div>

      {/* Search and Buttons */}
      <div className="p-4 bg-[#3B1C32] border-t border-b border-zinc-500 flex flex-col items-center gap-y-4">
        <input
          type="text"
          placeholder="Search"
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
          {
            data && data.map((chat,index) => (
              <ContactProfile key={index} data={chat.participants[0]} handleContactClick={handleContactClick} />
            ))
          }
        </div>
      </div>

      {dialog && <UsernameAsk setDialog={setDialog}/>}

    </div>
  );
}

export default Contact;
