import { useEffect, useRef } from 'react';

const ChatMessages = ({ messages, user }) => {
  const messagesEndRef = useRef(null);


  // Scroller
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // time/date formatter 
  const formatTimeOrDate = (createdAt) => {
    const currentDate = new Date();
    const messageDate = new Date(createdAt);

    if (
      currentDate.getDate() === messageDate.getDate() &&
      currentDate.getMonth() === messageDate.getMonth() &&
      currentDate.getFullYear() === messageDate.getFullYear()
    ) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  return (
    <div className="flex-1 overflow-auto p-4 space-y-4 chat-messages-container">

      {messages && messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.sender === user?._id ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`px-4 py-2 min-w-24 max-w-xs lg:max-w-md flex flex-col rounded-lg ${msg.sender === user?._id ? 'bg-[#25D366] text-white items-end' : 'bg-gray-300 text-gray-800 '}`}>

            {msg.msg}
            <div className="text-xs text-zinc-500 mt-1 flex items-center justify-between w-full">
              <span>{formatTimeOrDate(msg.createdAt)}</span>
              
              {msg.sender === user?._id && msg.status && (
                <span className="ml-2 text-sm font-semibold">{msg.status}</span>
              )}
            </div>

          </div>
          
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
