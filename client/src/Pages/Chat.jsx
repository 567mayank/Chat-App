import React, { useEffect, useState } from 'react';
import Contact from '../Component/Contact';
import ChatSection from '../Component/ChatSection';
import { db, isLoggedIn } from '../Constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../Component/Loading';

function App() {
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate() 
  const [chatSecOpen, setChatSecOpen] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    if(!isLoggedIn()) return
    const retrieveData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(
          `${db}/chat/allUserChat`,
          {
            withCredentials: true,
          }
        );
        setChat(response.data.conversations);
        console.log(response.data)
      } catch (error) {
        console.error('Error in fetching Chats', error);
      } finally {
        setIsLoading(false)
      }
    };

    retrieveData();
  }, []);

  useEffect(()=>{
    if(!chatSecOpen) setChatUser(null)
  },[chatSecOpen])

  useEffect(()=>{
    if(!isLoggedIn()) {
      navigate("/")
      return
    }
  },[isLoggedIn])

  return (
    <div className='min-h-screen min-w-full flex'>
      {/* Conditional rendering for contact list */}
      {isLoading && <Loading/>}
      <div
        className={`w-full lg:w-1/3 bg-red-100 lg:border-r lg:border-zinc-600 ${
          chatSecOpen ? 'hidden' : 'block'
        } lg:block`}
      >
        <Contact data={chat} setChatSecOpen={setChatSecOpen} setChatUser={setChatUser} setData={setChat} />
      </div>

      <div
        className={`w-full lg:w-2/3 bg-blue-100 ${
          chatSecOpen ? 'block' : 'hidden'
        } lg:block`}
      >
        <ChatSection setChatSecOpen={setChatSecOpen} isOpen={chatSecOpen} reciever={chatUser} setData={setChat} />
      </div>
    </div>
  );
}

export default App;
