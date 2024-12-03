import React from 'react';

function Contact() {
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
          <button className=" w-1/2 bg-[#e782b5] text-white py-2 px-4 rounded-full hover:bg-[#e965a7] transition-colors">
            Start New Chat
          </button>
          <button className="w-1/2 bg-[#e782b5] text-white py-2 px-4 rounded-full hover:bg-[#e965a7] transition-colors">
            Make A New Group
          </button>
        </div>
      </div>

      {/* Chat/People List */}
      <div className="overflow-auto p-4">
        <div className="space-y-3">
          {/* Example Chat Item */}
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition-colors">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="rounded-full w-10 h-10 object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">John Doe</h4>
              <p className="text-gray-600 text-sm">Hey, what's up?</p>
            </div>
            <span className="text-xs text-gray-400">2m ago</span>
          </div>

          {/* More Chat Items */}
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition-colors">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="rounded-full w-10 h-10 object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">Alice Smith</h4>
              <p className="text-gray-600 text-sm">Are you coming tomorrow?</p>
            </div>
            <span className="text-xs text-gray-400">15m ago</span>
          </div>

          {/* Add more chats similarly */}
        </div>
      </div>
    </div>
  );
}

export default Contact;
