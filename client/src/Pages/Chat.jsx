import React, { useEffect, useState } from 'react';
import Contact from '../Component/Contact';
import ChatSection from '../Component/ChatSection';
import { db, isLoggedIn } from '../Constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../Component/Loading';
import { useSelector, useDispatch } from 'react-redux'
import { addContacts } from '../Redux/chatSlice';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate() 

  const [isLoading,setIsLoading] = useState(false)
  
  const chatSecOpen = useSelector((state) => state.msg.chatIsOpen)

  const chatRedux = useSelector((state) => state.chat.contacts) 
  


  // fetching contacts
  const retrieveData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${db}/chat/allUserChat`,
        {
          withCredentials: true,
        }
      );
      dispatch(addContacts(response.data.conversations))
    } catch (error) {
      console.error('Error in fetching Chats', error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (chatRedux.length === 0) 
      retrieveData()
  }, [chatRedux, dispatch])


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
        <Contact/>
      </div>

      <div
        className={`w-full lg:w-2/3 bg-blue-100 ${
          chatSecOpen ? 'block' : 'hidden'
        } lg:block`}
      >
        <ChatSection/>
      </div>
    </div>
  );
}

export default App;
