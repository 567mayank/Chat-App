import React, { useEffect, useState } from 'react';
import Contact from '../Component/Contact';
import ChatSection from '../Component/ChatSection';
import { db } from '../Constant';
import axios from 'axios';

function App() {
  const [chatSecOpen, setChatSecOpen] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const response = await axios.get(
          `${db}/chat/allUserChat`,
          {
            withCredentials: true,
          }
        );
        setChat(response.data.conversations);
      } catch (error) {
        console.error('Error in fetching Chats', error);
      }
    };

    retrieveData();
  }, []);

  useEffect(()=>{
    if(!chatSecOpen) setChatUser(null)
  },[chatSecOpen])

  return (
    <div className='min-h-screen min-w-full flex'>
      {/* Conditional rendering for contact list */}
      <div
        className={`w-full lg:w-1/3 bg-red-100 lg:border-r lg:border-zinc-600 ${
          chatSecOpen ? 'hidden' : 'block'
        } lg:block`}
      >
        <Contact data={chat} setChatSecOpen={setChatSecOpen} setChatUser={setChatUser} />
      </div>

      <div
        className={`w-full lg:w-2/3 bg-blue-100 ${
          chatSecOpen ? 'block' : 'hidden'
        } lg:block`}
      >
        <ChatSection setChatSecOpen={setChatSecOpen} isOpen={chatSecOpen} reciever={chatUser} />
      </div>
    </div>
  );
}

export default App;
