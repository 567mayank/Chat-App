import { useEffect, useRef } from 'react';

const ChatMessages = ({ messages, user }) => {
  const messagesEndRef = useRef(null);

  // Scroller
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Time/date formatter
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

  
  const insertIndex = messages && messages.findIndex(item => item.status === "Sent" && item.reciever === user?._id);

  return (
    <div className="flex-1 overflow-auto p-4 space-y-4 chat-messages-container">
      {messages &&
        messages.map((msg, index) => (
          <div key={index}>
            {index === insertIndex && (
              <div class="flex justify-center my-4" ref={messagesEndRef}>
                <div class="px-4 py-2 bg-gray-100 rounded-full shadow-md inline-block">
                  <span class="text-xs text-gray-600">Unread Messages</span>
                </div>
              </div>
            )}

            <div className={`flex ${msg.sender === user?._id ? 'justify-end' : 'justify-start'}`}>
              {/* message */}
              <div
                className={`px-4 py-2 min-w-24 max-w-xs lg:max-w-md flex flex-col rounded-lg ${
                  msg.sender === user?._id ? 'bg-[#25D366] text-white items-end' : 'bg-gray-300 text-gray-800'
                }`}
              >
                {msg.msg}
                <div className="text-xs text-zinc-500 mt-1 flex items-center justify-between w-full">
                  <span>{formatTimeOrDate(msg.createdAt)}</span>

                  {msg.sender === user?._id  && (
                    <span className="ml-2 text-sm font-semibold">{msg.status}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
