import React, { useState } from 'react';
import Contact from './Contact';
import ChatSection from './ChatSection';

function App() {
  // const [chatSecOpen,setChatSecOpen] = useState(false)
  return (
    <div className=' min-h-screen min-w-full flex'>
      <div className=' w-full lg:w-1/3 bg-red-100 lg:border-r lg:border-zinc-600'>
        <Contact/>
      </div>
      <div className='w-full lg:w-2/3 bg-blue-100 hidden lg:block '>
        <ChatSection/>
      </div>
      
    </div>
  );
}

export default App;
