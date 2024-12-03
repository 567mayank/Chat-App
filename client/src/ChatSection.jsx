import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa'; // Import the send icon from Font Awesome

function ChatSection() {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hey, how are you?', sender: 'user' },
    { text: 'I am good, thanks!', sender: 'other' },
  ]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([...messages, { text: messageInput, sender: 'user' }]);
      setMessageInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#392a35]">
      {/* Heading (User's Name and Photo) */}
      <div className="bg-[#1A1A1D] text-white p-4 flex items-center space-x-3">
        <img
          src="https://via.placeholder.com/40"
          alt="Other User"
          className="rounded-full w-10 h-10 object-cover"
        />
        <h3 className="text-lg font-semibold">John Doe</h3>
      </div>

      {/* Main Part - Chat Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 max-w-xs rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-[#25D366] text-white'
                  : 'bg-gray-300 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Field for Sending Message */}
      <div className="bg-[#1A1A1D] p-4 flex items-center space-x-3 border-t border-zinc-600">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#353592]"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-[#070105] text-white p-2 rounded-lg hover:bg-[#392a35] transition-colors"
        >
          <FaPaperPlane /> {/* React Icons send icon */}
        </button>
      </div>
    </div>
  );
}

export default ChatSection;
